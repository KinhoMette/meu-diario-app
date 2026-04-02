"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type GratitudeFormState = {
  ok: boolean;
  message?: string;
};

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (v == null || typeof v !== "string") return null;
  const t = v.trim();
  return t === "" ? null : t;
}

export async function saveGratitudeEntry(
  _prev: GratitudeFormState,
  formData: FormData
): Promise<GratitudeFormState> {
  try {
    const supabase = createSupabaseServerClient();
  
    const row = {
      gratidao_1: str(formData, "gratidao_1"),
      gratidao_1_porque: str(formData, "gratidao_1_porque"),
      gratidao_2: str(formData, "gratidao_2"),
      gratidao_2_porque: str(formData, "gratidao_2_porque"),
      gratidao_3: str(formData, "gratidao_3"),
      gratidao_3_porque: str(formData, "gratidao_3_porque"),
    };

    const { error } = await supabase.from("gratitude_entries").insert([row]);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return { ok: false, message: JSON.stringify(error) };
    }

    return { ok: true, message: "Gratidão salva com sucesso." };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erro ao salvar.";
    return { ok: false, message };
  }
}
