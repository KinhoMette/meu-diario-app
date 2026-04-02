"use client";

import Link from "next/link";
import { useActionState, useState, type ReactNode } from "react";
import { saveDiaryEntry, type DiaryFormState } from "@/app/actions/diary";
import { SubmitButton } from "@/components/submit-button";

function ScaleSlider({
  id,
  name,
  label,
  value,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="text-sm font-medium text-white/90"
        >
          {label}
        </label>
        <span className="tabular-nums text-2xl font-bold tracking-tight text-emerald-400">
          {value}
        </span>
      </div>
      <input
        id={id}
        name={name}
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-lg"
      />
      <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider text-white/35">
        <span>0</span>
        <span>10</span>
      </div>
    </div>
  );
}

function SectionCard({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-xl sm:p-8">
      <div className="mb-6 border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
            {description}
          </p>
        ) : null}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

const inputBase =
  "w-full rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20";

const labelClass = "mb-2 block text-sm font-medium text-white/85";

const diaryInitialState: DiaryFormState = { ok: false };

export default function Home() {
  const [energia, setEnergia] = useState(5);
  const [humor, setHumor] = useState(5);
  const [estresse, setEstresse] = useState(5);
  const [diaryState, diaryFormAction] = useActionState(
    saveDiaryEntry,
    diaryInitialState
  );

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#07080c] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.18),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(139,92,246,0.12),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <nav className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              Diário do dia
            </span>
            <Link
              href="/gratidao"
              className="inline-flex items-center rounded-full border border-transparent px-4 py-2 text-sm font-medium text-white/60 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
            >
              Gratidão
            </Link>
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/35">
            Reflexão diária
          </p>
        </nav>

        <header className="mb-12 text-center sm:mb-14 sm:text-left">
          <h1 className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Meu diário
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/55 sm:mx-0">
            Três camadas para entender seu dia: números objetivos, perguntas
            guiadas e espaço livre — no estilo dos apps que você já ama.
          </p>
        </header>

        <form action={diaryFormAction} className="space-y-8">
          {diaryState.message ? (
            <div
              role="status"
              aria-live="polite"
              className={
                diaryState.ok
                  ? "rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
                  : "rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              }
            >
              {diaryState.message}
            </div>
          ) : null}
          <SectionCard
            eyebrow="Camada objetiva"
            title="Corpo e estado"
            description="Seja rápido e honesto: sono, comida, movimento e como você se sentiu em escala."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="horas_sono" className={labelClass}>
                  Horas de sono
                </label>
                <input
                  id="horas_sono"
                  name="horas_sono"
                  type="number"
                  min={0}
                  max={24}
                  step={0.5}
                  placeholder="ex.: 7.5"
                  className={inputBase}
                />
              </div>
              <div>
                <span className={labelClass}>Qualidade do sono</span>
                <div className="flex flex-wrap gap-2">
                  {(["ruim", "media", "boa"] as const).map((v) => (
                    <label
                      key={v}
                      className="flex cursor-pointer items-center gap-2 rounded-2xl border border-white/[0.08] bg-black/25 px-4 py-2.5 text-sm transition has-[:checked]:border-emerald-500/50 has-[:checked]:bg-emerald-500/10 has-[:checked]:text-emerald-200"
                    >
                      <input
                        type="radio"
                        name="qualidade_sono"
                        value={v}
                        className="sr-only"
                      />
                      {v === "media" ? "Média" : v === "ruim" ? "Ruim" : "Boa"}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="alimentacao" className={labelClass}>
                Alimentação
              </label>
              <textarea
                id="alimentacao"
                name="alimentacao"
                rows={3}
                placeholder="O que comeu, horários, água, quantidades, qualidade da comida, etc."
                className={`${inputBase} resize-y min-h-[88px]`}
              />
            </div>

            <div>
              <label htmlFor="atividade_fisica" className={labelClass}>
                Atividade física
              </label>
              <textarea
                id="atividade_fisica"
                name="atividade_fisica"
                rows={3}
                placeholder="Acedemia, esportes, corrida etc. Quanto tempo, qual intensidade."
                className={`${inputBase} resize-y min-h-[88px]`}
              />
            </div>

                  
            <div className="grid gap-8 border-t border-white/[0.06] pt-8 sm:grid-cols-1">
            <span>Responda com base no que percebeu do seu dia </span>
              <ScaleSlider
                id="energia"
                name="energia"
                label="Energia (0–10)"
                value={energia}
                onChange={setEnergia}
              />
              <ScaleSlider
                id="humor"
                name="humor"
                label="Humor (0–10)"
                value={humor}
                onChange={setHumor}
              />
              <ScaleSlider
                id="estresse_ansiedade"
                name="estresse_ansiedade"
                label="Estresse / ansiedade (0–10)"
                value={estresse}
                onChange={setEstresse}
              />
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Camada guiada"
            title="Momentos e pessoas"
            description="Pense no dia como uma história: o melhor trecho, o mais difícil e como foi estar com gente."
          >
            <div className="space-y-2">
              <label htmlFor="momento_positivo" className={labelClass}>
                Qual foi o momento mais positivo do dia?
              </label>
              <textarea
                id="momento_positivo"
                name="momento_positivo"
                rows={2}
                className={`${inputBase} resize-y`}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="positivo_o_que" className={labelClass}>
                O que aconteceu?
              </label>
              <textarea
                id="positivo_o_que"
                name="positivo_o_que"
                rows={2}
                className={`${inputBase} resize-y`}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="positivo_emocao" className={labelClass}>
                Como você se sentiu? (tenta nomear a emoção)
              </label>
              <textarea
                id="positivo_emocao"
                name="positivo_emocao"
                rows={2}
                className={`${inputBase} resize-y`}
              />
            </div>

            <div className="border-t border-white/[0.06] pt-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                Momento difícil
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="momento_negativo" className={labelClass}>
                Qual foi o momento mais negativo ou desconfortável?
              </label>
              <textarea
                id="momento_negativo"
                name="momento_negativo"
                rows={2}
                className={`${inputBase} resize-y`}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="negativo_o_que" className={labelClass}>
                O que aconteceu?
              </label>
              <textarea
                id="negativo_o_que"
                name="negativo_o_que"
                rows={2}
                className={`${inputBase} resize-y`}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="negativo_sentiu" className={labelClass}>
                Como você se sentiu?
              </label>
              <textarea
                id="negativo_sentiu"
                name="negativo_sentiu"
                rows={2}
                className={`${inputBase} resize-y`}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="negativo_reagiu" className={labelClass}>
                Como você reagiu?
              </label>
              <textarea
                id="negativo_reagiu"
                name="negativo_reagiu"
                rows={2}
                className={`${inputBase} resize-y`}
              />
            </div>

            <div className="border-t border-white/[0.06] pt-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                Socialização
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="socializacao" className={labelClass}>
                Como foi sua socialização?
              </label>
              <textarea
                id="socializacao"
                name="socializacao"
                rows={2}
                className={`${inputBase} resize-y`}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="com_quem" className={labelClass}>
                Com quem você interagiu?
              </label>
              <textarea
                id="com_quem"
                name="com_quem"
                rows={2}
                className={`${inputBase} resize-y`}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="energia_social" className={labelClass}>
                Isso te energizou ou drenou?
              </label>
              <textarea
                id="energia_social"
                name="energia_social"
                rows={2}
                placeholder="Pode ser os dois — descreva."
                className={`${inputBase} resize-y`}
              />
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Camada livre"
            title="Seu dia em palavras suas"
            description="Sem estrutura: escreva o que vier."
          >
            <div className="space-y-2">
              <label htmlFor="dia_livre" className={labelClass}>
                Conte como foi seu dia em geral, o que fez e como se sentiu
              </label>
              <textarea
                id="dia_livre"
                name="dia_livre"
                rows={8}
                className={`${inputBase} resize-y min-h-[200px]`}
              />
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Extra"
            title="Fecho do dia"
            description="Duas perguntas para amanhã ser um pouco mais claro."
          >
            <div className="space-y-2">
              <label htmlFor="influencia" className={labelClass}>
                O que mais influenciou como eu me senti hoje?
              </label>
              <textarea
                id="influencia"
                name="influencia"
                rows={3}
                className={`${inputBase} resize-y`}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="diferente" className={labelClass}>
                Teve algo que eu faria diferente?
              </label>
              <textarea
                id="diferente"
                name="diferente"
                rows={3}
                className={`${inputBase} resize-y`}
              />
            </div>
          </SectionCard>

          <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:justify-end">
            <SubmitButton className="inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 enabled:active:scale-[0.99] disabled:opacity-70">
              Salvar entrada
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
