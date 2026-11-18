import { FileText, Camera, ShieldCheck, HardHat, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const PILLARS = [
  {
    icon: FileText,
    title: "Смета не растёт",
    text: "Цена фиксируется в договоре после замера. Любое изменение — только по вашему письменному согласованию.",
  },
  {
    icon: Camera,
    title: "Вы видите каждый день",
    text: "Фото- и видеоотчёт в мессенджер каждый вечер, плюс видеозвонок с объекта по вашему запросу.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия 5 лет",
    text: "Официально, по договору: стяжка, электрика, сантехника, отделка. Инженер приезжает в течение 3 рабочих дней.",
  },
  {
    icon: HardHat,
    title: "Свои бригады",
    text: "24 штатных мастера и 3 прораба. Никакого случайного субподряда — у каждого мастера удостоверение и допуски.",
  },
];

const STATS = [
  { value: "14", suffix: "лет", label: "работаем под своим именем" },
  { value: "480+", suffix: "", label: "сданных квартир и домов" },
  { value: "98%", suffix: "", label: "объектов сданы в срок" },
  { value: "1 284", suffix: "", label: "оценки со средним 4.9 из 5" },
];

export default function Guarantees() {
  return (
    <section className="py-16 sm:py-24" aria-label="Гарантии и цифры">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-copper-deep">05 — Гарантии</p>
            <h2 className="mt-3 font-display font-extrabold tracking-[-0.02em] text-ink text-4xl sm:text-5xl leading-[1.05]">
              Почему нас рекомендуют{" "}
              <em className="font-serif italic font-medium text-copper">друзьям</em>
            </h2>
          </div>
          <a href="#reviews" className="group inline-flex items-center gap-2 font-display font-bold text-ink transition hover:text-copper shrink-0">
            Читать отзывы
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <div className="group h-full rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-copper/50 hover:shadow-[0_24px_50px_-28px_rgba(194,109,61,0.5)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-copper/12 text-copper-deep transition-colors duration-300 group-hover:bg-copper group-hover:text-ink">
                  <p.icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-display font-extrabold text-lg text-ink">{p.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* stats strip */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 divide-x-0 lg:divide-x divide-line overflow-hidden rounded-2xl border border-line bg-ink text-paper">
          {STATS.map((s) => (
            <div key={s.label} className="px-5 sm:px-7 py-6 sm:py-8 border-line border-b lg:border-b-0 [&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0">
              <p className="font-display font-extrabold tracking-tight text-4xl sm:text-5xl text-paper">
                {s.value}
                {s.suffix && <span className="ml-1 text-base align-top text-copper-light">{s.suffix}</span>}
              </p>
              <p className="mt-2 text-[10.5px] sm:text-[11px] leading-snug text-paper/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
