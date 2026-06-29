import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/Section";
import {
  Plane,
  Briefcase,
  Users,
  GraduationCap,
  HomeIcon,
  RefreshCcw,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
  Clock,
  Wallet,
} from "lucide-react";
import { openApplyDialog } from "@/components/site/ApplyDialog";

const SERVICES_FAQS = [
  { q: "Which visa types does Travel Links Solution handle?", a: "We handle tourist, business, family, study, settlement and refusal-appeal visas for 25+ countries including the UK, USA, Canada, Australia, New Zealand and all Schengen states." },
  { q: "How long does a visa application take?", a: "Most tourist and business visas take 2–6 weeks; study, family and settlement visas typically take 6–12 weeks depending on the embassy. We share a realistic timeline during your free consultation." },
  { q: "What is your visa approval rate?", a: "Travel Links Solution maintains a 98% approval rate across all visa categories thanks to senior-consultant case review before every submission." },
  { q: "How much do your visa services cost?", a: "Our consultancy fees are transparent and quoted upfront after a free assessment. Embassy/government fees are billed at cost with no markup." },
  { q: "Can you help if my visa was previously refused?", a: "Yes. We review the refusal grounds, strengthen weak documentation and prepare a structured reapplication or formal appeal." },
  { q: "Do you offer a free consultation?", a: "Yes — every enquiry starts with a free 20-minute consultation with a senior UK visa consultant to assess eligibility and next steps." },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Visa Services — Tourist, Business, Family & Study Visas | Travel Links Solution" },
      { name: "description", content: "End-to-end UK visa consultancy: tourist, business, family, study, settlement and refusal-appeal services for 25+ countries with a 98% approval rate." },
      { name: "keywords", content: "visa services UK, tourist visa, business visa, family visa, study visa, settlement visa, visa refusal appeal, UK visa consultant" },
      { property: "og:title", content: "Visa Services — Travel Links Solution" },
      { property: "og:description", content: "Tourist, business, family, study and settlement visa support handled end-to-end by senior UK consultants." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://travellinks.uk/services" },
      { property: "og:site_name", content: "Travel Links Solution" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Visa Services — Travel Links Solution" },
      { name: "twitter:description", content: "End-to-end visa services across 25+ destinations, handled by senior UK consultants." },
    ],
    links: [{ rel: "canonical", href: "https://travellinks.uk/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Visa consultancy",
          name: "Travel Links Solution Visa Services",
          url: "https://travellinks.uk/services",
          areaServed: "Worldwide",
          provider: {
            "@type": "Organization",
            name: "Travel Links Solution",
            url: "https://travellinks.uk",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Visa Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tourist Visa" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Visa" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Family Visa" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Study Visa" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Settlement & PR" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Refusal & Appeal" } },
            ],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: SERVICES_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://travellinks.uk/" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://travellinks.uk/services" },
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

const DETAILED = [
  {
    icon: Plane,
    title: "Tourist Visa",
    text: "Holiday, family visit and short-stay applications for Schengen, UK, USA, Canada, Australia and 20+ destinations.",
    bullets: ["Itinerary & cover letter drafting", "Financial document review", "Embassy appointment booking"],
  },
  {
    icon: Briefcase,
    title: "Business Visa",
    text: "Meetings, conferences, trade fairs and short-term assignments — with invitation-letter handling.",
    bullets: ["Sponsor / invitation coordination", "Multi-entry strategy", "Investor & B-1/B-2 pathways"],
  },
  {
    icon: Users,
    title: "Family Visa",
    text: "Spouse, dependent and family reunification cases with sensitive, end-to-end case management.",
    bullets: ["Relationship evidence portfolio", "Sponsor income & accommodation", "Dependant inclusion strategy"],
  },
  {
    icon: GraduationCap,
    title: "Study Visa",
    text: "Student route applications for the UK, Canada, Australia, Ireland and Schengen countries.",
    bullets: ["CAS / I-20 / LoA guidance", "Financial proof structuring", "Tier-4 / Student route filings"],
  },
  {
    icon: HomeIcon,
    title: "Settlement & PR",
    text: "Long-stay, residency and indefinite leave applications with full eligibility assessment.",
    bullets: ["Eligibility audit", "Document mapping", "Biometrics & decision follow-up"],
  },
  {
    icon: RefreshCcw,
    title: "Refusal & Appeal",
    text: "Review of refused applications, reapplication strategy and administrative review support.",
    bullets: ["Refusal-letter analysis", "Strengthened reapplication", "Appeal & review filings"],
  },
];

const INCLUDED = [
  "Free 20-minute eligibility consultation",
  "Personalised document checklist",
  "Senior-consultant case review",
  "Application form preparation",
  "Cover letter & SOP drafting",
  "Embassy appointment booking",
  "Biometrics & VFS guidance",
  "24/7 WhatsApp & email support",
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28">
        {/* Hero */}
        <section className="relative py-20 px-5 lg:px-8 overflow-hidden bg-gradient-soft">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
            <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-brand-cyan/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl text-center">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
                <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <li>
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-primary">Services</li>
                </ol>
              </nav>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Visa Services
              </span>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                End-to-end visa solutions <span className="text-gradient-brand">tailored to you</span>
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                Six core services, hundreds of case types — all handled by experienced UK consultants from initial
                eligibility to visa stamp.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={openApplyDialog}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition"
                >
                  Consult Now <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white px-6 py-3.5 text-sm font-semibold text-primary hover:bg-primary/5 transition"
                >
                  Free consultation
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <Services />


        {/* What's included */}
        <section className="py-24 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="right">
              <SectionHeading
                eyebrow="What's Included"
                title={<>Everything you need, <span className="text-gradient-brand">nothing you don't</span></>}
                description="One transparent package — from first consultation to visa decision and beyond."
                center={false}
              />
              <div className="mt-6 flex flex-wrap gap-3 text-xs">
                {[
                  { icon: FileCheck2, label: "Documentation" },
                  { icon: Clock, label: "Fast turnaround" },
                  { icon: Wallet, label: "Transparent fees" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 font-semibold text-primary">
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal direction="left" delay={100}>
              <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-card">
                <ul className="grid sm:grid-cols-2 gap-3">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-brand text-white shadow-soft">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <Process />

        {/* FAQ */}
        <section className="py-20 px-5 lg:px-8 bg-gradient-soft">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="FAQ"
              title={<>Common questions about <span className="text-gradient-brand">our visa services</span></>}
            />
            <dl className="mt-10 space-y-4">
              {SERVICES_FAQS.map((f) => (
                <div key={f.q} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
                  <dt className="font-display font-semibold text-base">{f.q}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
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
