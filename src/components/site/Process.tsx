import { MessageSquare, ClipboardList, FileText, Send, Loader2, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./Section";

const STEPS = [
  { icon: MessageSquare, title: "Free Consultation", text: "Tell us your goal and we'll outline your options." },
  { icon: ClipboardList, title: "Profile Evaluation", text: "We assess your eligibility and best pathway." },
  { icon: FileText, title: "Document Preparation", text: "Forms, letters and certified copies — all handled." },
  { icon: Send, title: "Application Submission", text: "Filed correctly the first time." },
  { icon: Loader2, title: "Visa Processing", text: "We track your case and respond to queries." },
  { icon: CheckCircle2, title: "Visa Approval", text: "Receive your visa and travel with confidence." },
];

export function Process() {
  return (
    <section id="process" className="py-24 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Process"
          title={<>Six simple steps to your <span className="text-gradient-brand">approved visa</span></>}
        />

        <div className="mt-16 relative">
          <div className="absolute left-0 right-0 top-10 hidden lg:block h-0.5 bg-gradient-to-r from-brand-deep via-brand-cyan to-brand-aqua opacity-30" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="relative text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-white border border-border shadow-card relative z-10">
                  <s.icon className="h-7 w-7 text-primary" />
                  <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-brand text-white text-xs font-bold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
