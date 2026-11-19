import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "./Reveal";

export type ServiceId = "cosmetic" | "capital" | "designer";

const SERVICES: Record<
  ServiceId,
  {
    tab: string;
    title: string;
    price: string;
    priceNote: string;
    duration: string;
    works: string[];
  }
> = {
  cosmetic: {
    tab: "Косметический",
    title: "Косметический ремонт",
    price: "от 6 500 ₽/м²",
    priceNote: "работы, вывоз мусора и уборка",
    duration: "3–5 недель",
    works: [
      "Стены: покраска, обои, декоративная штукатурка",
      "Потолки: натяжные и ГКЛ в один уровень",
      "Пол: ламинат, кварц-винил, линолеум на подложке",
      "Плитка в санузлах и на фартуке кухни",
      "Замена розеток, выключателей и смесителей",
      "Замена светильников и карнизов",
    ],
  },
  capital: {
    tab: "Капитальный",
    title: "Капитальный ремонт",
    price: "от 14 500 ₽/м²",
    priceNote: "с черновыми материалами по оптовым ценам",
    duration: "6–10 недель",
    works: [
      "Электрика: полная замена проводки и щитка",
      "Сантехника: новая разводка, стояки, тёплый пол",
      "Демонтаж стяжки и выравнивание оснований",
      "Шумо- и теплоизоляция стен, пола, потолка",
      "Перепланировка и согласование в Мосжилинспекции",
      "Все работы из косметического ремонта",
    ],
  },
  designer: {
    tab: "Дизайнерский",
    title: "Дизайнерский ремонт",
    price: "от 24 000 ₽/м²",
    priceNote: "с дизайн-проектом, комплектацией и авторским надзором",
    duration: "8–14 недель",
    works: [
      "Дизайн-проект и 3D-визуализация",
      "Авторский надзор на каждом этапе, выезд с фотоотчётом",
      "Мебель, свет и сантехника на заказ по эскизам",
      "Сложные узлы: парящие потолки, скрытые карнизы, ниши",
      "Комплектация под ключ: от плинтуса до штор",
      "Гарантия 5 лет и сервисный чек-ап через 12 месяцев",
    ],
  },
};

export default function Services({ onCalc }: { onCalc: (service: ServiceId) => void }) {
  const [active, setActive] = useState<ServiceId>("capital");
  const current = SERVICES[active];

  return (
    <section id="services" className="scroll-mt-24 border-t border-line py-20 lg:py-28" aria-label="Услуги">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="max-w-[34rem] text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-ink sm:text-[34px]">
          Три формата ремонта, цена в договоре
        </h2>
        <p className="mt-3 max-w-[34rem] text-[16px] leading-[24px] text-secondary">
          Отклонение от сметы возможно только с вашего письменного согласия, отдельной строкой.
        </p>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          {/* tab list */}
          <div
            className="flex h-fit flex-col gap-1 lg:col-span-4"
            role="tablist"
            aria-label="Типы ремонта"
          >
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
                  className={`flex items-center justify-between gap-4 rounded-lg border px-4 py-3.5 text-left transition-colors duration-150 ${
                    selected ? "border-ink bg-surface" : "border-transparent hover:bg-surface"
                  }`}
                >
                  <span className="text-[15px] font-medium text-ink">{s.tab}</span>
                  <span className="text-[13px] tabular-nums text-secondary">{s.price}</span>
                </button>
              );
            })}
            <p className="mt-3 px-4 text-[13px] leading-[20px] text-muted">
              Любой формат можно взять в рассрочку 0% на 12 месяцев.
            </p>
          </div>

          {/* detail panel */}
          <Reveal key={active} className="lg:col-span-8">
            <div
              id="services-panel"
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
                <div>
                  <h3 className="text-[22px] font-medium leading-tight text-ink">{current.title}</h3>
                  <p className="mt-1 text-[14px] tabular-nums text-secondary">{current.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-[22px] font-medium tabular-nums text-ink">{current.price}</p>
                  <p className="mt-1 max-w-[220px] text-[13px] leading-[18px] text-muted">{current.priceNote}</p>
                </div>
              </div>

              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {current.works.map((work) => (
                  <li key={work} className="flex items-start gap-2.5 text-[14px] leading-[20px] text-ink/90">
                    <Check size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-copper" aria-hidden="true" />
                    {work}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-muted">Договор, акт по каждому этапу, гарантия 5 лет</p>
                <button
                  type="button"
                  onClick={() => onCalc(active)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-[14px] font-medium text-paper transition-colors duration-150 hover:bg-ink-2"
                >
                  Рассчитать в смете
                  <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
