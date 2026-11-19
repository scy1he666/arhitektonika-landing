import { useCallback, useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import type { ServiceId } from "./Services";

import hero from "../assets/hero.jpg";
import livingDark from "../assets/living-dark.jpg";
import livingWarm from "../assets/living-warm.jpg";
import kitchenGraphite from "../assets/kitchen-graphite.jpg";
import kitchenParis from "../assets/kitchen-paris.jpg";
import kitchenIsland from "../assets/kitchen-island.jpg";
import bedroomScandi from "../assets/bedroom-scandi.jpg";
import bedroomAttic from "../assets/bedroom-attic.jpg";

type Project = {
  img: string;
  title: string;
  place: string;
  area: string;
  type: ServiceId;
  duration: string;
  year: string;
};

const PROJECTS: Project[] = [
  { img: hero, title: "Пентхаус с видом на город", place: "ЖК «Меркурий», Москва-Сити", area: "184 м²", type: "designer", duration: "14 недель", year: "2025" },
  { img: livingDark, title: "Гостиная с деревянной стеной", place: "ЖК «Селигер Сити», САО", area: "92 м²", type: "capital", duration: "9 недель", year: "2025" },
  { img: kitchenGraphite, title: "Кухня в графитовом и меди", place: "ЖК «Фили Град», ЗАО", area: "78 м²", type: "designer", duration: "11 недель", year: "2024" },
  { img: kitchenParis, title: "Квартира для молодой семьи", place: "Замоскворечье, ЦАО", area: "86 м²", type: "capital", duration: "10 недель", year: "2024" },
  { img: kitchenIsland, title: "Островная кухня-гостиная", place: "ЖК «АРТ4», Одинцово", area: "110 м²", type: "designer", duration: "12 недель", year: "2025" },
  { img: livingWarm, title: "Семейная гостиная за 4 недели", place: "ЖК «Люберецкие поля», Люберцы", area: "64 м²", type: "cosmetic", duration: "4 недели", year: "2024" },
  { img: bedroomScandi, title: "Спальня в скандинавском духе", place: "КП «Скандинавия», Новая Москва", area: "71 м²", type: "cosmetic", duration: "3 недели", year: "2025" },
  { img: bedroomAttic, title: "Мансардная спальня в доме", place: "Истринский район, частный дом", area: "96 м²", type: "designer", duration: "13 недель", year: "2023" },
];

const FILTERS: Array<{ id: ServiceId | "all"; label: string }> = [
  { id: "all", label: "Все" },
  { id: "designer", label: "Дизайнерский" },
  { id: "capital", label: "Капитальный" },
  { id: "cosmetic", label: "Косметический" },
];

const TYPE_LABEL: Record<ServiceId, string> = { cosmetic: "Косметический", capital: "Капитальный", designer: "Дизайнерский" };

export default function Portfolio() {
  const [filter, setFilter] = useState<ServiceId | "all">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () => PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => filter === "all" || p.type === filter),
    [filter]
  );

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback((dir: 1 | -1) => {
    setLightbox((cur) => {
      if (cur === null) return cur;
      return (cur + dir + PROJECTS.length) % PROJECTS.length;
    });
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const current = lightbox !== null ? PROJECTS[lightbox] : null;

  return (
    <section id="portfolio" className="scroll-mt-24 border-t border-line py-20 lg:py-28" aria-label="Проекты">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[34rem] text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-ink sm:text-[34px]">
            Восемь квартир из 480 сданных
          </h2>
          <p className="max-w-[27rem] text-[16px] leading-[24px] text-secondary">
            Каждый объект сдаём по акту и отдаём фотоальбом. Фильтр по типу ремонта, клик открывает снимки.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2" role="group" aria-label="Фильтр по типу ремонта">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            const count = f.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.type === f.id).length;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`border-b pb-1 text-[14px] transition-colors duration-150 ${
                  active ? "border-ink text-ink" : "border-transparent text-secondary hover:text-ink"
                }`}
              >
                {f.label} <span className="tabular-nums text-muted">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(({ p, i }) => (
            <Reveal key={p.title}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
                aria-label={`Открыть проект: ${p.title}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-sunk">
                  <img
                    src={p.img}
                    alt={`${p.title}, ${p.place}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-[opacity] duration-200 group-hover:opacity-90"
                  />
                </span>
                <span className="mt-3 block text-[15px] font-medium leading-tight text-ink">{p.title}</span>
                <span className="mt-1 block text-[13px] leading-[18px] tabular-nums text-secondary">
                  {p.place}, {p.area}, {p.duration}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <a
          href="#lead"
          className="mt-10 inline-flex items-center gap-2 text-[15px] font-medium text-ink transition-colors duration-150 hover:text-copper"
        >
          Обсудить вашу квартиру
          <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95"
          onClick={close}
        >
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <p className="text-[13px] tabular-nums text-paper/70">
              {String((lightbox ?? 0) + 1)} из {PROJECTS.length}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-paper/75 transition-colors duration-150 hover:bg-paper/10 hover:text-paper"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-2 pb-2 sm:px-16" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Предыдущий проект"
              className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-paper/75 transition-colors duration-150 hover:bg-paper/10 hover:text-paper sm:left-5"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <figure className="w-full max-w-5xl">
              <img
                src={current.img}
                alt={`${current.title}, ${current.place}`}
                className="max-h-[62vh] w-full rounded-xl object-contain sm:max-h-[70vh]"
              />
              <figcaption className="mt-4 flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[18px] font-medium leading-tight text-paper">{current.title}</p>
                  <p className="mt-1 text-[13px] text-paper/65">
                    {current.place}, {current.area}, {TYPE_LABEL[current.type].toLowerCase()} ремонт, {current.duration},{" "}
                    {current.year}
                  </p>
                </div>
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Следующий проект"
              className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-paper/75 transition-colors duration-150 hover:bg-paper/10 hover:text-paper sm:right-5"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
