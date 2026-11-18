import { useEffect, useState } from "react";
import { Menu, X, Phone, Clock, MapPin, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const NAV = [
  { label: "Услуги", href: "#services" },
  { label: "Смета за 30 сек", href: "#calculator" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Этапы", href: "#process" },
  { label: "Отзывы", href: "#reviews" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50">
      {/* top micro-bar */}
      <div
        className={`hidden md:block border-b transition-colors duration-300 ${
          scrolled ? "border-transparent" : "border-ink/8 bg-ink text-paper"
        }`}
      >
        {!scrolled && (
          <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper/80">
            <span className="inline-flex items-center gap-2">
              <MapPin size={12} className="text-copper-light" /> Москва и область · выезд на замер в день обращения
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={12} className="text-copper-light" /> Пн–Сб 9:00–21:00 · Вс по записи
            </span>
            <a href="mailto:privet@architectonic.ru" className="hover:text-copper-light transition-colors">
              privet@architectonic.ru
            </a>
          </div>
        )}
      </div>

      {/* main bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "bg-paper/90 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(23,27,30,0.35)] border-b border-line" : "bg-paper/70 backdrop-blur-md md:bg-paper"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-7" aria-label="Разделы сайта">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-[13.5px] font-medium text-ink/75 hover:text-copper transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-copper after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a href="tel:+74951204060" className="hidden sm:flex flex-col items-end leading-tight group">
              <span className="font-display font-extrabold text-[15px] tracking-tight group-hover:text-copper transition-colors">
                +7 (495) 120-40-60
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">ежедневно · без выходных*</span>
            </a>
            <a
              href="#calculator"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 font-display text-[13px] font-bold text-paper transition hover:bg-copper hover:text-ink"
            >
              Смета
              <ArrowRight size={15} />
            </a>
            <a href="tel:+74951204060" aria-label="Позвонить" className="md:hidden rounded-full border border-line p-2.5 text-ink">
              <Phone size={18} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              className="lg:hidden rounded-full border border-line p-2.5 text-ink transition hover:border-copper hover:text-copper"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* mobile panel */}
        {open && (
          <div className="lg:hidden border-t border-line bg-paper/97 backdrop-blur-xl">
            <div className="px-5 py-5">
              <nav className="grid grid-cols-2 gap-2" aria-label="Мобильная навигация">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-line bg-white px-4 py-3.5 font-display text-sm font-bold text-ink transition active:scale-[0.98] hover:border-copper hover:text-copper"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <a
                href="#lead"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-copper px-4 py-4 font-display font-extrabold text-ink"
              >
                Получить смету за 1 день
                <ArrowRight size={17} />
              </a>
              <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                * вс — по записи · privet@architectonic.ru
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
