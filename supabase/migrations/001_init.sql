-- BreedVault: Core Schema v1
-- Multi-breed (dog + cat) health management platform

CREATE TYPE species_type AS ENUM ('dog', 'cat');
CREATE TYPE condition_category AS ENUM ('hereditary','orthopedic','cardiac','ocular','respiratory','dermatological','neurological','endocrine','dental','urinary','reproductive','other');
CREATE TYPE checklist_freq AS ENUM ('daily','weekly','monthly','quarterly','annually');

CREATE TABLE breeds (
  id serial primary key,
  name text not null,
  slug text not null unique,
  species species_type not null,
  description text,
  akc_group text,
  tica_group text,
  origin text,
  weight_male_kg_low real,
  weight_male_kg_high real,
  weight_female_kg_low real,
  weight_female_kg_high real,
  height_cm_low real,
  height_cm_high real,
  life_expectancy_years_low int,
  life_expectancy_years_high int,
  litter_size_avg int,
  gestation_days int default 63,
  heat_cycle_days int,
  coat_colors text[],
  temperament text[],
  is_featured boolean default false,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

CREATE TABLE conditions (
  id serial primary key,
  name text not null,
  slug text not null unique,
  category condition_category not null,
  description text not null,
  symptoms text[],
  diagnosis_methods text[],
  severity_scale text default '1-5',
  ofa_code text,
  veterinary_ref text,
  created_at timestamptz default now()
);

CREATE TABLE breed_conditions (
  id serial primary key,
  breed_id int not null references breeds(id) on delete cascade,
  condition_id int not null references conditions(id) on delete cascade,
  prevalence_rate real,
  severity_score int check (severity_score >= 1 and severity_score <= 5),
  screening_test text,
  screening_freq text,
  age_of_onset text,
  notes text,
  unique (breed_id, condition_id)
);

CREATE TABLE breed_checklists (
  id serial primary key,
  breed_id int not null references breeds(id) on delete cascade,
  task_name text not null,
  frequency checklist_freq not null,
  category text,
  description text,
  warning_signs text[],
  sort_order int default 0
);

CREATE TABLE vaccination_schedules (
  id serial primary key,
  species species_type not null,
  vaccine_name text not null,
  description text,
  is_core boolean default true,
  dose_count int default 1,
  age_first_dose text,
  interval_doses text,
  booster_freq text,
  age_last_puppy_kitten text,
  region text default 'US',
  sort_order int default 0
);

CREATE TABLE breed_growth_curves (
  id serial primary key,
  breed_id int not null references breeds(id) on delete cascade,
  sex text check (sex in ('male','female')) not null,
  age_weeks int not null,
  weight_kg_p5 real,
  weight_kg_p50 real,
  weight_kg_p95 real,
  unique (breed_id, sex, age_weeks)
);

CREATE INDEX idx_breeds_species ON breeds(species);
CREATE INDEX idx_breeds_slug ON breeds(slug);
CREATE INDEX idx_breed_conditions_breed ON breed_conditions(breed_id);
CREATE INDEX idx_breed_checklists_breed ON breed_checklists(breed_id);
CREATE INDEX idx_growth_curves_breed ON breed_growth_curves(breed_id);
