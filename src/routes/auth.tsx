import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/Logo";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — Travel Links Solution Admin" },
      { name: "description", content: "Secure staff sign-in for the Travel Links Solution admin dashboard. Not a public page." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      email: fd.get("email"),
      password: fd.get("password"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check the form");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword(parsed.data);
      if (error) throw error;
      toast.success("Welcome back");
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-[#04081a] via-[#081637] to-[#0a1e4a] px-5 py-16">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="inline-block">
            <Logo light />
          </Link>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-8 shadow-2xl">
          <h1 className="font-display text-2xl font-bold text-white">Admin Sign In</h1>
          <p className="mt-1 text-sm text-white/60">
            Access the admin dashboard. Accounts are created by invitation only.
          </p>

          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <Field icon={Mail} name="email" type="email" placeholder="you@email.com" label="Email" />
            <Field icon={Lock} name="password" type="password" placeholder="••••••••" label="Password" />
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Sign In
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
        <Link to="/" className="mt-6 block text-center text-xs text-white/50 hover:text-white">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  name,
  type,
  placeholder,
  label,
}: {
  icon: typeof Mail;
  name: string;
  type: string;
  placeholder: string;
  label: string;
}) {
  const id = `auth-${name}`;
  return (
    <label htmlFor={id} className="block">
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">{label}</span>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-3 focus-within:border-brand-aqua/60 focus-within:bg-white/10 transition">
        <Icon className="h-4 w-4 text-white/50" />
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required
          aria-label={label}
          className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
        />
      </div>
    </label>
  );
}
