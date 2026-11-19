import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const PILLARS = [
  {
    title: "Смета не растёт",
    text: "Цена фиксируется в договоре после замера. Любое изменение только по вашему письменному согласию.",
  },
  {
    title: "Видно каждый день",
    text: "Фотоотчёт в мессенджер каждый вечер и видеозвонок с объекта по вашему запросу.",
  },
  {
    title: "Гарантия 5 лет",
    text: "Стяжка, электрика, сантехника, отделка. Инженер приезжает в течение 3 рабочих дней.",
  },
  {
    title: "Свои бригады",
    text: "24 мастера в штате и 3 прораба. Никакого субподряда, у каждого мастера допуски и удостоверения.",
  },
];

const STATS = [
  { value: "14", unit: "лет", label: "работаем под своим именем" },
  { value: "480", unit: "квартир", label: "сдано с 2011 года" },
  { value: "98", unit: "%", label: "объектов сданы в срок" },
  { value: "4,9", unit: "из 5", label: "1 284 оценки на Яндекс Картах" },
];

export default function Guarantees() {
  return (
    <section className="border-t border-line py-20 lg:py-28" aria-label="Гарантии и цифры">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[30rem] text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-ink sm:text-[34px]">
            Что записано в договоре
          </h2>
          <a
            href="#reviews"
            className="inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-ink transition-colors duration-150 hover:text-copper"
          >
            Читать отзывы
            <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 40}>
              <div>
                <h3 className="text-[16px] font-medium leading-6 text-ink">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-[20px] text-secondary">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-[32px] font-medium tabular-nums leading-none tracking-[-0.02em] text-ink">
                {s.value} <span className="text-[14px] font-normal text-secondary">{s.unit}</span>
              </p>
              <p className="mt-2 max-w-[12rem] text-[13px] leading-[18px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
