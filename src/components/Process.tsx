import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  { num: "1", title: "Заявка и замер", text: "Инженер выезжает в удобный день. Замер и консультация бесплатные." },
  { num: "2", title: "Смета и договор", text: "Смета на 40 с лишним позиций за 2 дня. Цена и срок фиксируются в договоре." },
  { num: "3", title: "Инженерия и демонтаж", text: "Электрика, разводка сантехники, слаботочка, снос перегородок и вывоз мусора." },
  { num: "4", title: "Черновые работы", text: "Стяжка, штукатурка по маякам, шумоизоляция, ГКЛ. Промежуточный акт на каждый узел." },
  { num: "5", title: "Чистовая отделка", text: "Плитка, стены, потолок, пол, двери, сантехника. Уборка каждый вечер." },
  { num: "6", title: "Приёмка и гарантия", text: "Акт сдачи и 5 лет гарантии. Через 12 месяцев бесплатный сервисный чек-ап." },
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-line bg-sunk py-20 lg:py-28" aria-label="Этапы работы">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[30rem] text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-ink sm:text-[34px]">
            Шесть этапов, оплата после акта
          </h2>
          <p className="max-w-[27rem] text-[16px] leading-[24px] text-secondary">
            Платите за этап только после подписания акта, не вперёд.
          </p>
        </div>

        <ol className="mt-10 grid gap-x-10 border-t border-line lg:mt-14 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.num} delay={i * 40}>
              <div className="grid grid-cols-[32px_1fr] gap-x-4 gap-y-1 border-b border-line py-6">
                <span className="text-[13px] tabular-nums leading-6 text-muted" aria-hidden="true">
                  {step.num}
                </span>
                <h3 className="text-[16px] font-medium leading-6 text-ink">{step.title}</h3>
                <p className="col-start-2 max-w-[22rem] text-[14px] leading-[20px] text-secondary">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 flex flex-col gap-5 rounded-2xl bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[36rem] text-[15px] leading-[22px] text-ink">
            Каждый вечер в 19:00 присылаем фотоотчёт: что сделано, что завтра, сколько ушло материалов и денег по этапу.
          </p>
          <a
            href="#lead"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-[14px] font-medium text-paper transition-colors duration-150 hover:bg-ink-2"
          >
            Записаться на замер
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
