import { createFileRoute } from "@tanstack/react-router";
import aboutVisa from "@/assets/about-visa.png.asset.json";
import heroAirport from "@/assets/hero-airport.jpg";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Countries } from "@/components/site/Countries";
import { Services } from "@/components/site/Services";
import { WhyUs } from "@/components/site/WhyUs";
import { Process } from "@/components/site/Process";
import { Destinations } from "@/components/site/Destinations";
import { Testimonials } from "@/components/site/Testimonials";
import { ReviewForm } from "@/components/site/ReviewForm";
import { FAQ, FAQS } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { CTABanner } from "@/components/site/CTABanner";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { Reveal } from "@/components/site/Reveal";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UK Visa Consultancy in Northampton | Travel Links Solution" },
      { name: "description", content: "Trusted UK visa consultancy in Northampton. Tourist, family, business & student visa help for 25+ countries — fast, transparent, embassy-ready." },
      { property: "og:title", content: "UK Visa Consultancy in Northampton | Travel Links Solution" },
      { property: "og:description", content: "Trusted UK visa consultancy. Tourist, family, business & student visa help for 25+ countries — fast, transparent, embassy-ready." },
      { property: "og:url", content: "https://travellinks.uk/" },
    ],
    links: [
      { rel: "canonical", href: "https://travellinks.uk/" },
      { rel: "preload", as: "image", href: heroAirport, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <section id="about" className="py-24 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal direction="right" className="lg:col-span-7 text-center lg:text-left">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                About Us
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                A UK consultancy built on <span className="text-gradient-brand">trust, expertise and results</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Travel Links Solution is a UK-registered visa consultancy with over a decade of experience guiding
                tourists, families and business travellers through complex visa pathways. Our team of senior
                consultants combines deep regulatory knowledge with a genuinely personal approach — so your
                application is in expert hands from day one.
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
        <Services />
        <Countries />
        <WhyUs />
        <Process />
        <Destinations />
        <Testimonials />
        <ReviewForm />
        <FAQ />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
}
