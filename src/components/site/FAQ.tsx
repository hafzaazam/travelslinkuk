import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "./Section";
import { MessageCircle, HelpCircle } from "lucide-react";

const FAQS = [
  { q: "How long does visa processing take?", a: "Processing times vary by country and visa type — typically 2 to 12 weeks. We provide a realistic timeline during your free consultation." },
  { q: "Which documents are required?", a: "Common requirements include passport, photos, financials, sponsorship/admission letters and biometrics. We send a tailored checklist per case." },
  { q: "Can you assist with rejected applications?", a: "Yes. We review refusal grounds, prepare a strong reapplication or appeal and improve weak documentation." },
  { q: "Do you offer a free consultation?", a: "Absolutely. Book a free 20-minute call to discuss your goals and eligibility with a senior consultant." },
  { q: "What countries do you cover?", a: "25+ destinations including UK, USA, Canada, Australia, New Zealand, all Schengen countries, and key Asia-Pacific destinations." },
];

export function FAQ() {
  return (
    <section id="faq" className="relative bg-gradient-soft py-20 sm:py-24 px-4 sm:px-5 lg:px-8 overflow-hidden">
      {/* ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-brand-cyan/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Answers to <span className="text-gradient-brand">common questions</span></>}
        />

        <Accordion type="single" collapsible className="mt-10 sm:mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
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

        {/* Closing CTA */}
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
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-bold text-white shadow-soft hover:shadow-glow transition hover:-translate-y-0.5 shrink-0"
          >
            <MessageCircle className="h-4 w-4" /> Ask us
          </a>
        </div>
      </div>
    </section>
  );
}
