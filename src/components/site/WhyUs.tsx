import { ShieldCheck, Trophy, FileCheck2, Zap, Wallet, Eye, UserCheck, Headphones } from "lucide-react";
import { SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import whyUsPlane from "@/assets/why-us-plane.png.asset.json";

const ITEMS = [
  { icon: UserCheck, title: "Experienced Consultants", text: "Decade-long expertise in UK and global immigration." },
  { icon: Trophy, title: "High Success Rate", text: "98% approval rate across visa categories." },
  { icon: FileCheck2, title: "Complete Documentation", text: "We handle every form, letter and certified copy." },
  { icon: Zap, title: "Fast Processing", text: "Optimised workflows for quicker turnarounds." },
  { icon: Wallet, title: "Affordable Packages", text: "Transparent pricing with flexible plans." },
  { icon: Eye, title: "Transparent Fees", text: "No hidden charges — ever." },
  { icon: ShieldCheck, title: "Personalised Guidance", text: "A dedicated advisor for your entire journey." },
  { icon: Headphones, title: "24/7 Support", text: "Round-the-clock assistance via WhatsApp & email." },
];

export function WhyUs() {
  return (
    <section id="why" className="relative bg-gradient-soft py-24 px-5 lg:px-8 overflow-hidden">
      {/* twinkle field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[
          { t: "12%", l: "8%", d: "0s", s: 6 },
          { t: "22%", l: "92%", d: "0.6s", s: 4 },
          { t: "68%", l: "5%", d: "1.2s", s: 5 },
          { t: "82%", l: "88%", d: "1.8s", s: 7 },
          { t: "45%", l: "50%", d: "2.4s", s: 4 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-brand-cyan/60 twinkle-dot"
            style={{ top: p.t, left: p.l, width: p.s, height: p.s, animationDelay: p.d }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Us"
            title={<>The reasons clients <span className="text-gradient-brand">trust Travel Links</span></>}
            description="A UK-registered consultancy combining experience, transparency and a personal touch."
          />
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <Reveal direction="right" className="lg:col-span-5 order-first lg:order-none">
            <div className="relative flex justify-center">
              <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-brand opacity-20 blur-3xl" aria-hidden />
              <img
                src={whyUsPlane.url}
                alt="3D illustration of an airplane with passport and boarding passes"
                className="relative w-full max-w-md h-auto drop-shadow-[0_30px_60px_rgba(33,87,243,0.35)] animate-float"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {ITEMS.map(({ icon: Icon, title, text }, idx) => (
              <Reveal key={title} delay={idx * 80} direction="up">
                <div className="rounded-2xl glass p-6 shadow-soft hover:shadow-glow transition hover:-translate-y-1 h-full">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white transition-transform duration-500 hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
