-- Backfill profiles for any auth.users created before the
-- handle_new_user trigger existed (e.g. accounts made while testing
-- the earlier, broken version of the community migration).
insert into public.profiles (id, email, display_name)
select id, email, split_part(email, '@', 1)
from auth.users
where id not in (select id from public.profiles);
