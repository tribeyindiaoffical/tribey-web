-- ============================================================
-- Cleanup: drop tables orphaned by removing Treks, Rooms, Tiffin.
-- DESTRUCTIVE. No other table has a foreign key into treks/rooms;
-- orders/subscribers/vendors form their own self-contained FK chain.
-- ============================================================
drop table if exists orders, subscribers, vendors, treks, rooms;

-- ============================================================
-- profiles: one row per auth user, auto-provisioned on signup.
-- Lets the app resolve "who is this uuid" / "which uuid is this
-- email" from the client (auth.users isn't exposed via PostgREST).
-- Select policy is deliberately NOT public — email is PII. A user
-- can read their own row, or the row of anyone they share a
-- community with.
-- ============================================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Read own profile or a shared community member's profile"
  on profiles for select using (
    auth.uid() = id
    or exists (
      select 1 from community_members cm1
      join community_members cm2 on cm1.community_id = cm2.community_id
      where cm1.user_id = profiles.id and cm2.user_id = auth.uid()
    )
  );

create function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, split_part(new.email, '@', 1));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- communities — public list, login required to create.
-- ============================================================
create table communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_by uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table communities enable row level security;

create policy "Public read access" on communities for select using (true);
create policy "Logged in users create communities" on communities for insert
  with check (auth.uid() = created_by);

-- ============================================================
-- community_members
-- ============================================================
create table community_members (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references communities(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (community_id, user_id)
);

alter table community_members enable row level security;
create index community_members_community_id_idx on community_members(community_id);

-- security definer avoids "infinite recursion detected in policy"
-- from a policy on community_members subquerying itself.
create function is_community_member(cid uuid)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from community_members
    where community_id = cid and user_id = auth.uid()
  );
$$;

create policy "Members can read their communities' membership"
  on community_members for select using (is_community_member(community_id));

create policy "Self join or an existing member adds someone"
  on community_members for insert with check (
    auth.uid() = user_id or is_community_member(community_id)
  );

-- Looks up a profile id by email for the add-by-email flow, without
-- exposing the profiles table to people you don't share a community with.
create function find_member_id_by_email(p_email text)
returns uuid
language sql
security definer set search_path = public
stable
as $$
  select id from profiles where email = p_email;
$$;

-- ============================================================
-- community_messages
-- ============================================================
create table community_messages (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references communities(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table community_messages enable row level security;
create index community_messages_community_id_created_at_idx
  on community_messages(community_id, created_at);

create policy "Members can read their communities' messages"
  on community_messages for select using (is_community_member(community_id));

create policy "Members can send messages"
  on community_messages for insert with check (
    auth.uid() = user_id and is_community_member(community_id)
  );

alter publication supabase_realtime add table community_messages;
