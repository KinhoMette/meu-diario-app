-- Rode este SQL no Editor SQL do Supabase (SQL → New query) antes de usar o app.

create table if not exists public.diary_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  horas_sono numeric,
  qualidade_sono text,
  alimentacao text,
  atividade_fisica text,
  energia int,
  humor int,
  estresse_ansiedade int,
  momento_positivo text,
  positivo_o_que text,
  positivo_emocao text,
  momento_negativo text,
  negativo_o_que text,
  negativo_sentiu text,
  negativo_reagiu text,
  socializacao text,
  com_quem text,
  energia_social text,
  dia_livre text,
  influencia text,
  diferente text
);

create table if not exists public.gratitude_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  gratidao_1 text,
  gratidao_1_porque text,
  gratidao_2 text,
  gratidao_2_porque text,
  gratidao_3 text,
  gratidao_3_porque text
);

alter table public.diary_entries enable row level security;
alter table public.gratitude_entries enable row level security;

-- Permite INSERT anônimo (chave anon) para o app sem login.
-- Para produção com usuários, troque por políticas por auth.uid().
create policy "diary_entries_insert_anon"
  on public.diary_entries
  for insert
  to anon
  with check (true);

create policy "gratitude_entries_insert_anon"
  on public.gratitude_entries
  for insert
  to anon
  with check (true);
