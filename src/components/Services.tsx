import { useState } from "react";
import { Check, ArrowRight, Clock, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

export type ServiceId = "cosmetic" | "capital" | "designer";

const SERVICES: Record<
  ServiceId,
  {
    id: ServiceId;
    tab: string;
    badge?: string;
    title: string;
    tagline: string;
    price: string;
    priceNote: string;
    duration: string;
    works: string[];
  }
> = {
  cosmetic: {
    id: "cosmetic",
    tab: "Косметический",
    title: "Косметический ремонт",
    tagline: "Освежим квартиру без пыли, грязи и переезда",
    price: "от 6 500 ₽/м²",
    priceNote: "под ключ: работы + вывоз мусора + уборка",
    duration: "3–5 недель",
    works: [
      "Стены: покраска, обои, декоративная штукатурка",
      "Потолки: натяжные и ГКЛ в один уровень",
      "Пол: ламинат, кварц-винил, линолеум на подложке",
      "Плитка в санузлах и на фартуке кухни",
      "Точечная замена розеток, выключателей, смесителей",
      "Замена светильников и карнизов",
    ],
  },
  capital: {
    id: "capital",
    tab: "Капитальный",
    badge: "Выбирают чаще всего",
    title: "Капитальный ремонт",
    tagline: "Полная замена всего, что нельзя оставить как есть",
    price: "от 14 500 ₽/м²",
    priceNote: "с черновыми материалами по оптовым ценам",
    duration: "6–10 недель",
    works: [
      "Электрика: полная замена проводки и щитка",
      "Сантехника: новая разводка, стояки, тёплый пол",
      "Демонтаж стяжки и выравнивание оснований",
      "Шумо- и теплоизоляция стен, пола, потолка",
      "Перепланировка и согласование в Мосжилинспекции",
      "Всё из «косметического» — в полном объёме",
    ],
  },
  designer: {
    id: "designer",
    tab: "Дизайнерский",
    badge: "С авторским надзором",
    title: "Дизайнерский ремонт",
    tagline: "От эскиза до финального декора — одна команда",
    price: "от 24 000 ₽/м²",
    priceNote: "с дизайн-проектом, комплектацией и надзором",
    duration: "8–14 недель",
    works: [
      "Индивидуальный дизайн-проект и 3D-визуализация",
      "Авторский надзор на каждом этапе — каждый выезд с фотоотчётом",
      "Мебель, свет и сантехника на заказ по эскизам",
      "Сложные узлы: парящие потолки, скрытые карнизы, ниши",
      "Комплектация «под ключ»: от плинтуса до штор",
      "Гарантия 5 лет и сервисный чек-ап через 12 месяцев",
    ],
  },
};

export default function Services({ onCalc }: { onCalc: (service: ServiceId) => void }) {
  const [active, setActive] = useState<ServiceId>("capital");
  const current = SERVICES[active];

  return (
    <section id="services" className="relative py-16 sm:py-24 scroll-mt-24" aria-label="Услуги">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* heading row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-copper-deep">01 — Услуги</p>
            <h2 className="mt-3 font-display font-extrabold tracking-[-0.02em] text-ink text-4xl sm:text-5xl leading-[1.05]">
              Три формата ремонта —{" "}
              <em className="font-serif italic font-medium text-copper">одна ответственность</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted leading-relaxed">
            Цены фиксируются в договоре и не меняются в процессе. Любое отклонение — только по вашему
            письменному согласованию.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-6">
          {/* tab list */}
          <div className="lg:col-span-4 flex flex-col gap-3" role="tablist" aria-label="Типы ремонта">
            {(Object.keys(SERVICES) as ServiceId[]).map((id) => {
              const s = SERVICES[id];
              const selected = id === active;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="services-panel"
                  id={`tab-${id}`}
                  onClick={() => setActive(id)}
                  className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                    selected
                      ? "border-copper bg-white shadow-[0_20px_45px_-25px_rgba(194,109,61,0.55)]"
                      : "border-line bg-transparent hover:border-copper/50 hover:bg-white/60"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-full w-1.5 transition-colors duration-300 ${selected ? "bg-copper" : "bg-transparent"}`}
                  />
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-display font-extrabold text-lg text-ink">{s.tab}</span>
                    {s.badge && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-copper/12 px-2.5 py-1 font-mono text-[8.5px] font-semibold uppercase tracking-[0.14em] text-copper-deep">
                        <Sparkles size={10} />
                        {s.badge}
                      </span>
                    )}
                  </span>
                  <span className="mt-2 flex items-end justify-between gap-3">
                    <span className="font-mono text-xs text-muted">{s.price}</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
                      <Clock size={11} /> {s.duration}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* detail panel */}
          <Reveal key={active} className="lg:col-span-8">
            <div
              id="services-panel"
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              className="h-full rounded-3xl border border-line bg-white p-6 sm:p-8 lg:p-10 flex flex-col"
            >
              <div className="flex flex-wrap items-start justify-between gap-6 border-b border-line pb-6">
                <div className="max-w-md">
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-ink">{current.title}</h3>
                  <p className="mt-2 text-sm sm:text-[15px] text-muted leading-relaxed">{current.tagline}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-extrabold text-3xl sm:text-4xl text-copper-deep tracking-tight whitespace-nowrap">{current.price}</p>
                  <p className="mt-1 max-w-[210px] text-[10px] sm:text-[11px] text-muted leading-snug">{current.priceNote}</p>
                </div>
              </div>

              <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                {current.works.map((work) => (
                  <li key={work} className="flex items-start gap-2.5 text-[13px] sm:text-sm leading-snug text-ink/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-copper/15">
                      <Check size={12} strokeWidth={3} className="text-copper-deep" />
                    </span>
                    {work}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Договор · акт · гарантия 5 лет
                </p>
                <button
                  type="button"
                  onClick={() => onCalc(active)}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-display text-sm font-bold text-paper transition hover:bg-copper hover:text-ink"
                >
                  Рассчитать «{current.tab.toLowerCase()}» ремонт
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
