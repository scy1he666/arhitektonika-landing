import { useCallback, useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2, ArrowRight } from "lucide-react";
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
  { img: hero, title: "Пентхаус с видом на город", place: "ЖК «Меркурий» · Москва-Сити", area: "184 м²", type: "designer", duration: "14 недель", year: "2025" },
  { img: livingDark, title: "Гостиная с деревянной стеной", place: "ЖК «Селигер Сити» · САО", area: "92 м²", type: "capital", duration: "9 недель", year: "2025" },
  { img: kitchenGraphite, title: "Кухня в графитовом и меди", place: "ЖК «Фили Град» · ЗАО", area: "78 м²", type: "designer", duration: "11 недель", year: "2024" },
  { img: kitchenParis, title: "Квартира для молодой семьи", place: "Замоскворечье · ЦАО", area: "86 м²", type: "capital", duration: "10 недель", year: "2024" },
  { img: kitchenIsland, title: "Островная кухня-гостиная", place: "ЖК «АРТ4» · Одинцово", area: "110 м²", type: "designer", duration: "12 недель", year: "2025" },
  { img: livingWarm, title: "Семейная гостиная за 4 недели", place: "ЖК «Люберецкие поля» · Люберцы", area: "64 м²", type: "cosmetic", duration: "4 недели", year: "2024" },
  { img: bedroomScandi, title: "Спальня в скандинавском духе", place: "КП «Скандинавия» · Новая Москва", area: "71 м²", type: "cosmetic", duration: "3 недели", year: "2025" },
  { img: bedroomAttic, title: "Мансардная спальня в доме", place: "Истринский район · частный дом", area: "96 м²", type: "designer", duration: "13 недель", year: "2023" },
];

const FILTERS: Array<{ id: ServiceId | "all"; label: string }> = [
  { id: "all", label: "Все проекты" },
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
  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) => {
        if (cur === null) return cur;
        return (cur + dir + PROJECTS.length) % PROJECTS.length;
      });
    },
    []
  );

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
    <section id="portfolio" className="py-16 sm:py-24 scroll-mt-24" aria-label="Портфолио">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-copper-deep">03 — Портфолио</p>
            <h2 className="mt-3 font-display font-extrabold tracking-[-0.02em] text-ink text-4xl sm:text-5xl leading-[1.05]">
              Сдано и <em className="font-serif italic font-medium text-copper">обжито</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted leading-relaxed">
            Каждый объект сдаём по акту и передаём фотоальбом. Вот восемь из 480+ сданных квартир.
          </p>
        </div>

        {/* filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Фильтр по типу ремонта">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            const count = f.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.type === f.id).length;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${
                  active ? "border-ink bg-ink text-paper" : "border-line text-ink/70 hover:border-copper hover:text-copper"
                }`}
              >
                {f.label} <span className={active ? "text-copper-light" : "text-muted"}>· {count}</span>
              </button>
            );
          })}
        </div>

        {/* masonry grid */}
        <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
          {visible.map(({ p, i }) => (
            <Reveal as="div" key={p.title} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-line text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-copper/40"
                aria-label={`Открыть проект: ${p.title}`}
              >
                <img
                  src={p.img}
                  alt={`${p.title} — ${p.place}`}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/12 px-2.5 py-1 font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.18em] text-paper/90 backdrop-blur-sm">
                    {TYPE_LABEL[p.type]} ремонт · {p.year}
                  </span>
                  <span className="mt-2 flex items-end justify-between gap-3">
                    <span>
                      <span className="block font-display font-extrabold text-paper text-base sm:text-lg leading-tight">{p.title}</span>
                      <span className="mt-1 flex items-center gap-1 font-mono text-[9px] sm:text-[10px] text-paper/65">
                        <MapPin size={10} /> {p.place} · {p.area} · {p.duration}
                      </span>
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/25 text-paper/90 transition-all duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-ink">
                      <Maximize2 size={16} />
                    </span>
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-2 flex justify-center">
          <a href="#lead" className="group inline-flex items-center gap-2 font-display font-bold text-ink transition hover:text-copper">
            Хочу так же — хотите обсудить вашу квартиру?
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </div>
      </div>

      {/* lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/92 backdrop-blur-md"
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-paper/60">
              Проект {String((lightbox ?? 0) + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="rounded-full border border-paper/20 p-2.5 text-paper/80 transition hover:border-copper hover:text-copper"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-2 sm:px-16 pb-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Предыдущий проект"
              className="absolute left-2 sm:left-5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-paper/20 bg-ink/60 p-3 text-paper/85 transition hover:border-copper hover:text-copper"
            >
              <ChevronLeft size={22} />
            </button>
            <figure className="max-w-5xl w-full">
              <img
                src={current.img}
                alt={`${current.title} — ${current.place}`}
                className="max-h-[64vh] sm:max-h-[70vh] w-full rounded-2xl object-contain"
              />
              <figcaption className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 px-1">
                <div>
                  <p className="font-display font-extrabold text-xl sm:text-2xl text-paper leading-tight">{current.title}</p>
                  <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-paper/55">
                    <MapPin size={11} /> {current.place}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[current.area, TYPE_LABEL[current.type], current.duration, current.year].map((chip) => (
                    <span key={chip} className="rounded-full border border-paper/20 px-3 py-1.5 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.16em] text-paper/75">
                      {chip}
                    </span>
                  ))}
                </div>
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Следующий проект"
              className="absolute right-2 sm:right-5 top-1/2 z-10 -translate-y-1/2 rounded-full border border-paper/20 bg-ink/60 p-3 text-paper/85 transition hover:border-copper hover:text-copper"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
