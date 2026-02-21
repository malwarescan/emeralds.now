import { createClient } from "@supabase/supabase-js";

export type ConciergeLeadPayload = {
  interest?: string;
  budget?: string;
  timeline?: string;
  ring_size?: string;
  preferences?: string;
  appointment_type?: "virtual" | "in-person";
  contact_preference?: "whatsapp" | "email";
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function captureConciergeLead(payload: ConciergeLeadPayload): Promise<void> {
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[Concierge] No Supabase env; lead not persisted:", payload);
      return;
    }
    throw new Error("Concierge: Supabase not configured");
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { error } = await supabase.from("concierge_leads").insert({
    interest: payload.interest,
    budget: payload.budget,
    timeline: payload.timeline,
    ring_size: payload.ring_size,
    preferences: payload.preferences,
    appointment_type: payload.appointment_type,
    contact_preference: payload.contact_preference,
    created_at: new Date().toISOString(),
  });

  if (error) throw error;
}
