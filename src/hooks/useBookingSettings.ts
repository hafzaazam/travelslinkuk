import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type BookingSettings = {
  id?: string;
  active: boolean;
  consultation_fee: number;
  currency: string;
  bank_name: string | null;
  account_name: string | null;
  account_number: string | null;
  sort_code: string | null;
  iban: string | null;
  swift: string | null;
  reference_prefix: string | null;
  payment_notes: string | null;
};

export const DEFAULT_BOOKING_SETTINGS: BookingSettings = {
  active: false,
  consultation_fee: 50,
  currency: "GBP",
  bank_name: null,
  account_name: null,
  account_number: null,
  sort_code: null,
  iban: null,
  swift: null,
  reference_prefix: "TL",
  payment_notes: null,
};

let cache: BookingSettings | null = null;
const listeners = new Set<(v: BookingSettings) => void>();

function setCache(next: BookingSettings) {
  cache = next;
  listeners.forEach((fn) => fn(next));
}

export function invalidateBookingSettingsCache() {
  cache = null;
}

async function fetchSettings() {
  const { data: row } = await supabase
    .from("booking_settings" as never)
    .select("*")
    .limit(1)
    .maybeSingle();
  const merged = { ...DEFAULT_BOOKING_SETTINGS, ...(row as object | null ?? {}) } as BookingSettings;
  setCache(merged);
  return merged;
}

let realtimeStarted = false;
function ensureRealtime() {
  if (realtimeStarted) return;
  realtimeStarted = true;
  supabase
    .channel("booking_settings-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "booking_settings" },
      () => {
        fetchSettings();
      },
    )
    .subscribe();
}

export function useBookingSettings() {
  const [data, setData] = useState<BookingSettings | null>(cache);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    let alive = true;
    const listener = (next: BookingSettings) => {
      if (alive) setData(next);
    };
    listeners.add(listener);
    ensureRealtime();

    (async () => {
      // Always refetch on mount so freshly-toggled values propagate.
      await fetchSettings();
      if (alive) setLoading(false);
    })();

    return () => {
      alive = false;
      listeners.delete(listener);
    };
  }, []);

  return { data, loading };
}
