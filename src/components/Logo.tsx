type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const word = variant === "dark" ? "text-ink" : "text-paper";
  const sub = variant === "dark" ? "text-muted" : "text-paper/55";

  return (
    <a href="#top" className={`group inline-flex items-center gap-3 ${className}`} aria-label="АРХИТЕКТОНИКА — наверх">
      <svg width="44" height="44" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
        <rect width="64" height="64" rx="14" className={variant === "dark" ? "fill-ink" : "fill-copper"} />
        <path
          d="M18 46V32c0-8.8 6.3-16 14-16s14 7.2 14 16v14"
          fill="none"
          stroke="#C26D3D"
          strokeWidth="5"
          strokeLinecap="round"
          className="transition-transform duration-500 group-hover:-translate-y-1"
          style={{ transformOrigin: "center" }}
        />
        <path d="M18 46h28" stroke="#F9F8F6" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display font-extrabold tracking-[0.08em] text-[17px] sm:text-lg ${word}`}>
          АРХИТЕКТОНИКА
        </span>
        <span className={`mt-1.5 block font-mono text-[9px] uppercase tracking-[0.3em] ${sub}`}>
          инженерия интерьера
        </span>
      </span>
    </a>
  );
}
