import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";

const NAV = [
  { label: "Услуги", href: "#services" },
  { label: "Смета", href: "#calculator" },
  { label: "Проекты", href: "#portfolio" },
  { label: "Этапы", href: "#process" },
  { label: "Отзывы", href: "#reviews" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      <div
        className={`border-b bg-paper transition-colors duration-150 ${
          scrolled ? "border-line" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Разделы сайта">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[14px] text-secondary transition-colors duration-150 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+74951204060"
              className="hidden items-center gap-2 text-[14px] text-secondary transition-colors duration-150 hover:text-ink md:inline-flex"
            >
              <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
              +7 (495) 120-40-60
            </a>
            <a
              href="#calculator"
              className="hidden h-9 items-center rounded-lg bg-ink px-4 text-[14px] font-medium text-paper transition-colors duration-150 hover:bg-ink-2 sm:inline-flex"
            >
              <span className="lg:hidden">Смета</span>
              <span className="hidden lg:inline">Рассчитать смету</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors duration-150 hover:border-ink/25 lg:hidden"
            >
              {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-line bg-paper lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-3" aria-label="Мобильная навигация">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3 text-[15px] text-ink last:border-0"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2 pb-4">
              <a
                href="tel:+74951204060"
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-line text-[15px] font-medium text-ink"
              >
                <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
                +7 (495) 120-40-60
              </a>
              <a
                href="#lead"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center rounded-lg bg-ink text-[15px] font-medium text-paper"
              >
                Оставить заявку
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
