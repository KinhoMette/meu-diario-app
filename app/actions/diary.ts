"use server";

import { parseEntryDate } from "@/lib/date-brasilia";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DiaryFormState = {
  ok: boolean;
  message?: string;
};

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (v == null || typeof v !== "string") return null;
  const t = v.trim();
  return t === "" ? null : t;
}

function int(formData: FormData, key: string): number | null {
  const v = formData.get(key);
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}

function num(formData: FormData, key: string): number | null {
  const v = formData.get(key);
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function saveDiaryEntry(
  _prev: DiaryFormState,
  formData: FormData
): Promise<DiaryFormState> {
  try {
    const entryDate = parseEntryDate(str(formData, "entry_date"));
    if (!entryDate) {
      return { ok: false, message: "Informe uma data válida (dia do diário)." };
    }

    const supabase = createSupabaseServerClient();

    const row = {
      entry_date: entryDate,
      horas_sono: num(formData, "horas_sono"),
      qualidade_sono: str(formData, "qualidade_sono"),
      alimentacao: str(formData, "alimentacao"),
      atividade_fisica: str(formData, "atividade_fisica"),
      energia: int(formData, "energia"),
      humor: int(formData, "humor"),
      estresse_ansiedade: int(formData, "estresse_ansiedade"),
      momento_positivo: str(formData, "momento_positivo"),
      positivo_o_que: str(formData, "positivo_o_que"),
      positivo_emocao: str(formData, "positivo_emocao"),
      momento_negativo: str(formData, "momento_negativo"),
      negativo_o_que: str(formData, "negativo_o_que"),
      negativo_sentiu: str(formData, "negativo_sentiu"),
      negativo_reagiu: str(formData, "negativo_reagiu"),
      socializacao: str(formData, "socializacao"),
      com_quem: str(formData, "com_quem"),
      energia_social: str(formData, "energia_social"),
      dia_livre: str(formData, "dia_livre"),
      influencia: str(formData, "influencia"),
      diferente: str(formData, "diferente"),
    };

    const { error } = await supabase.from("diary_entries").insert(row);

    if (error) {
      return { ok: false, message: error.message };
    }

    return { ok: true, message: "Entrada salva com sucesso." };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erro ao salvar.";
    return { ok: false, message };
  }
}
