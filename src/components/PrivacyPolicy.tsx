import { useEffect, useState } from "react";
import { X } from "lucide-react";

/** Button that opens a real, readable privacy-policy modal. */
export default function PrivacyPolicy({ triggerClassName = "", label = "Политика конфиденциальности" }: { triggerClassName?: string; label?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Политика конфиденциальности"
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-surface p-6 text-ink sm:max-w-lg sm:rounded-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-[18px] font-medium">Политика конфиденциальности</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="-mr-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-secondary transition-colors duration-150 hover:border-ink/25 hover:text-ink"
              >
                <X size={17} strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-[14px] leading-[22px] text-secondary">
              <p>
                ООО «АРХИТЕКТОНИКА», ИНН 7708456123, обрабатывает только те данные, которые вы оставляете в форме: имя и
                телефон. Мы используем их для связи по поводу заявки, замера, сметы и договора.
              </p>
              <p>
                Мы не передаём данные третьим лицам, не используем их для рассылок без вашего согласия и храним не
                дольше 3 лет с момента последнего обращения.
              </p>
              <p>
                Удалить данные можно в любой момент: напишите на{" "}
                <a href="mailto:privet@architectonic.ru" className="text-copper-deep underline underline-offset-2">
                  privet@architectonic.ru
                </a>{" "}
                или позвоните{" "}
                <a href="tel:+74951204060" className="text-copper-deep underline underline-offset-2">
                  +7 (495) 120-40-60
                </a>
                .
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 h-11 w-full rounded-lg bg-ink px-4 text-[14px] font-medium text-paper transition-colors duration-150 hover:bg-ink-2"
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </>
  );
}
