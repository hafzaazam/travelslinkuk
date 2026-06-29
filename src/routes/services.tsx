import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { CTABanner } from "@/components/site/CTABanner";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Visa Services — Travel Links Solution" },
      { name: "description", content: "End-to-end tourist, business and family visa services delivered by senior UK consultants." },
      { property: "og:title", content: "Visa Services — Travel Links Solution" },
      { property: "og:description", content: "Tourist, business and family visa support handled end-to-end by UK consultants." },
    ],
    links: [{ rel: "canonical", href: "https://travelslinkuk.lovable.app/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28">
        <Services />
        <Process />
        <CTABanner />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
}
