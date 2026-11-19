import { useState } from "react";
import { Plus, PhoneCall } from "lucide-react";

const FAQ = [
  {
    q: "Что если смета вырастет в процессе работ?",
    a: "Не вырастет. Цена фиксируется в договоре после вашего согласия со сметой. Если вы сами решите что-то изменить, пересчитаем новую позицию отдельной строкой и начнём работы по ней только после вашего письменного «ок». За 14 лет такого «вырастет само» не было ни разу.",
  },
  {
    q: "Кто физически делает ремонт: вы или субподряд?",
    a: "Только наша штатная команда: 24 мастера и 3 прораба в штате, у каждого удостоверение по охране труда и допуск к высотным и электроработам. Прораб на объекте каждый рабочий день, инженер раз в неделю принимает скрытые работы.",
  },
  {
    q: "Как я контролирую то, что происходит на объекте?",
    a: "Каждый вечер в 19:00 приходит фотоотчёт и короткая сводка в мессенджер: что сделано, что завтра, сколько материалов и денег потрачено по графику. Раз в две недели очный обход с актом этапа. Платите только за подписанные этапы.",
  },
  {
    q: "Что именно покрывает гарантия 5 лет?",
    a: "Всё, что мы сделали: стяжка и штукатурка, электропроводка и щиток, сантехразводка и тёплые полы, гидроизоляция, плитка, малярные работы, двери. При обращении инженер выезжает в течение 3 рабочих дней, устраняем бесплатно.",
  },
  {
    q: "Можно ли в рассрочку и без первого взноса?",
    a: "Рассрочка 0% на 12 месяцев по двум документам, первый взнос от 20%, одобряем за 1 рабочий день. Для новостроек работаем по эскроу: оплата этапами с аккредитива.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-line bg-sunk py-20 lg:py-28" aria-label="Частые вопросы">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 className="text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-ink sm:text-[34px]">
            Частые вопросы
          </h2>
          <p className="mt-3 max-w-[22rem] text-[15px] leading-[22px] text-secondary">
            Если вашего вопроса нет, позвоните: инженер отвечает по будням и субботам.
          </p>
          <a
            href="tel:+74951204060"
            className="mt-6 inline-flex items-center gap-3 rounded-lg border border-line px-4 py-3 transition-colors duration-150 hover:border-ink/25"
          >
            <PhoneCall size={18} strokeWidth={1.5} className="text-copper" aria-hidden="true" />
            <span>
              <span className="block text-[15px] font-medium tabular-nums text-ink">+7 (495) 120-40-60</span>
              <span className="mt-0.5 block text-[12px] text-muted">Пн–Сб, 9:00–21:00</span>
            </span>
          </a>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="faq-item border-b border-line" data-open={isOpen}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span className="flex-1 text-[15px] leading-[22px] font-medium text-ink sm:text-[16px]">{item.q}</span>
                    <Plus size={18} strokeWidth={1.5} className="faq-icon shrink-0 text-secondary" aria-hidden="true" />
                  </button>
                  <div className="faq-panel" id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-button-${i}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-3xl pb-5 pr-8 text-[14px] leading-[22px] text-secondary">{item.a}</p>
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
