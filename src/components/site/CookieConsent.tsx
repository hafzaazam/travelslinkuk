import { useEffect, useState, useCallback } from "react";
import { Cookie, Settings2, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "tls-cookie-consent-v1";

export type CookieCategories = {
  necessary: true;
  analytics: boolean;
  functional: boolean;
};

type StoredConsent = {
  categories: CookieCategories;
  decidedAt: string;
  version: 1;
};

const DEFAULT_CATEGORIES: CookieCategories = {
  necessary: true,
  analytics: false,
  functional: false,
};

function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed?.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(categories: CookieCategories) {
  const payload: StoredConsent = {
    categories,
    decidedAt: new Date().toISOString(),
    version: 1,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  // Reflect choice to GA if present
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      analytics_storage: categories.analytics ? "granted" : "denied",
      functionality_storage: categories.functional ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  window.dispatchEvent(new CustomEvent("cookieconsent:change", { detail: payload }));
}

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("cookieconsent:open"));
}

const CATEGORIES: Array<{
  key: keyof CookieCategories;
  title: string;
  desc: string;
  required?: boolean;
}> = [
  {
    key: "necessary",
    title: "Strictly necessary",
    desc: "Required for the site to function — security, routing, and remembering your cookie choices.",
    required: true,
  },
  {
    key: "analytics",
    title: "Analytics",
    desc: "Google Analytics helps us understand how visitors use the site so we can improve it.",
  },
  {
    key: "functional",
    title: "Functional",
    desc: "Used by features such as the chat widget and forms to remember inputs during your visit.",
  },
];

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [choices, setChoices] = useState<CookieCategories>(DEFAULT_CATEGORIES);

  useEffect(() => {
    setMounted(true);
    const existing = readConsent();
    if (!existing) {
      setOpen(true);
    } else {
      setChoices(existing.categories);
    }
    const openHandler = () => {
      const current = readConsent();
      if (current) setChoices(current.categories);
      setShowPrefs(true);
      setOpen(true);
    };
    window.addEventListener("cookieconsent:open", openHandler);
    return () => window.removeEventListener("cookieconsent:open", openHandler);
  }, []);

  const persist = useCallback((cats: CookieCategories) => {
    writeConsent(cats);
    setChoices(cats);
    setOpen(false);
    setShowPrefs(false);
  }, []);

  const acceptAll = () => persist({ necessary: true, analytics: true, functional: true });
  const rejectAll = () => persist({ necessary: true, analytics: false, functional: false });
  const saveChoices = () => persist(choices);

  if (!mounted || !open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-5 sm:pb-5 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-border bg-white/95 shadow-2xl backdrop-blur-md overflow-hidden">
        {!showPrefs ? (
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white">
                <Cookie className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="flex-1 min-w-0">
                <h2 id="cookie-consent-title" className="font-display text-base font-bold text-foreground sm:text-lg">
                  We value your privacy
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We use cookies to keep the site running, analyse usage, and improve your experience. You can accept all, reject non-essential, or manage your preferences. See our{" "}
                  <a href="/cookies" className="text-primary underline-offset-2 hover:underline">Cookie Policy</a>.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => persist({ necessary: true, analytics: false, functional: false })}
                className="hidden sm:grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => setShowPrefs(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                <Settings2 className="h-4 w-4" />
                Preferences
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-bold text-white shadow-glow hover:-translate-y-0.5 transition"
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="cookie-consent-title" className="font-display text-base font-bold text-foreground sm:text-lg">
                  Cookie preferences
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose which categories you allow. You can change this anytime from the footer.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close preferences"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
              {CATEGORIES.map((c) => {
                const checked = c.required ? true : Boolean(choices[c.key]);
                return (
                  <li key={c.key} className="flex items-start justify-between gap-4 p-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{c.title}</p>
                        {c.required && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Always on
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{c.desc}</p>
                    </div>
                    <Switch
                      checked={checked}
                      disabled={c.required}
                      onCheckedChange={(v) =>
                        setChoices((prev) => ({ ...prev, [c.key]: c.required ? true : v }))
                      }
                      aria-label={`Toggle ${c.title}`}
                    />
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={saveChoices}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-bold text-white shadow-glow hover:-translate-y-0.5 transition"
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
