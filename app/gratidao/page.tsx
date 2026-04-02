"use client";

import Link from "next/link";
import { useActionState, useMemo } from "react";
import {
  saveGratitudeEntry,
  type GratitudeFormState,
} from "@/app/actions/gratitude";
import { SubmitButton } from "@/components/submit-button";
import { hojeEmSaoPauloYmd } from "@/lib/date-brasilia";

const inputBase =
  "w-full rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20";

const labelClass = "mb-2 block text-sm font-medium text-white/85";

const gratitudeInitialState: GratitudeFormState = { ok: false };

export default function GratidaoPage() {
  const [gratitudeState, gratitudeFormAction] = useActionState(
    saveGratitudeEntry,
    gratitudeInitialState
  );
  const defaultEntryDate = useMemo(() => hojeEmSaoPauloYmd(), []);

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
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-transparent px-4 py-2 text-sm font-medium text-white/60 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
            >
              Diário do dia
            </Link>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              Gratidão
            </span>
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/35">
            Reflexão diária
          </p>
        </nav>

        <header className="mb-12 text-center sm:mb-14 sm:text-left">
          <h1 className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Diário da gratidão
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/55 sm:mx-0">
            Três gratidões concretas de hoje — e o porquê cada uma importou para
            você.
          </p>
        </header>

        <form action={gratitudeFormAction} className="space-y-8">
          {gratitudeState.message ? (
            <div
              role="status"
              aria-live="polite"
              className={
                gratitudeState.ok
                  ? "rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
                  : "rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              }
            >
              {gratitudeState.message}
            </div>
          ) : null}

          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-xl sm:p-8">
            <label htmlFor="entry_date" className={labelClass}>
              Data do diário
            </label>
            <input
              id="entry_date"
              name="entry_date"
              type="date"
              required
              defaultValue={defaultEntryDate}
              className={`${inputBase} mb-6 cursor-pointer [color-scheme:dark]`}
            />
            <p className="mb-8 text-xs text-white/45">
              Dia a que estas gratidões se referem (calendário de Brasília).
            </p>
            <div className="mb-8 border-b border-white/[0.06] pb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
                Hoje
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                3 coisas específicas do dia pelas quais sou grato
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
                Seja específico: um fato, pessoa ou momento — não só “minha
                família”, e sim o que aconteceu. Em seguida, reflita por que
                isso importou.
              </p>
            </div>

            <div className="space-y-10">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl border border-white/[0.06] bg-black/15 p-5 sm:p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-sm font-bold text-emerald-300">
                      {n}
                    </span>
                    <p className="text-sm font-medium text-white/90">
                      Coisa #{n}
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor={`gratidao_${n}`}
                        className={labelClass}
                      >
                        Pelo que sou grato (específico)
                      </label>
                      <textarea
                        id={`gratidao_${n}`}
                        name={`gratidao_${n}`}
                        rows={3}
                        placeholder="Ex.: ligação da minha irmã no almoço..."
                        className={`${inputBase} resize-y min-h-[88px]`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`gratidao_${n}_porque`}
                        className={labelClass}
                      >
                        Por que isso foi importante pra mim?
                      </label>
                      <textarea
                        id={`gratidao_${n}_porque`}
                        name={`gratidao_${n}_porque`}
                        rows={3}
                        placeholder="O que isso trouxe, lembrou ou mudou no seu dia..."
                        className={`${inputBase} resize-y min-h-[88px]`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

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
