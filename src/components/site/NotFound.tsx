import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home, MapPin, Plane, Search } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const QUICK_LINKS = [
  { to: "/", label: "Home", desc: "Back to the start" },
  { to: "/services", label: "Services", desc: "What we offer" },
  { to: "/about", label: "About us", desc: "Who we are" },
  { to: "/contact", label: "Contact", desc: "Talk to our team" },
];

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(60% 60% at 20% 10%, hsl(var(--primary)/0.10), transparent 60%), radial-gradient(50% 50% at 90% 30%, hsl(var(--primary)/0.08), transparent 60%)",
            }}
          />
          <div className="container mx-auto px-4 pt-28 pb-16 sm:pt-32 sm:pb-24">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <Plane className="h-3.5 w-3.5 text-primary" />
                Looks like you've wandered off the route
              </div>

              <div
                aria-hidden="true"
                className="mt-6 bg-gradient-brand bg-clip-text text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl"
              >
                404
              </div>
              <h1 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                This page didn't board
              </h1>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
                The page you're looking for has either moved, been renamed, or
                never existed. Let's get you back on track.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <Home className="h-4 w-4" />
                  Go home
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Contact support
                </Link>
              </div>
            </div>

            <div className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-2">
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    {l.to === "/" ? (
                      <Home className="h-5 w-5" />
                    ) : l.to === "/contact" ? (
                      <MapPin className="h-5 w-5" />
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-foreground">
                      {l.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {l.desc}
                    </span>
                  </span>
                  <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
