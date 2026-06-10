-- BreedVault: User & Pet tables

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Pet records
CREATE TABLE pets (
  id serial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  breed_id int references breeds(id),
  sex text check (sex in ('male','female')),
  is_neutered boolean default false,
  birth_date date,
  weight_kg real,
  color text,
  microchip_id text,
  photo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Health entries
CREATE TABLE health_entries (
  id serial primary key,
  pet_id int not null references pets(id) on delete cascade,
  entry_type text not null check (entry_type in ('weight','vet_visit','vaccination','medication','symptom','boas_score','resting_rr','note')),
  entry_date date not null default current_date,
  value_numeric real,
  value_text text,
  notes text,
  created_at timestamptz default now()
);

CREATE INDEX idx_pets_user ON pets(user_id);
CREATE INDEX idx_health_pet ON health_entries(pet_id);
CREATE INDEX idx_health_type ON health_entries(entry_type);
CREATE INDEX idx_health_date ON health_entries(entry_date);
