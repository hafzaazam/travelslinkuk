import { createFileRoute } from "@tanstack/react-router";
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
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { CTABanner } from "@/components/site/CTABanner";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Travel Links Solution — UK Visa Consultancy" },
      { name: "description", content: "UK-based visa consultancy helping tourists, families and business travellers obtain visas to 25+ countries with confidence." },
      { property: "og:title", content: "Travel Links Solution — UK Visa Consultancy" },
      { property: "og:description", content: "Premium visa guidance for tourism, family and business travel." },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
          <div className="mx-auto max-w-5xl text-center">
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
      <Toaster />
    </div>
  );
}
