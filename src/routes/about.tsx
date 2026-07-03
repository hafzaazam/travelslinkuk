import { createFileRoute } from "@tanstack/react-router";
import aboutVisa from "@/assets/about-visa.png.asset.json";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { Reveal } from "@/components/site/Reveal";
import { WhyUs } from "@/components/site/WhyUs";
import { Stats } from "@/components/site/Stats";
import { CTABanner } from "@/components/site/CTABanner";
import { SectionHeading } from "@/components/site/Section";
import {
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Globe2,
  Award,
  Users,
  CheckCircle2,
  Quote,
  Linkedin,
  Mail,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Travel Links Solution | UK Visa Consultancy" },
      { name: "description", content: "Meet Travel Links Solution: a UK-registered visa consultancy in Northampton with 10+ years of expertise, 98% approval rate and 25+ destinations covered." },
      { name: "keywords", content: "UK visa consultancy, Travel Links Solution, Northampton visa agents, visa experts UK, about visa consultants" },
      { property: "og:title", content: "About Us — Travel Links Solution | UK Visa Consultancy" },
      { property: "og:description", content: "UK-registered visa consultancy with a decade of expertise guiding tourists, families and business travellers to 25+ destinations." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://travellinks.uk/about" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/f19e1753-ef99-4e5a-a468-7ce55336b2f3/about-visa.png" },
      { property: "og:image:alt", content: "About Travel Links Solution — UK visa consultancy" },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/f19e1753-ef99-4e5a-a468-7ce55336b2f3/about-visa.png" },
      { property: "og:site_name", content: "Travel Links Solution" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Us — Travel Links Solution" },
      { name: "twitter:description", content: "UK-registered visa consultancy with a decade of expertise across 25+ destinations." },
    ],
    links: [{ rel: "canonical", href: "https://travellinks.uk/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Travel Links Solution",
          url: "https://travellinks.uk/about",
          mainEntity: {
            "@type": "Organization",
            name: "Travel Links Solution",
            url: "https://travellinks.uk",
            address: {
              "@type": "PostalAddress",
              streetAddress: "138 Milton Street",
              addressLocality: "Northampton",
              postalCode: "NN2 7DE",
              addressCountry: "GB",
            },
            telephone: "+44 787 946 5341",
            email: "contact@travellinks.uk",
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: ShieldCheck, title: "Integrity first", text: "Honest assessments, transparent fees and no false promises — ever." },
  { icon: HeartHandshake, title: "Personal care", text: "A dedicated consultant guides every case from first call to visa stamp." },
  { icon: Compass, title: "Expert guidance", text: "Decade-long expertise across 25+ visa regimes and embassy procedures." },
  { icon: Sparkles, title: "Premium experience", text: "Concierge-style support over WhatsApp, email and in-person meetings." },
];

const MILESTONES = [
  { year: "2013", title: "Founded in Northampton", text: "Started as a two-person team focused on UK and Schengen visas." },
  { year: "2017", title: "Expanded to 15+ countries", text: "Added North America, Australia and key Asia-Pacific destinations." },
  { year: "2021", title: "10,000+ approved visas", text: "Crossed a major milestone with a 98% approval rate maintained." },
  { year: "2026", title: "25+ destinations, global team", text: "Senior consultants serving travellers worldwide with end-to-end support." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28">
        {/* Hero / intro */}
        <section id="about" className="py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal direction="right" className="lg:col-span-7 text-center lg:text-left">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                About Us
              </span>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                A UK consultancy built on <span className="text-gradient-brand">trust, expertise and results</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Travel Links Solution is a UK-registered visa consultancy with over a decade of experience guiding
                tourists, families and business travellers through complex visa pathways. Our team of senior
                consultants combines deep regulatory knowledge with a genuinely personal approach — so your
                application is in expert hands from day one.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Based in Northampton, we handle end-to-end applications for 25+ destinations across Europe, the
                Americas, Asia-Pacific and beyond — backed by a 98% approval rate and transparent, upfront pricing.
              </p>
            </Reveal>
            <Reveal direction="left" delay={150} className="lg:col-span-5 relative flex justify-center">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-brand opacity-20 blur-3xl" aria-hidden />
              <img
                src={aboutVisa.url}
                alt="Approved visa document illustration"
                className="relative w-full max-w-sm h-auto drop-shadow-[0_30px_60px_rgba(33,87,243,0.35)] animate-float"
                loading="lazy" decoding="async"
              />
            </Reveal>
          </div>
        </section>

        <Stats />

        {/* Mission */}
        <section className="py-20 px-5 lg:px-8 bg-gradient-soft">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <SectionHeading
                eyebrow="Our Mission"
                title={<>Removing the friction between you and the <span className="text-gradient-brand">world</span></>}
                description="Visa rules change constantly. We exist to translate complexity into a calm, confident process — so you can focus on the journey, not the paperwork."
              />
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Globe2, label: "25+ countries covered" },
                  { icon: Users, label: "10,000+ travellers served" },
                  { icon: Award, label: "98% approval rate" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-2xl border border-border bg-white p-5 shadow-soft flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-soft">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CEO / Leadership */}
        <section className="py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow="Leadership"
                title={<>Meet our <span className="text-gradient-brand">CEO</span></>}
                description="The vision and expertise behind Travel Links Solution."
              />
            </Reveal>
            <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <Reveal direction="right" className="lg:col-span-5">
                <div className="relative mx-auto max-w-sm">
                  <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-gradient-brand opacity-25 blur-3xl" />
                  <div aria-hidden className="absolute -top-4 -left-4 h-24 w-24 rounded-2xl border-2 border-primary/40" />
                  <div aria-hidden className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-gradient-brand opacity-20" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-card">
                    <div className="relative aspect-[4/5] bg-gradient-brand p-8 flex flex-col justify-between text-white">
                      <div aria-hidden className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
                      <div aria-hidden className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                      <div aria-hidden className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                      <div className="relative flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">Founder & CEO</span>
                        <ShieldCheck className="h-5 w-5 text-white/80" aria-hidden />
                      </div>

                      <div className="relative flex flex-1 items-center justify-center">
                        <div className="relative">
                          <div aria-hidden className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
                          <div className="relative grid h-40 w-40 sm:h-48 sm:w-48 place-items-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm shadow-glow">
                            <span className="font-display text-6xl sm:text-7xl font-bold tracking-tight">DA</span>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="font-display text-3xl font-bold leading-tight">Dua Asif</div>
                        <div className="mt-1 text-sm text-white/80">Travel Links Solution</div>
                        <div className="mt-4 h-px w-full bg-white/20" />
                        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-white/80">
                          <Compass className="h-3.5 w-3.5" aria-hidden />
                          <span>Northampton, United Kingdom</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal direction="left" delay={150} className="lg:col-span-7">
                <div className="rounded-3xl border border-border bg-white p-7 sm:p-9 shadow-soft">
                  <Quote className="h-8 w-8 text-primary/70" aria-hidden />
                  <blockquote className="mt-3 font-display text-xl sm:text-2xl leading-snug text-foreground">
                    “Every visa is more than paperwork — it's someone's opportunity, reunion or adventure. We treat it that way.”
                  </blockquote>
                  <p className="mt-5 text-muted-foreground leading-relaxed">
                    Dua Asif founded Travel Links Solution with a simple belief: world-class visa guidance shouldn't
                    be reserved for the few. With over a decade in UK immigration advisory and a background in
                    international relations, she leads a team of senior consultants dedicated to turning complex
                    embassy requirements into clear, confident applications.
                  </p>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    Under her leadership, Travel Links Solution has grown from a two-person Northampton office into
                    a trusted consultancy serving 10,000+ travellers across 25+ destinations — with a 98% approval
                    rate that speaks for itself.
                  </p>
                  <dl className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { k: "10+", v: "Years experience" },
                      { k: "25+", v: "Countries covered" },
                      { k: "98%", v: "Approval rate" },
                    ].map(({ k, v }) => (
                      <div key={v} className="rounded-2xl border border-border bg-gradient-soft p-3 text-center">
                        <dt className="font-display text-xl font-bold text-gradient-brand">{k}</dt>
                        <dd className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href="mailto:contact@travellinks.uk"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-glow"
                    >
                      <Mail className="h-4 w-4" /> Email the CEO
                    </a>
                    <a
                      href="https://www.linkedin.com/company/travel-links-solution"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <Linkedin className="h-4 w-4" /> Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow="Our Values"
                title={<>The principles behind <span className="text-gradient-brand">every application</span></>}
              />
            </Reveal>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {VALUES.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 100} direction="up">
                  <div className="group h-full rounded-3xl border border-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-white shadow-soft transition-transform group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-5 lg:px-8 bg-gradient-soft">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading
                eyebrow="Our Journey"
                title={<>A decade of <span className="text-gradient-brand">visa expertise</span></>}
              />
            </Reveal>
            <div className="mt-12 relative">
              <div aria-hidden className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:-translate-x-1/2" />
              <ol className="space-y-8">
                {MILESTONES.map((m, i) => (
                  <Reveal key={m.year} delay={i * 100} direction={i % 2 === 0 ? "right" : "left"}>
                    <li className={`relative grid md:grid-cols-2 gap-6 items-center ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
                      <div className="pl-10 md:pl-0 md:px-8">
                        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{m.year}</div>
                          <h3 className="mt-1 font-display text-lg font-semibold">{m.title}</h3>
                          <p className="mt-1.5 text-sm text-muted-foreground">{m.text}</p>
                        </div>
                      </div>
                      <div aria-hidden className="hidden md:block" />
                      <span aria-hidden className="absolute left-4 md:left-1/2 top-6 md:top-1/2 grid h-3 w-3 -translate-x-1/2 md:-translate-y-1/2 place-items-center rounded-full bg-gradient-brand shadow-glow ring-4 ring-background" />
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <WhyUs />

        {/* Promise */}
        <section className="py-20 px-5 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="rounded-3xl border border-border bg-white p-8 sm:p-10 shadow-card">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold">Our promise to you</h2>
                    <p className="mt-2 text-muted-foreground">
                      Every case is reviewed by a senior consultant before submission. If we don't believe your
                      application is ready, we'll say so — and tell you exactly how to strengthen it.
                    </p>
                    <ul className="mt-5 grid sm:grid-cols-2 gap-2.5 text-sm">
                      {[
                        "Senior-consultant case review",
                        "Transparent, upfront pricing",
                        "Same-day enquiry response",
                        "End-to-end documentation support",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
}
