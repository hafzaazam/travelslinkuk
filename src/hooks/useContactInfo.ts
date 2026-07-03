import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ContactInfo = {
  address: string;
  map_query: string;
  email: string;
  phone_display: string;
  phone_e164: string;
  whatsapp_e164: string;
  hours: string;
};

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  address: "138 Milton Street, Northampton, NN2 7DE",
  map_query: "138 Milton Street, Northampton, NN2 7DE",
  email: "contact@travellinks.uk",
  phone_display: "+44 787 946 5341",
  phone_e164: "+447879465341",
  whatsapp_e164: "447879465341",
  hours: "Mon–Fri 9:00–18:00",
};

// Cache across components in this session.
let cached: ContactInfo | null = null;
let pending: Promise<ContactInfo> | null = null;

async function fetchContactInfo(): Promise<ContactInfo> {
  if (cached) return cached;
  if (pending) return pending;
  pending = (async () => {
    const { data } = await supabase
      .from("contact_info")
      .select("address,map_query,email,phone_display,phone_e164,whatsapp_e164,hours")
      .maybeSingle();
    const merged: ContactInfo = { ...DEFAULT_CONTACT_INFO, ...(data ?? {}) };
    cached = merged;
    return merged;
  })();
  return pending;
}

export function invalidateContactInfoCache() {
  cached = null;
  pending = null;
}

export function useContactInfo(): ContactInfo {
  const [info, setInfo] = useState<ContactInfo>(cached ?? DEFAULT_CONTACT_INFO);
  useEffect(() => {
    let mounted = true;
    fetchContactInfo().then((data) => {
      if (mounted) setInfo(data);
    });
    return () => {
      mounted = false;
    };
  }, []);
  return info;
}
