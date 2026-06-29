import { useEffect, useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";

type Props = {
  slug: string;
  items: string[];
};

export function CountryChecklist({ slug, items }: Props) {
  const storageKey = `tls-checklist-${slug}`;
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage after mount (SSR-safe)
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(storageKey) : null;
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [storageKey]);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, hydrated, storageKey]);

  const completed = useMemo(
    () => items.reduce((n, _, i) => (checked[i] ? n + 1 : n), 0),
    [items, checked],
  );
  const pct = items.length === 0 ? 0 : Math.round((completed / items.length) * 100);

  const toggle = (i: number) =>
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  const reset = () => setChecked({});

  return (
    <div className="rounded-3xl bg-white border border-border p-6 sm:p-7 shadow-card">
      {/* Progress header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Your progress
          </div>
          <div className="mt-1 font-display text-lg font-semibold text-foreground">
            {completed} of {items.length} ready
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 h-9 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      <div className="mt-4 h-2 w-full rounded-full bg-primary/10 overflow-hidden">
        <div
          className="h-full bg-gradient-brand transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Items */}
      <ul className="mt-6 space-y-2.5">
        {items.map((item, i) => {
          const isChecked = !!checked[i];
          return (
            <li key={`${slug}-${i}`}>
              <label
                className={`flex items-start gap-3 rounded-2xl border p-3.5 cursor-pointer transition-all select-none ${
                  isChecked
                    ? "bg-primary/5 border-primary/30"
                    : "bg-white border-border hover:border-primary/30 hover:bg-primary/[0.02]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(i)}
                  className="sr-only"
                  aria-label={item}
                />
                <span
                  className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-all ${
                    isChecked
                      ? "bg-gradient-brand border-transparent text-white shadow-soft"
                      : "border-muted-foreground/30 text-transparent"
                  }`}
                  aria-hidden
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span
                  className={`text-sm leading-relaxed transition-all ${
                    isChecked
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }`}
                >
                  {item}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-xs text-muted-foreground">
        Tip: your progress is saved on this device. Tick each item as you collect it.
      </p>
    </div>
  );
}
