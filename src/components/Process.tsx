import { Ruler, ScrollText, Zap, Layers, PaintRoller, KeyRound, Camera, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  { icon: Ruler, num: "01", title: "Заявка и замер", text: "Оставляете заявку — инженер выезжает в удобный день. Замер и консультация бесплатно, в день обращения." },
  { icon: ScrollText, num: "02", title: "Смета и договор", text: "Смета на 40+ позиций в течение 2 дней. Цена и сроки фиксируются в договоре — никаких «плюс ещё за штробы»." },
  { icon: Zap, num: "03", title: "Инженерка и демонтаж", text: "Новая электрика, сантехразводка, слаботочка. Снос перегородок и вывоз мусора в контейнерах." },
  { icon: Layers, num: "04", title: "Черновые работы", text: "Стяжка, штукатурка по маякам, шумоизоляция, ГКЛ-конструкции. Промежуточные акты на каждый узел." },
  { icon: PaintRoller, num: "05", title: "Чистовая отделка", text: "Плитка, стены, потолок, пол, двери и сантехника. Уборка каждый вечер — вы всегда видите чистый объект." },
  { icon: KeyRound, num: "06", title: "Приёмка и гарантия", text: "Акт сдачи, ключи и 5 лет гарантии. Через 12 месяцев — бесплатный сервисный чек-ап квартиры." },
];

export default function Process() {
  return (
    <section id="process" className="relative border-t border-line bg-[#f3f1ec] py-16 sm:py-24 scroll-mt-24" aria-label="Этапы работы">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-copper-deep">04 — Как мы работаем</p>
        <div className="mt-3 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="max-w-2xl font-display font-extrabold tracking-[-0.02em] text-ink text-4xl sm:text-5xl leading-[1.05]">
            Шесть шагов — <em className="font-serif italic font-medium text-copper">ни одного сюрприза</em>
          </h2>
          <p className="max-w-xs text-sm text-muted leading-relaxed">
            Каждый этап закрывается актом. Платите за работу только после подписания акта по этапу — не вперёд.
          </p>
        </div>

        <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.num} delay={i * 70}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-6 transition-colors duration-300 hover:border-copper/50">
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-4 font-display font-extrabold text-[84px] leading-none text-ink/[0.05] transition-colors duration-300 group-hover:text-copper/15"
                >
                  {step.num}
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-copper/30 bg-copper/10 text-copper-deep transition-transform duration-300 group-hover:-translate-y-0.5">
                  <step.icon size={20} />
                </span>
                <h3 className="relative mt-4 font-display font-extrabold text-lg text-ink">{step.title}</h3>
                <p className="relative mt-1.5 text-[13px] leading-relaxed text-muted">{step.text}</p>
                <span aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] w-0 bg-copper transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </ol>

        {/* photo-report callout */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-2xl border border-copper/30 bg-copper/[0.08] p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-copper text-ink">
              <Camera size={22} />
            </span>
            <div>
              <p className="font-display font-extrabold text-ink">Каждый вечер в 19:00 — фотоотчёт в ваш чат</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink/75">
                Что сделано сегодня, что будет завтра, сколько ушло материалов и денег по этапу. Вы контролируете ремонт
                с телефона, даже находясь в другом городе.
              </p>
            </div>
          </div>
          <a
            href="#lead"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-display text-sm font-bold text-paper transition hover:bg-copper hover:text-ink"
          >
            Хочу так
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
