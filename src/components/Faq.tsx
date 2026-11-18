import { useState } from "react";
import { Plus, PhoneCall } from "lucide-react";

const FAQ = [
  {
    q: "Что если смета вырастет в процессе работ?",
    a: "Не вырастет. Цена фиксируется в договоре после вашего согласия со сметой. Если вы сами решите что-то изменить — пересчитаем новую позицию отдельной строкой и начнём работы по ней только после вашего письменного «ок». За 14 лет такого «вырастет само» не было ни разу.",
  },
  {
    q: "Кто физически делает ремонт — вы или субподряд?",
    a: "Только наша штатная команда: 24 мастера и 3 прораба в штате, у каждого удостоверение об обучении охране труда и допуск к высотным и электроработам. Прораб на объекте каждый рабочий день, инженер — раз в неделю с приёмкой скрытых работ.",
  },
  {
    q: "Как я контролирую то, что происходит на объекте?",
    a: "Каждый вечер в 19:00 — фотоотчёт и короткая сводка в мессенджер: что сделано, что завтра, сколько материалов и денег потрачено по графику. Раз в две недели — очный обход с актом этапа. Платите только за подписанные этапы.",
  },
  {
    q: "Что именно покрывает гарантия 5 лет?",
    a: "Всё, что мы сделали: стяжка и штукатурка, электропроводка и щиток, сантехразводка и тёплые полы, гидроизоляция, плитка, малярка, двери. При обращении инженер выезжает в течение 3 рабочих дней, устраняем бесплатно и в приоритетном порядке.",
  },
  {
    q: "Можно ли в рассрочку и без первого взноса?",
    a: "Рассрочка 0% на 12 месяцев по двум документам, первый взнос от 20% — одобряем за 1 рабочий день. Для новостроек работаем по эскроу: оплата этапами с аккредитива, вы ничего не рискуете деньгами.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="border-t border-line py-16 sm:py-24 scroll-mt-24" aria-label="Частые вопросы">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-copper-deep">07 — Вопросы</p>
          <h2 className="mt-3 font-display font-extrabold tracking-[-0.02em] text-ink text-4xl sm:text-5xl leading-[1.05]">
            Коротко — <em className="font-serif italic font-medium text-copper">о главном</em>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-muted leading-relaxed">
            Не нашли свой вопрос? Позвоните — инженер на линии отвечает по будням и субботам, без скриптов и навязчивости.
          </p>
          <a
            href="tel:+74951204060"
            className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-copper/40 bg-copper/[0.08] px-5 py-4 transition hover:border-copper"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-copper text-ink">
              <PhoneCall size={20} />
            </span>
            <span>
              <span className="block font-display font-extrabold text-ink">+7 (495) 120-40-60</span>
              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Пн–Сб 9:00–21:00 · Вс по записи</span>
            </span>
          </a>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="faq-item" data-open={isOpen}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex w-full items-center gap-4 sm:gap-6 px-5 sm:px-7 py-5 sm:py-6 text-left transition-colors hover:bg-paper"
                  >
                    <span className="font-mono text-[10px] sm:text-[11px] text-copper-deep">0{i + 1}</span>
                    <span className="flex-1 font-display font-extrabold text-[15px] sm:text-lg leading-snug text-ink">{item.q}</span>
                    <Plus size={20} className="faq-icon shrink-0 text-copper-deep" strokeWidth={2.2} aria-hidden="true" />
                  </button>
                  <div className="faq-panel" id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-button-${i}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-7 pb-6 pl-[52px] sm:pl-[68px] text-[13px] sm:text-[15px] leading-relaxed text-ink/80 max-w-3xl">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
