import { useEffect, useMemo, useState } from "react";
import { Calculator as CalculatorIcon, ArrowRight, BadgePercent, Info } from "lucide-react";
import Reveal from "./Reveal";
import type { ServiceId } from "./Services";

const RATES: Record<ServiceId, number> = { cosmetic: 6500, capital: 14500, designer: 24000 };
const LABELS: Record<ServiceId, string> = { cosmetic: "Косметический", capital: "Капитальный", designer: "Дизайнерский" };
const DAYS_PER_M2: Record<ServiceId, number> = { cosmetic: 0.5, capital: 1.1, designer: 1.5 };
const MIN_AREA = 18;
const MAX_AREA = 200;

const fmt = (n: number) => new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) + " ₽";
const round500 = (n: number) => Math.round(n / 500) * 500;

type Props = {
  type: ServiceId;
  onTypeChange: (t: ServiceId) => void;
  onSubmit: (summary: string) => void;
};

export default function Calculator({ type, onTypeChange, onSubmit }: Props) {
  const [area, setArea] = useState(54);
  const [withMaterials, setWithMaterials] = useState(true);
  const [designProject, setDesignProject] = useState(false);
  const [demolition, setDemolition] = useState(true);
  const [furniture, setFurniture] = useState(false);
  const [smartHome, setSmartHome] = useState(false);

  const calc = useMemo(() => {
    const works = RATES[type] * area;
    const materials = withMaterials ? round500(works * 0.65) : 0;
    const design = designProject && type !== "designer" ? 1800 * area : 0;
    const demo = demolition ? 900 * area : 0;
    const furn = furniture ? 12000 * area : 0;
    const smart = smartHome ? 120000 : 0;
    const subtotal = works + materials + design + demo + furn + smart;
    const discount = round500(subtotal * 0.03);
    const total = subtotal - discount;
    const days = Math.ceil(area * DAYS_PER_M2[type]);
    const weeks = Math.max(2, Math.ceil(days / 7));
    return { works, materials, design, demo, furn, smart, subtotal, discount, total, days, weeks };
  }, [type, area, withMaterials, designProject, demolition, furniture, smartHome]);

  const pct = ((area - MIN_AREA) / (MAX_AREA - MIN_AREA)) * 100;

  const summary = useMemo(() => {
    const bits = [
      `${LABELS[type]} ремонт, ${area} м²`,
      withMaterials ? "работы + материалы" : "только работы",
    ];
    const opts = [
      designProject && type !== "designer" ? "дизайн-проект" : null,
      demolition ? "демонтаж и вывоз" : null,
      furniture ? "мебель на заказ" : null,
      smartHome ? "умный дом" : null,
    ].filter(Boolean);
    if (opts.length) bits.push(opts.join(", "));
    return `Расчёт с сайта: ${bits.join(", ")}. Предварительная оценка: ${fmt(calc.total)}. Хочу бесплатный замер и точную смету.`;
  }, [type, area, withMaterials, designProject, demolition, furniture, smartHome, calc.total]);

  // smart-home and furniture are independent toggles; keep state tidy when switching tabs
  useEffect(() => {
    if (type === "designer") setDesignProject(false);
  }, [type]);

  const toggles: Array<{ key: string; label: string; hint: string; checked: boolean; set: (v: boolean) => void; disabled?: boolean }> = [
    {
      key: "design",
      label: "Дизайн-проект",
      hint: type === "designer" ? "включён в дизайнерский ремонт" : "+1 800 ₽/м²",
      checked: type === "designer" || designProject,
      set: setDesignProject,
      disabled: type === "designer",
    },
    { key: "demo", label: "Демонтаж и вывоз мусора", hint: "+900 ₽/м²", checked: demolition, set: setDemolition },
    { key: "furn", label: "Мебель на заказ (кухня, шкафы)", hint: "+12 000 ₽/м²", checked: furniture, set: setFurniture },
    { key: "smart", label: "Умный дом (свет, климат, доступ)", hint: "+120 000 ₽", checked: smartHome, set: setSmartHome },
  ];

  return (
    <section id="calculator" className="relative scroll-mt-24 bg-ink text-paper py-16 sm:py-24" aria-label="Калькулятор стоимости">
      {/* faint glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-copper/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-copper-light">02 — Смета</p>
            <h2 className="mt-3 font-display font-extrabold tracking-[-0.02em] text-4xl sm:text-5xl leading-[1.05]">
              Честная цена{" "}
              <em className="font-serif italic font-medium text-copper-light">за 30 секунд</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-paper/60 leading-relaxed">
            Двигайте ползунок — итог считается мгновенно. Точную цифру фиксируем в договоре после бесплатного замера.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-6 lg:gap-10">
          {/* controls */}
          <div className="lg:col-span-7 rounded-3xl border border-paper/10 bg-ink-2/60 p-6 sm:p-8 backdrop-blur">
            {/* type segmented control */}
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">Тип ремонта</p>
            <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl border border-paper/10 bg-ink p-2" role="tablist" aria-label="Тип ремонта">
              {(Object.keys(RATES) as ServiceId[]).map((id) => {
                const selected = id === type;
                return (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => onTypeChange(id)}
                    className={`rounded-xl px-2 sm:px-4 py-3 text-center transition-all duration-300 ${
                      selected ? "bg-copper text-ink shadow-[0_10px_30px_-10px_rgba(194,109,61,0.7)]" : "text-paper/75 hover:text-paper"
                    }`}
                  >
                    <span className="block font-display text-[12px] sm:text-sm font-extrabold leading-tight">{LABELS[id]}</span>
                    <span className={`mt-1 block font-mono text-[9px] sm:text-[10px] ${selected ? "text-ink/80" : "text-paper/45"}`}>
                      от {fmt(RATES[id])}/м²
                    </span>
                  </button>
                );
              })}
            </div>

            {/* area slider */}
            <div className="mt-7">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="area" className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
                  Площадь квартиры
                </label>
                <p className="font-display font-extrabold text-2xl sm:text-3xl text-paper">
                  {area} <span className="text-copper-light text-lg align-top">м²</span>
                </p>
              </div>
              <input
                id="area"
                type="range"
                min={MIN_AREA}
                max={MAX_AREA}
                step={1}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="area-range mt-4 w-full"
                style={{ background: `linear-gradient(to right, #C26D3D 0%, #C26D3D ${pct}%, rgba(249,248,246,0.14) ${pct}%, rgba(249,248,246,0.14) 100%)` }}
                aria-valuetext={`${area} квадратных метров`}
              />
              <div className="mt-2 flex justify-between font-mono text-[9px] text-paper/35">
                <span>{MIN_AREA} м² · студия</span>
                <span>100 м²</span>
                <span>{MAX_AREA} м² · пентхаус</span>
              </div>
            </div>

            {/* materials switch */}
            <button
              type="button"
              role="switch"
              aria-checked={withMaterials}
              onClick={() => setWithMaterials((v) => !v)}
              className="mt-6 flex w-full items-center justify-between gap-4 rounded-2xl border border-paper/10 bg-ink p-4 text-left transition hover:border-copper/40"
            >
              <span>
                <span className="block font-display text-sm sm:text-[15px] font-bold text-paper">С материалами — по оптовым ценам</span>
                <span className="mt-0.5 block text-[11px] sm:text-xs text-paper/50">закупаем у 40+ поставщиков, без нашей наценки</span>
              </span>
              <span
                aria-hidden="true"
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${withMaterials ? "bg-copper" : "bg-paper/15"}`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-paper shadow transition-all duration-300 ${withMaterials ? "left-6" : "left-1"}`}
                />
              </span>
            </button>

            {/* option toggles */}
            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              {toggles.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={t.checked}
                  disabled={t.disabled}
                  onClick={() => t.set(!t.checked)}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                    t.disabled
                      ? "border-copper/30 bg-copper/10 opacity-90 cursor-default"
                      : t.checked
                        ? "border-copper/60 bg-copper/10"
                        : "border-paper/10 bg-ink hover:border-paper/25"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                      t.checked ? "border-copper bg-copper text-ink" : "border-paper/30 text-transparent"
                    }`}
                  >
                    <svg viewBox="0 0 12 10" className="h-3 w-3 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 5.5 4.5 9 11 1" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[12px] sm:text-[13px] font-semibold leading-snug text-paper">{t.label}</span>
                    <span className="mt-1 block font-mono text-[9.5px] text-paper/45">{t.hint}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* estimate panel */}
          <Reveal className="lg:col-span-5">
            <div className="h-full rounded-3xl border border-copper/25 bg-gradient-to-b from-copper/10 to-transparent p-6 sm:p-8 flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-copper-light">
                  <CalculatorIcon size={13} /> Предварительная оценка
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-copper/20 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-copper-light">
                  <BadgePercent size={11} /> −3% по заявке
                </span>
              </div>

              <dl className="mt-6 space-y-2.5 text-[13px] sm:text-sm">
                <div className="flex items-baseline justify-between gap-4 border-b border-paper/8 pb-2.5">
                  <dt className="text-paper/60">Работы · {area} м²</dt>
                  <dd className="font-mono text-paper/90">{fmt(calc.works)}</dd>
                </div>
                {calc.materials > 0 && (
                  <div className="flex items-baseline justify-between gap-4 border-b border-paper/8 pb-2.5">
                    <dt className="text-paper/60">Материалы по опт. ценам</dt>
                    <dd className="font-mono text-paper/90">{fmt(calc.materials)}</dd>
                  </div>
                )}
                {calc.design > 0 && (
                  <div className="flex items-baseline justify-between gap-4 border-b border-paper/8 pb-2.5">
                    <dt className="text-paper/60">Дизайн-проект</dt>
                    <dd className="font-mono text-paper/90">{fmt(calc.design)}</dd>
                  </div>
                )}
                {calc.demo > 0 && (
                  <div className="flex items-baseline justify-between gap-4 border-b border-paper/8 pb-2.5">
                    <dt className="text-paper/60">Демонтаж и вывоз</dt>
                    <dd className="font-mono text-paper/90">{fmt(calc.demo)}</dd>
                  </div>
                )}
                {calc.furn > 0 && (
                  <div className="flex items-baseline justify-between gap-4 border-b border-paper/8 pb-2.5">
                    <dt className="text-paper/60">Мебель на заказ</dt>
                    <dd className="font-mono text-paper/90">{fmt(calc.furn)}</dd>
                  </div>
                )}
                {calc.smart > 0 && (
                  <div className="flex items-baseline justify-between gap-4 border-b border-paper/8 pb-2.5">
                    <dt className="text-paper/60">Умный дом</dt>
                    <dd className="font-mono text-paper/90">{fmt(calc.smart)}</dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-4 border-b border-paper/8 pb-2.5">
                  <dt className="text-paper/60">Скидка по заявке с сайта</dt>
                  <dd className="font-mono text-copper-light">−{fmt(calc.discount)}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">Итого «под ключ»</p>
                <p className="mt-1 font-display font-extrabold tracking-tight text-4xl sm:text-5xl text-paper">
                  {fmt(calc.total)}
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-[11px] sm:text-xs text-paper/55">
                  <Info size={12} className="text-copper-light" />
                  Срок: ~{calc.weeks} {calc.weeks < 5 ? "недели" : "недель"} · замер бесплатно · цена в договоре не меняется
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSubmit(summary)}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-copper px-6 py-4 sm:py-5 font-display text-base font-extrabold text-ink transition hover:bg-copper-light"
              >
                Получить точную смету в договоре
                <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
              <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40">
                Выезд инженера и замер — 0 ₽ · без предоплаты
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
