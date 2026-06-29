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

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Travel Links Solution" },
      { name: "description", content: "Learn about Travel Links Solution, a UK-registered visa consultancy with senior consultants helping travellers reach 25+ countries." },
      { property: "og:title", content: "About Us — Travel Links Solution" },
      { property: "og:description", content: "UK-registered visa consultancy with decade-long experience guiding tourists, families and business travellers." },
    ],
    links: [{ rel: "canonical", href: "https://travelslinkuk.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28">
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
                loading="lazy"
              />
            </Reveal>
          </div>
        </section>
        <Stats />
        <WhyUs />
        <CTABanner />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
}
