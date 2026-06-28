import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "./Section";

const FAQS = [
  { q: "How long does visa processing take?", a: "Processing times vary by country and visa type — typically 2 to 12 weeks. We provide a realistic timeline during your free consultation." },
  { q: "Which documents are required?", a: "Common requirements include passport, photos, financials, sponsorship/admission letters and biometrics. We send a tailored checklist per case." },
  { q: "Can you assist with rejected applications?", a: "Yes. We review refusal grounds, prepare a strong reapplication or appeal and improve weak documentation." },
  { q: "Do you offer a free consultation?", a: "Absolutely. Book a free 20-minute call to discuss your goals and eligibility with a senior consultant." },
  { q: "What countries do you cover?", a: "25+ destinations including UK, USA, Canada, Australia, New Zealand, all Schengen countries, and key Asia-Pacific destinations." },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-gradient-soft py-24 px-5 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Answers to <span className="text-gradient-brand">common questions</span></>}
        />
        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-white px-5 shadow-soft">
              <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
