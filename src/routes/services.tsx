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
  ArrowRight,
  FileCheck2,
  Clock,
  Wallet,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      { title: "UK Visa Services — Tourist, Business & Family | Travel Links" },
      { name: "description", content: "End-to-end UK visa consultancy: tourist, business, family, study, settlement and refusal-appeal services for 25+ countries with a 98% approval rate." },
      { name: "keywords", content: "visa services UK, tourist visa, business visa, family visa, study visa, settlement visa, visa refusal appeal, UK visa consultant" },
      { property: "og:title", content: "Visa Services — Travel Links Solution" },
      { property: "og:description", content: "Tourist, business, family, study and settlement visa support handled end-to-end by senior UK consultants." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://travellinks.uk/services" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/26637276-3809-4947-9ff5-b2c2ad5ac675/travel-suitcase.png" },
      { property: "og:image:alt", content: "Travel Links Solution — UK visa services" },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/26637276-3809-4947-9ff5-b2c2ad5ac675/travel-suitcase.png" },
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


const INCLUDED: { title: string }[] = [
  { title: "Free eligibility consultation" },
  { title: "Personalised document checklist" },
  { title: "Senior-consultant case review" },
  { title: "Application form preparation" },
  { title: "Cover letter & SOP drafting" },
  { title: "Embassy appointment booking" },
  { title: "Biometrics & VFS guidance" },
  { title: "24/7 WhatsApp & email support" },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-50 px-5 lg:px-8 py-24 lg:py-32">
          {/* Animated mesh background */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
            <div className="absolute -top-1/4 -left-1/4 h-full w-full rounded-full bg-primary/15 blur-[120px] animate-mesh-1" />
            <div className="absolute top-1/2 -right-1/4 h-[80%] w-[80%] rounded-full bg-brand-aqua/10 blur-[140px] animate-mesh-2" />
            <div className="absolute -bottom-1/4 left-1/4 h-[70%] w-[70%] rounded-full bg-indigo-400/15 blur-[130px] animate-mesh-3" />
            <div className="absolute top-1/4 left-1/3 h-[50%] w-[50%] rounded-full bg-brand-cyan/20 blur-[120px] animate-mesh-2" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <Reveal>
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-10 flex justify-center">
                <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <li>
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                  </li>
                  <li aria-hidden="true" className="opacity-50">/</li>
                  <li aria-current="page" className="text-slate-900">Services</li>
                </ol>
              </nav>

              {/* Eyebrow chip */}
              <div className="mb-8 inline-flex items-center rounded-full border border-white/80 bg-white/60 px-4 py-1.5 shadow-soft ring-1 ring-slate-200/30 backdrop-blur-md">
                <span className="relative mr-2 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-cyan" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600">
                  Visa Services
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-slate-900">
                End-to-end visa solutions{" "}
                <span className="block sm:inline text-gradient-brand">tailored to you</span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl font-medium leading-relaxed text-slate-600/90">
                Six core services, hundreds of case types — all handled by experienced UK consultants from initial
                eligibility to visa stamp.
              </p>

              {/* CTAs */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openApplyDialog}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-10 py-4 text-sm font-bold text-white shadow-2xl shadow-slate-300 transition-all hover:-translate-y-1 hover:bg-slate-800 active:scale-95"
                >
                  Consult Now <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/40 px-10 py-4 text-sm font-bold text-slate-900 backdrop-blur-sm transition-all hover:border-slate-300 hover:bg-white active:scale-95"
                >
                  Free consultation
                </Link>
              </div>

              {/* Trust line */}
              <div className="mt-20 flex items-center justify-center gap-6 opacity-50">
                <span className="h-px w-16 bg-gradient-to-r from-transparent to-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                  Trusted by 500+ UK travellers
                </span>
                <span className="h-px w-16 bg-gradient-to-l from-transparent to-slate-400" />
              </div>
            </Reveal>
          </div>
        </section>


        <Services showHeading={false} />


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
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                  {INCLUDED.map(({ title }) => (
                    <li key={title} className="border-l-2 border-primary/20 pl-4">
                      <p className="text-sm font-semibold text-foreground leading-snug">{title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <Process />

        {/* FAQ */}
        <section className="relative overflow-hidden bg-gradient-soft py-20 sm:py-24 px-4 sm:px-5 lg:px-8">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
            <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-brand-cyan/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="FAQ"
              title={<>Common questions about <span className="text-gradient-brand">our visa services</span></>}
            />

            <Accordion type="single" collapsible className="mt-10 sm:mt-12 space-y-3">
              {SERVICES_FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="group rounded-2xl border border-border bg-white px-4 sm:px-5 shadow-soft transition-all hover:border-primary/30 hover:shadow-glow data-[state=open]:border-primary/40 data-[state=open]:shadow-glow"
                >
                  <AccordionTrigger className="text-left font-display text-base sm:text-[17px] font-semibold hover:no-underline py-4 sm:py-5 [&>svg]:text-primary [&>svg]:transition-transform">
                    <span className="flex items-start gap-3 sm:gap-4 min-w-0">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-brand text-[11px] font-bold text-white shadow-soft transition-transform group-hover:scale-105 group-data-[state=open]:rotate-[-4deg]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 leading-snug">{f.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-10 sm:pl-11 pb-5 leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 sm:mt-12 rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-soft flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div className="flex items-start gap-3 min-w-0">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
                  <HelpCircle className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="font-display font-semibold">Still have questions?</div>
                  <div className="text-sm text-muted-foreground">Talk to a senior consultant — free 20-minute call.</div>
                </div>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-bold text-white shadow-soft hover:shadow-glow transition hover:-translate-y-0.5 shrink-0"
              >
                <MessageCircle className="h-4 w-4" /> Ask us
              </Link>
            </div>
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
