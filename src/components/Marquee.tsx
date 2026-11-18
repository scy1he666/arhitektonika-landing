const ITEMS = [
  "Фиксированная смета в договоре",
  "Фотоотчёт каждый вечер",
  "Гарантия 5 лет",
  "Собственные бригады · без субподряда",
  "Сдаём в срок или платим неустойку",
  "Рассрочка 0% на 12 месяцев",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-10 border-y border-ink/80 bg-ink py-3 marquee-mask overflow-hidden" aria-hidden="true">
      <div className="animate-marquee flex gap-0 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6 font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-paper/85">
            {item}
            <span className="text-copper">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
