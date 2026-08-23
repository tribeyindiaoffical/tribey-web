create table tiffin (
  id text primary key,
  name text not null,
  area text,
  price text,
  info text,
  provider jsonb
);

alter table tiffin enable row level security;

create policy "Public read access" on tiffin for select using (true);

insert into tiffin (id, name, area, price, info, provider) values
  ('tf1', 'Ma''s Kitchen Tiffin', 'Near Central Park', '₹120/meal', 'Home-style North Indian, veg & non-veg options', '{"id":"u8","name":"Geeta"}'),
  ('tf2', 'Green Bowl Tiffin', 'Station Road', '₹100/meal', 'Healthy South Indian meals, delivered daily', '{"id":"u9","name":"Ravi"}');
