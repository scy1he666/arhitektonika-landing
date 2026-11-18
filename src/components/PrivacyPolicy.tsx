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
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-ink/70 backdrop-blur-sm p-0 sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-paper p-6 sm:p-8 text-ink shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="font-display font-extrabold text-xl">Политика конфиденциальности</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="rounded-full border border-line p-2 text-muted transition hover:border-copper hover:text-copper"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink/85">
              <p>
                «АРХИТЕКТОНИКА» (ООО «АРХИТЕКТОНИКА», ИНН 7708456123) обрабатывает только те данные, которые вы оставляете в
                форме: имя и телефон. Мы используем их исключительно для связи с вами по поводу заявки — замера, сметы и
                договора.
              </p>
              <p>
                Мы не передаём ваши данные третьим лицам, не используем их для рассылок без вашего согласия и храним не дольше
                3 лет с момента последнего обращения.
              </p>
              <p>
                Вы в любой момент можете попросить удалить свои данные: напишите на{" "}
                <a href="mailto:privet@architectonic.ru" className="text-copper underline underline-offset-2">
                  privet@architectonic.ru
                </a>{" "}
                или позвоните <a href="tel:+74951204060" className="text-copper underline underline-offset-2">+7 (495) 120-40-60</a>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-xl bg-ink px-4 py-3 font-display font-bold text-paper transition hover:bg-ink-2"
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </>
  );
}
