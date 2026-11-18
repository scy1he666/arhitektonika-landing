import { ArrowRight, Camera, ArrowDown, Star } from "lucide-react";
import hero from "../assets/hero.jpg";

function RotatingBadge() {
  return (
    <div className="pointer-events-none absolute -left-3 sm:-left-8 lg:-left-14 bottom-[22%] z-20 h-28 w-28 sm:h-36 sm:w-36 lg:h-40 lg:w-40">
      <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full" aria-hidden="true">
        <defs>
          <path id="circlePath" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        </defs>
        <circle cx="50" cy="50" r="49" className="fill-ink" />
        <text className="fill-paper font-mono" style={{ fontSize: "8.2px", letterSpacing: "1.6px" }}>
          <textPath href="#circlePath">
            ГАРАНТИЯ 5 ЛЕТ · ФИКСИРОВАННАЯ СМЕТА · С 2011 ГОДА ·
          </textPath>
        </text>
        <path d="M38 62V42.5a12 12 0 0 1 24 0V62" fill="none" stroke="#C26D3D" strokeWidth="4.4" strokeLinecap="round" />
        <path d="M34 62h32" stroke="#F9F8F6" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[104px] sm:pt-[128px] lg:pt-[140px]" aria-label="Главный экран">
      {/* backdrop mono index */}
      <span aria-hidden="true" className="pointer-events-none select-none absolute -top-2 right-2 lg:right-10 font-mono font-semibold text-[110px] sm:text-[180px] lg:text-[240px] leading-none text-ink/[0.045]">
        480+
      </span>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center pb-14 sm:pb-20">
          {/* text column */}
          <div className="lg:col-span-6 relative z-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-copper" aria-hidden="true" />
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-copper-deep">
                Ремонт квартир под ключ · Москва
              </p>
            </div>

            <h1 className="mt-5 font-display font-extrabold tracking-[-0.03em] text-ink text-[42px] leading-[1.02] sm:text-6xl xl:text-[76px] xl:leading-[0.98]">
              Квартира вашей{" "}
              <em className="font-serif italic font-medium text-copper">жизни</em> — по{" "}
              фиксированной смете
            </h1>

            <p className="mt-6 max-w-xl text-[15px] sm:text-lg leading-relaxed text-ink/80">
              Косметический, капитальный и дизайнерский ремонт. Фиксируем цену в договоре после замера,
              присылаем фотоотчёт каждый вечер, сдаём в срок — или платим неустойку за каждый день просрочки.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#calculator"
                className="group inline-flex items-center gap-2 rounded-full bg-copper px-6 sm:px-7 py-4 font-display text-[15px] font-extrabold text-ink shadow-[0_18px_40px_-12px_rgba(194,109,61,0.6)] transition hover:bg-copper-deep hover:text-paper"
              >
                Рассчитать смету за 30 сек
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 sm:px-7 py-4 font-display text-[15px] font-bold text-ink transition hover:border-copper hover:text-copper"
              >
                Смотреть проекты
                <ArrowDown size={18} />
              </a>
            </div>

            {/* trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2" aria-hidden="true">
                  {["АК", "ДО", "СТ"].map((ini, i) => (
                    <span
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-paper bg-ink font-mono text-[9px] text-paper"
                    >
                      {ini}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-medium text-muted">+ 480 сданных квартир</span>
              </div>
              <span className="hidden sm:block h-4 w-px bg-line" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink">
                <Star size={14} className="fill-copper text-copper" />
                4.9 · 1 284 оценки на Яндекс Картах
              </span>
            </div>
          </div>

          {/* visual column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[520px] lg:max-w-none lg:pl-6">
              {/* arch dotted backdrop */}
              <div
                aria-hidden="true"
                className="absolute -top-6 right-[-10%] sm:right-[-6%] h-64 w-64 sm:h-96 sm:w-96 rounded-full border border-dashed border-copper/50"
              />
              {/* arch image */}
              <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl border-[6px] border-ink/90 shadow-[0_40px_80px_-30px_rgba(23,27,30,0.55)]">
                <img
                  src={hero}
                  alt="Дизайнерский ремонт гостиной в пентхаусе: светлый диван, панорамные окна, авторская отделка"
                  className="h-[430px] sm:h-[540px] lg:h-[600px] xl:h-[640px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" aria-hidden="true" />
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-paper/90">
                  ЖК «Меркурий» · 184 м² · сдано в 2025
                </p>
              </div>

              <RotatingBadge />

              {/* floating daily-report card */}
              <div className="animate-float absolute bottom-16 sm:bottom-24 -right-1 sm:right-2 lg:-right-4 z-20 w-56 sm:w-64 rounded-2xl border border-line bg-white/95 p-3.5 sm:p-4 shadow-[0_24px_50px_-20px_rgba(23,27,30,0.45)] backdrop-blur">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">День 34 из 45</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-copper/15 px-2 py-0.5 font-mono text-[9px] font-semibold text-copper-deep">
                    <Camera size={10} /> отчёт в 19:00
                  </span>
                </div>
                <div className="mt-2.5 flex items-baseline justify-between gap-2">
                  <span className="font-display text-lg sm:text-xl font-extrabold text-ink">76%</span>
                  <span className="text-[10px] font-medium text-muted text-right leading-tight">шпаклёвка стен,<br />ванная под плитку</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line">
                  <div className="animate-grow-bar h-full rounded-full bg-copper" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
