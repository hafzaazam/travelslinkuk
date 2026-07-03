import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Popup = {
  id: string;
  title: string;
  body: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_url: string | null;
  placement: string;
  frequency: string;
  dismissible: boolean;
};

const STORAGE_PREFIX = "tls_popup_seen_";

function seenKey(id: string) {
  return `${STORAGE_PREFIX}${id}`;
}

function alreadySeen(p: Popup): boolean {
  if (typeof window === "undefined") return true;
  if (p.frequency === "always") return false;
  try {
    const store = p.frequency === "session" ? sessionStorage : localStorage;
    return !!store.getItem(seenKey(p.id));
  } catch {
    return false;
  }
}

function markSeen(p: Popup) {
  if (typeof window === "undefined" || p.frequency === "always") return;
  try {
    const store = p.frequency === "session" ? sessionStorage : localStorage;
    store.setItem(seenKey(p.id), String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function SitePopup() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const nowIso = new Date().toISOString();
      const { data } = await supabase
        .from("site_popups")
        .select("id,title,body,image_url,cta_label,cta_url,placement,frequency,dismissible")
        .eq("active", true)
        .or(`start_at.is.null,start_at.lte.${nowIso}`)
        .or(`end_at.is.null,end_at.gte.${nowIso}`)
        .order("priority", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(5);
      if (!mounted || !data?.length) return;
      const next = data.find((p) => !alreadySeen(p as Popup)) as Popup | undefined;
      if (!next) return;
      setPopup(next);
      const t = setTimeout(() => mounted && setOpen(true), 1200);
      return () => clearTimeout(t);
    })();
    return () => { mounted = false; };
  }, []);

  if (!popup || !open) return null;

  const close = () => {
    markSeen(popup);
    setOpen(false);
  };

  const positionClass =
    popup.placement === "bottom-right"
      ? "items-end justify-end p-6"
      : popup.placement === "bottom-left"
      ? "items-end justify-start p-6"
      : "items-center justify-center p-4";

  return (
    <div
      className={`fixed inset-0 z-[100] flex ${positionClass} bg-black/50 backdrop-blur-sm animate-in fade-in duration-300`}
      onClick={popup.dismissible ? close : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        {popup.dismissible && (
          <button
            onClick={close}
            aria-label="Close popup"
            className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-foreground shadow hover:bg-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {popup.image_url && (
          <img src={popup.image_url} alt="" className="h-40 w-full object-cover" loading="lazy" />
        )}
        <div className="p-6">
          <h3 id="popup-title" className="font-display text-xl font-bold text-foreground">
            {popup.title}
          </h3>
          {popup.body && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {popup.body}
            </p>
          )}
          {popup.cta_label && popup.cta_url && (
            <a
              href={popup.cta_url}
              onClick={() => markSeen(popup)}
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition"
            >
              {popup.cta_label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
