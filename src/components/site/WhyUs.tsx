import { ShieldCheck, Trophy, FileCheck2, Zap, Wallet, Eye, UserCheck, Headphones } from "lucide-react";
import { SectionHeading } from "./Section";
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
    <section id="why" className="bg-gradient-soft py-24 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={<>The reasons clients <span className="text-gradient-brand">trust Travel Links</span></>}
          description="A UK-registered consultancy combining experience, transparency and a personal touch."
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 relative flex justify-center order-first lg:order-none">
            <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-brand opacity-20 blur-3xl" aria-hidden />
            <img
              src={whyUsPlane.url}
              alt="3D illustration of an airplane with passport and boarding passes"
              className="relative w-full max-w-md h-auto drop-shadow-[0_30px_60px_rgba(33,87,243,0.35)] animate-float"
              loading="lazy"
            />
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {ITEMS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl glass p-6 shadow-soft hover:shadow-glow transition hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
