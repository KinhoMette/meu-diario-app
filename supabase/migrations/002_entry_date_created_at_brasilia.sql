-- Rode no SQL Editor do Supabase se você já executou o 001_init.sql
-- Adiciona entry_date e grava created_at como horário local de Brasília (America/Sao_Paulo).

alter table public.diary_entries
  add column if not exists entry_date date;

alter table public.gratitude_entries
  add column if not exists entry_date date;

update public.diary_entries
set entry_date = (timezone('America/Sao_Paulo', created_at))::date
where entry_date is null;

update public.gratitude_entries
set entry_date = (timezone('America/Sao_Paulo', created_at))::date
where entry_date is null;

update public.diary_entries
set entry_date = (timezone('America/Sao_Paulo', now()))::date
where entry_date is null;

update public.gratitude_entries
set entry_date = (timezone('America/Sao_Paulo', now()))::date
where entry_date is null;

alter table public.diary_entries
  alter column entry_date set not null,
  alter column entry_date set default ((timezone('America/Sao_Paulo', now()))::date);

alter table public.gratitude_entries
  alter column entry_date set not null,
  alter column entry_date set default ((timezone('America/Sao_Paulo', now()))::date);

-- created_at: de UTC (timestamptz) para carimbo "relógio de Brasília" (timestamp sem fuso)
alter table public.diary_entries
  alter column created_at drop default;

alter table public.diary_entries
  alter column created_at type timestamp without time zone
  using (timezone('America/Sao_Paulo', created_at));

alter table public.diary_entries
  alter column created_at set default (timezone('America/Sao_Paulo', now()));

alter table public.gratitude_entries
  alter column created_at drop default;

alter table public.gratitude_entries
  alter column created_at type timestamp without time zone
  using (timezone('America/Sao_Paulo', created_at));

alter table public.gratitude_entries
  alter column created_at set default (timezone('America/Sao_Paulo', now()));
