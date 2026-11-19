export default function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  const word = variant === "dark" ? "text-ink" : "text-paper";
  const sub = variant === "dark" ? "text-muted" : "text-paper/60";

  return (
    <a href="#top" className={`inline-flex items-center gap-3 ${className}`} aria-label="АРХИТЕКТОНИКА, наверх">
      <svg width="32" height="32" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
        <path
          d="M14 50V32c0-9.9 8.1-18 18-18s18 8.1 18 18v18"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          className={variant === "dark" ? "text-ink" : "text-paper"}
        />
        <path d="M10 50h44" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-copper" />
      </svg>
      <span className="leading-none">
        <span className={`block text-[16px] font-semibold tracking-[0.06em] ${word}`}>АРХИТЕКТОНИКА</span>
        <span className={`mt-1.5 block text-[11px] leading-none ${sub}`}>ремонт квартир в Москве</span>
      </span>
    </a>
  );
}
