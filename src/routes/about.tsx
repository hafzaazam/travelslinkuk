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
