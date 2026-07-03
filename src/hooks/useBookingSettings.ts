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

export function invalidateBookingSettingsCache() {
  cache = null;
}

export function useBookingSettings() {
  const [data, setData] = useState<BookingSettings | null>(cache);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: row } = await supabase
        .from("booking_settings" as never)
        .select("*")
        .limit(1)
        .maybeSingle();
      if (!alive) return;
      const merged = { ...DEFAULT_BOOKING_SETTINGS, ...(row as object | null ?? {}) } as BookingSettings;
      cache = merged;
      setData(merged);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return { data, loading };
}
