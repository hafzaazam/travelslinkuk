import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { Contact } from "@/components/site/Contact";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/Section";
import { FAQ } from "@/components/site/FAQ";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Calendar,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — UK Visa Consultancy, Northampton | Travel Links" },
      { name: "description", content: "Contact Travel Links Solution for a free visa consultation. Call +44 787 946 5341, WhatsApp, email contact@travellinks.uk or visit our Northampton office." },
      { name: "keywords", content: "contact visa consultant UK, Northampton visa office, free visa consultation, visa enquiry, Travel Links Solution contact" },
      { property: "og:title", content: "Contact Us — Travel Links Solution" },
      { property: "og:description", content: "Reach the Travel Links Solution team for a free 20-minute visa consultation — call, WhatsApp, email or visit our Northampton office." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://travellinks.uk/contact" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/f19e1753-ef99-4e5a-a468-7ce55336b2f3/about-visa.png" },
      { property: "og:image:alt", content: "Contact Travel Links Solution — Northampton visa consultants" },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/f19e1753-ef99-4e5a-a468-7ce55336b2f3/about-visa.png" },
      { property: "og:site_name", content: "Travel Links Solution" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Us — Travel Links Solution" },
      { name: "twitter:description", content: "Free 20-minute visa consultation with a senior UK consultant. Reply within 24 hours." },
    ],
    links: [{ rel: "canonical", href: "https://travellinks.uk/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Travel Links Solution",
          url: "https://travellinks.uk/contact",
          mainEntity: {
            "@type": "Organization",
            name: "Travel Links Solution",
            url: "https://travellinks.uk",
            telephone: "+44 787 946 5341",
            email: "contact@travellinks.uk",
            address: {
              "@type": "PostalAddress",
              streetAddress: "138 Milton Street",
              addressLocality: "Northampton",
              postalCode: "NN2 7DE",
              addressCountry: "GB",
            },
            contactPoint: [{
              "@type": "ContactPoint",
              telephone: "+44 787 946 5341",
              contactType: "customer service",
              areaServed: "Worldwide",
              availableLanguage: ["English"],
            }],
            openingHoursSpecification: [
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "19:00" },
              { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "17:00" },
            ],
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

const QUICK = [
  {
    icon: Phone,
    label: "Call us",
    value: "+44 787 946 5341",
    sub: "Mon–Sat, 9am–7pm GMT",
    href: "tel:+447879465341",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat instantly",
    sub: "Replies within minutes",
    href: "https://wa.me/447879465341",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@travellinks.uk",
    sub: "We reply within 24 hours",
    href: "mailto:contact@travellinks.uk",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "Northampton office",
    sub: "138 Milton Street, NN2 7DE",
    href: "https://www.google.com/maps?q=138%20Milton%20Street%2C%20Northampton%2C%20NN2%207DE",
    external: true,
  },
];

const PROMISES = [
  { icon: Clock, title: "24-hour response", text: "Every enquiry receives a human reply within one business day." },
  { icon: Calendar, title: "Free consultation", text: "Book a 20-minute call with a senior consultant — no obligation." },
  { icon: ShieldCheck, title: "Confidential & secure", text: "Your documents and details are handled with strict confidentiality." },
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28">
        {/* Hero */}
        <section className="relative py-20 px-5 lg:px-8 overflow-hidden bg-gradient-soft">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
            <div className="absolute -top-24 -right-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-brand-cyan/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl text-center">
            <Reveal>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Contact Us
              </span>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Let's plan your <span className="text-gradient-brand">next journey</span>
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                Whether it's a tourist trip, a business visit or a long-term move — talk to a senior consultant and
                get a clear, honest plan within 24 hours.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Quick contact cards */}
        <section className="py-16 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUICK.map(({ icon: Icon, label, value, sub, href, external }, i) => (
              <Reveal key={label} delay={i * 80} direction="up">
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group block h-full rounded-3xl border border-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-white shadow-soft transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
                  <div className="mt-1 font-display text-lg font-semibold group-hover:text-primary transition-colors">{value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{sub}</div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Promises */}
        <section className="py-12 px-5 lg:px-8">
          <div className="mx-auto max-w-7xl grid sm:grid-cols-3 gap-5">
            {PROMISES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 100} direction="up">
                <div className="rounded-3xl border border-border bg-white p-6 shadow-soft h-full">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold">{title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Existing form + map */}
        <Contact />

        {/* Office hours */}
        <section className="py-20 px-5 lg:px-8 bg-gradient-soft">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading
                eyebrow="Office Hours"
                title={<>When you can <span className="text-gradient-brand">reach us</span></>}
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-10 rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-card">
                <ul className="divide-y divide-border">
                  {[
                    { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
                    { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
                    { day: "Sunday", hours: "WhatsApp only" },
                  ].map((row) => (
                    <li key={row.day} className="flex items-center justify-between py-3.5">
                      <span className="font-semibold">{row.day}</span>
                      <span className="text-muted-foreground">{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
}
