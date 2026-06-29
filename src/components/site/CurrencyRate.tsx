import { useEffect, useState } from "react";
import { ArrowRightLeft, Loader2 } from "lucide-react";

// Extract ISO 4217 currency code from a label like "Euro (EUR)"
function extractCode(currency: string): string | null {
  const m = currency.match(/\(([A-Z]{3})\)/);
  return m ? m[1] : null;
}

type RateState =
  | { status: "loading" }
  | { status: "ready"; rate: number; updated: string }
  | { status: "error" };

export function CurrencyRate({ currency }: { currency: string }) {
  const code = extractCode(currency);
  const [state, setState] = useState<RateState>({ status: "loading" });

  useEffect(() => {
    if (!code) {
      setState({ status: "error" });
      return;
    }
    if (code === "USD") {
      setState({ status: "ready", rate: 1, updated: new Date().toUTCString() });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://open.er-api.com/v6/latest/USD`);
        if (!res.ok) throw new Error("rate fetch failed");
        const data = await res.json();
        const rate = data?.rates?.[code];
        if (typeof rate !== "number") throw new Error("rate missing");
        if (!cancelled) {
          setState({
            status: "ready",
            rate,
            updated: data?.time_last_update_utc ?? new Date().toUTCString(),
          });
        }
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code]);

  if (!code) return null;

  return (
    <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-4 sm:p-5">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
        <ArrowRightLeft className="h-3.5 w-3.5" />
        Live exchange rate
      </div>
      <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-2xl sm:text-3xl font-bold text-foreground">
          $1 USD
        </span>
        <span className="text-muted-foreground">=</span>
        {state.status === "ready" ? (
          <span className="font-display text-2xl sm:text-3xl font-bold text-gradient-brand">
            {state.rate.toLocaleString(undefined, {
              maximumFractionDigits: state.rate >= 100 ? 2 : 4,
            })}{" "}
            {code}
          </span>
        ) : state.status === "loading" ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Fetching rate…
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">
            Rate unavailable right now
          </span>
        )}
      </div>
      {state.status === "ready" && (
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          Updated {new Date(state.updated).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}{" "}
          · Source: open.er-api.com
        </p>
      )}
    </div>
  );
}
