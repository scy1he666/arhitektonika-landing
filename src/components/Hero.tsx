import { ArrowRight } from "lucide-react";
import hero from "../assets/hero.jpg";

const STAGES = [
  { name: "Демонтаж", days: 4 },
  { name: "Электрика", days: 9 },
  { name: "Стены и пол", days: 12 },
  { name: "Плитка", days: 8 },
  { name: "Финиш", days: 12 },
];

const FACTS = ["480 сданных квартир", "4,9 на Яндекс Картах, 1 284 оценки", "14 лет под своим именем"];

export default function Hero() {
  const total = STAGES.reduce((sum, s) => sum + s.days, 0);

  return (
    <section className="relative pt-16" aria-label="Ремонт квартир под ключ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-stretch gap-8 pb-12 lg:grid-cols-12 lg:gap-10 lg:pb-16">
          {/* text column */}
          <div className="flex flex-col justify-center pt-10 lg:col-span-5 lg:py-16">
            <h1 className="max-w-[30rem] text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[40px] sm:leading-[1.08] lg:text-[50px]">
              Ремонт квартиры под ключ по смете из договора
            </h1>

            <p className="mt-5 max-w-[27rem] text-[16px] leading-[24px] text-secondary sm:text-[17px] sm:leading-[26px]">
              Косметический, капитальный и дизайнерский ремонт в Москве. Цену и срок фиксируем в договоре после
              замера, каждый вечер присылаем фотоотчёт со стройки.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#calculator"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-copper px-5 text-[15px] font-medium text-ink transition-colors duration-150 hover:bg-copper-deep hover:text-paper"
              >
                Рассчитать смету
                <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex h-12 items-center rounded-lg border border-line px-5 text-[15px] font-medium text-ink transition-colors duration-150 hover:border-ink/25"
              >
                Смотреть проекты
              </a>
            </div>

            <ul className="trust-line mt-8 border-t border-line pt-5">
              {FACTS.map((fact) => (
                <li key={fact} className="tabular-nums">
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* visual column */}
          <div className="relative lg:col-span-7">
            <div className="relative h-[300px] overflow-hidden rounded-2xl bg-sunk sm:h-[440px] lg:absolute lg:inset-0 lg:h-auto">
              <img
                src={hero}
                alt="Гостиная пентхауса в ЖК «Меркурий»: светлый диван, панорамные окна, авторская отделка стен"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/70 to-transparent"
              />
            </div>

            {/* signature: the contract schedule, days per stage */}
            <div className="mt-4 rounded-xl border border-line bg-surface p-4 sm:absolute sm:-bottom-8 sm:left-6 sm:mt-0 sm:w-[324px]">
              <p className="text-[12px] leading-[16px] text-secondary">ЖК «Меркурий», 184 м², сдан за 14 недель</p>
              <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-line pt-3">
                <p className="text-[12px] text-secondary">График по договору</p>
                <p className="text-[12px] font-medium tabular-nums text-ink">{total} дней</p>
              </div>
              <div className="mt-3 flex gap-[3px]" aria-hidden="true">
                {STAGES.map((s, i) => (
                  <span
                    key={s.name}
                    className={`h-2 rounded-full ${i < 3 ? "bg-copper" : "bg-sunk"}`}
                    style={{ flexGrow: s.days }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[11px] tabular-nums text-muted">
                <span>Демонтаж</span>
                <span>Электрика</span>
                <span>Стены</span>
                <span>Плитка</span>
                <span>Финиш</span>
              </div>
              <p className="mt-2 text-[11px] text-muted">Сейчас день 26 из {total}, отставания нет</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
