import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Travel Links Solution" },
      { name: "description", content: "Speak with a senior UK visa consultant. Office in Northampton — call, email or send an enquiry." },
      { property: "og:title", content: "Contact — Travel Links Solution" },
      { property: "og:description", content: "Reach the Travel Links Solution team for a free 20-minute visa consultation." },
    ],
    links: [{ rel: "canonical", href: "https://travelslinkuk.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28">
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
}
