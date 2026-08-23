-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query)

create table sports (
  id text primary key,
  name text not null,
  address text,
  players jsonb not null default '[]'
);

create table runs (
  id text primary key,
  name text not null,
  start text,
  route text,
  booked jsonb not null default '[]'
);

create table treks (
  id text primary key,
  name text not null,
  start text,
  info text,
  booked jsonb not null default '[]'
);

create table rooms (
  id text primary key,
  type text not null check (type in ('room', 'roommate')),
  title text not null,
  info text,
  owner jsonb
);

alter table sports enable row level security;
alter table runs enable row level security;
alter table treks enable row level security;
alter table rooms enable row level security;

create policy "Public read access" on sports for select using (true);
create policy "Public read access" on runs for select using (true);
create policy "Public read access" on treks for select using (true);
create policy "Public read access" on rooms for select using (true);

insert into sports (id, name, address, players) values
  ('t1', 'Greenfield Turf', '123 Park Lane', '[{"id":"u1","name":"Asha","role":"Captain"},{"id":"u2","name":"Rohit","role":"Player"}]');

insert into runs (id, name, start, route, booked) values
  ('r1', 'Morning 5K', 'Central Park', 'Central Park loop - 5km', '[{"id":"u3","name":"Maya"},{"id":"u4","name":"Jay"}]');

insert into treks (id, name, start, info, booked) values
  ('tk1', 'Hilltop Trail', 'Hillbase', 'Scenic 8km trek', '[{"id":"u5","name":"Neha"}]');

insert into rooms (id, type, title, info, owner) values
  ('rm1', 'room', 'Bright 1BHK near station', 'Furnished, utilities included', '{"id":"u6","name":"Sam"}'),
  ('rm2', 'roommate', 'Looking for a roommate in 2BHK', 'Prefer someone who works in tech', '{"id":"u7","name":"Ria"}');
