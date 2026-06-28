import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./Section";
import {
  Icon3DTourist,
  Icon3DBusiness,
  Icon3DFamily,
} from "./Icons3D";

const SERVICES = [
  { Icon: Icon3DTourist, title: "Tourist Visa", text: "Holiday, family visit and short-stay visa support." },
  { Icon: Icon3DBusiness, title: "Business Visa", text: "Meetings, conferences and investor visa programs." },
  { Icon: Icon3DFamily, title: "Family Visa", text: "Spouse, dependent and family reunification services." },
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
          {SERVICES.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl bg-white border border-border p-7 shadow-card hover:shadow-glow transition-all hover:-translate-y-1.5 hover:border-primary/30"
            >
              {/* hover wash */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500" />
              <div className="absolute inset-x-7 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* 3D icon stage */}
              <div className="relative h-24 w-24 -mt-1 -ml-1 transition-transform duration-500 group-hover:scale-105">
                <Icon className="h-full w-full drop-shadow-[0_10px_18px_rgba(33,87,243,0.35)]" />
              </div>

              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group/link"
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
