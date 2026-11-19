import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
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
      hint: type === "designer" ? "уже в дизайнерском ремонте" : "+1 800 ₽/м²",
      checked: type === "designer" || designProject,
      set: setDesignProject,
      disabled: type === "designer",
    },
    { key: "demo", label: "Демонтаж и вывоз мусора", hint: "+900 ₽/м²", checked: demolition, set: setDemolition },
    { key: "furn", label: "Мебель на заказ (кухня, шкафы)", hint: "+12 000 ₽/м²", checked: furniture, set: setFurniture },
    { key: "smart", label: "Умный дом (свет, климат, доступ)", hint: "+120 000 ₽", checked: smartHome, set: setSmartHome },
  ];

  const rows = [
    { label: `Работы, ${area} м²`, value: fmt(calc.works) },
    { label: "Материалы по оптовым ценам", value: calc.materials > 0 ? fmt(calc.materials) : null },
    { label: "Дизайн-проект", value: calc.design > 0 ? fmt(calc.design) : null },
    { label: "Демонтаж и вывоз", value: calc.demo > 0 ? fmt(calc.demo) : null },
    { label: "Мебель на заказ", value: calc.furn > 0 ? fmt(calc.furn) : null },
    { label: "Умный дом", value: calc.smart > 0 ? fmt(calc.smart) : null },
    { label: "Скидка по заявке с сайта", value: `−${fmt(calc.discount)}` },
  ].filter((r) => r.value);

  return (
    <section id="calculator" className="scroll-mt-24 border-t border-line bg-sunk py-20 lg:py-28" aria-label="Калькулятор стоимости">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="max-w-[34rem] text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-ink sm:text-[34px]">
          Смета за пару минут
        </h2>
        <p className="mt-3 max-w-[34rem] text-[16px] leading-[24px] text-secondary">
          Итог пересчитывается при каждом изменении. Точную цифру фиксируем в договоре после бесплатного замера.
        </p>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          {/* controls */}
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:col-span-7">
            <p className="text-[13px] text-secondary" id="calc-type-label">
              Тип ремонта
            </p>
            <div
              className="mt-2.5 grid gap-1 rounded-lg border border-line bg-paper p-1 sm:grid-cols-3"
              role="radiogroup"
              aria-labelledby="calc-type-label"
            >
              {(Object.keys(RATES) as ServiceId[]).map((id) => {
                const selected = id === type;
                return (
                  <button
                    key={id}
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onTypeChange(id)}
                    className={`flex items-center justify-between gap-2 rounded-md px-3 py-2 text-left transition-colors duration-150 sm:block sm:text-center ${
                      selected ? "bg-surface text-ink shadow-[0_1px_2px_rgba(31,27,22,0.05)]" : "text-secondary hover:text-ink"
                    }`}
                  >
                    <span className="block text-[14px] font-medium leading-tight">{LABELS[id]}</span>
                    <span className="block text-[12px] tabular-nums text-muted sm:mt-0.5">от {fmt(RATES[id])}/м²</span>
                  </button>
                );
              })}
            </div>

            {/* area slider */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="area" className="text-[13px] text-secondary">
                  Площадь квартиры
                </label>
                <p className="text-[26px] font-medium tabular-nums leading-none text-ink">
                  {area} <span className="text-[15px] text-muted">м²</span>
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
                style={{
                  background: `linear-gradient(to right, #B0592A 0%, #B0592A ${pct}%, #E3DDD2 ${pct}%, #E3DDD2 100%)`,
                }}
                aria-valuetext={`${area} квадратных метров`}
              />
              <div className="mt-2 flex justify-between text-[12px] tabular-nums text-muted">
                <span>18 м²</span>
                <span>100 м²</span>
                <span>200 м²</span>
              </div>
            </div>

            {/* materials switch */}
            <button
              type="button"
              role="switch"
              aria-checked={withMaterials}
              onClick={() => setWithMaterials((v) => !v)}
              className="mt-8 flex w-full items-center justify-between gap-4 rounded-lg border border-line px-4 py-3.5 text-left transition-colors duration-150 hover:border-ink/25"
            >
              <span>
                <span className="block text-[15px] font-medium text-ink">С материалами по оптовым ценам</span>
                <span className="mt-0.5 block text-[13px] text-muted">Закупка у 40 поставщиков, без нашей наценки</span>
              </span>
              <span
                aria-hidden="true"
                className={`relative h-6 w-10 shrink-0 rounded-full transition-colors duration-150 ${
                  withMaterials ? "bg-copper" : "bg-line"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-surface transition-[transform] duration-150 ${
                    withMaterials ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </span>
            </button>

            {/* option toggles */}
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {toggles.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={t.checked}
                  disabled={t.disabled}
                  onClick={() => t.set(!t.checked)}
                  className={`flex items-start gap-3 rounded-lg border px-4 py-3.5 text-left transition-colors duration-150 ${
                    t.disabled
                      ? "cursor-default border-line bg-paper"
                      : t.checked
                        ? "border-copper/45 bg-surface"
                        : "border-line bg-transparent hover:border-ink/25"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border ${
                      t.checked ? "border-copper bg-copper text-paper" : "border-line"
                    }`}
                  >
                    {t.checked && <Check size={12} strokeWidth={2} />}
                  </span>
                  <span>
                    <span className="block text-[14px] leading-[20px] text-ink">{t.label}</span>
                    <span className="mt-0.5 block text-[12px] tabular-nums text-muted">{t.hint}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* estimate panel */}
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-2xl bg-ink p-6 text-paper sm:p-8">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[13px] text-paper/70">Предварительная оценка</p>
                <p className="text-[13px] tabular-nums text-copper-light">−3% по заявке</p>
              </div>

              <dl className="mt-5 space-y-2.5 text-[14px]">
                {rows.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-paper/10 pb-2.5">
                    <dt className="text-paper/65">{row.label}</dt>
                    <dd className="tabular-nums text-paper">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5">
                <p className="text-[13px] text-paper/70">Итого под ключ</p>
                <p className="mt-1 text-[36px] font-medium tabular-nums leading-none tracking-[-0.02em] text-paper sm:text-[40px]">
                  {fmt(calc.total)}
                </p>
                <p className="mt-3 text-[13px] leading-[18px] text-paper/65">
                  Срок около {calc.weeks} недель, замер бесплатный, цена в договоре не
                  меняется
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSubmit(summary)}
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-paper px-5 text-[15px] font-medium text-ink transition-colors duration-150 hover:bg-sunk"
              >
                Получить точную смету
                <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <p className="mt-3 text-center text-[12px] text-paper/55">Выезд инженера и замер 0 ₽, без предоплаты</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
