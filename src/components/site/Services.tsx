import { GraduationCap, Briefcase, Plane, Building2, Users, BadgeCheck, ArrowRight } from "lucide-react";
import { SectionHeading } from "./Section";

const SERVICES = [
  { icon: GraduationCap, title: "Student Visa", text: "University admissions, SOPs, interview prep and visa guidance." },
  { icon: Briefcase, title: "Work Visa", text: "Employment, sponsorship and skilled migration pathways." },
  { icon: Plane, title: "Tourist Visa", text: "Holiday, family visit and short-stay visa support." },
  { icon: Building2, title: "Business Visa", text: "Meetings, conferences and investor visa programs." },
  { icon: Users, title: "Family Visa", text: "Spouse, dependent and family reunification services." },
  { icon: BadgeCheck, title: "Permanent Residency", text: "PR consultation and long-term immigration planning." },
];

export function Services() {
  return (
    <section id="services" className="py-24 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Visa Services"
          title={<>End-to-end visa solutions <span className="text-gradient-brand">tailored to you</span></>}
          description="Six core services, hundreds of case types — handled by experienced UK consultants."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group relative overflow-hidden rounded-3xl bg-white border border-border p-7 shadow-card hover:shadow-glow transition hover:-translate-y-1">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-15 blur-2xl transition" />
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-soft">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
              <a href="#contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Learn more <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
