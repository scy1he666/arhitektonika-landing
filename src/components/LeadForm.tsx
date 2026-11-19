import { useEffect, useState, type FormEvent } from "react";
import { PhoneCall, MapPin, Check, Loader2, CheckCircle2, ArrowRight, Send, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import PrivacyPolicy from "./PrivacyPolicy";

/** Formats a Russian phone number as +7 (XXX) XXX-XX-XX while typing. */
function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);
  const p = digits.slice(1);
  let out = "+7";
  if (p.length > 0) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

type Props = { prefill: string };

export default function LeadForm({ prefill }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // keep the comment in sync with the calculator output until the user edits it
  useEffect(() => {
    if (prefill) setComment(prefill);
  }, [prefill]);

  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length === 11;
  const nameValid = name.trim().length >= 2;
  const formValid = nameValid && phoneValid && consent;

  const errors = {
    name: touched && !nameValid ? "Имя: не меньше двух букв" : "",
    phone: touched && !phoneValid ? "Телефон полностью: +7 (999) 000-00-00" : "",
    consent: touched && !consent ? "Без согласия на обработку данных мы не сможем перезвонить" : "",
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    if (!formValid || sending) return;
    setSending(true);
    // no backend: persist locally and simulate dispatch latency
    try {
      const prev = JSON.parse(localStorage.getItem("architectonic-leads") ?? "[]") as unknown[];
      prev.push({ name: name.trim(), phone, comment: comment.trim(), at: new Date().toISOString() });
      localStorage.setItem("architectonic-leads", JSON.stringify(prev));
    } catch {
      /* storage may be unavailable, the success flow still works */
    }
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  const reset = () => {
    setSent(false);
    setTouched(false);
    setName("");
    setPhone("");
    setComment("");
    setConsent(false);
  };

  return (
    <section id="lead" className="scroll-mt-24 border-t border-line py-20 lg:py-28" aria-label="Заявка на замер">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        {/* contacts */}
        <div className="lg:col-span-5">
          <h2 className="max-w-[24rem] text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-ink sm:text-[34px]">
            Замер и смета бесплатно
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "Выезд инженера в день обращения, без предоплаты",
              "Смета на 40 позиций за 2 рабочих дня",
              "Цена и срок в договоре, неустойка за каждый день просрочки",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[20px] text-secondary">
                <Check size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-copper" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <a href="tel:+74951204060" className="mt-8 inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink">
              <PhoneCall size={18} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[20px] font-medium tabular-nums leading-tight text-ink">+7 (495) 120-40-60</span>
              <span className="mt-0.5 block text-[12px] text-muted">Пн–Сб, 9:00–21:00, Вс по записи</span>
            </span>
          </a>

          <p className="mt-6 flex items-start gap-2.5 text-[14px] leading-[20px] text-secondary">
            <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
            <span>
              Москва, Пресненская набережная, 12, стр. 2, офис 804
              <br />
              <a
                href="https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9F%D1%80%D0%B5%D1%81%D0%BD%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BD%D0%B0%D0%B1%D0%B5%D1%80%D0%B5%D0%B6%D0%BD%D0%B0%D1%8F%2C%2012"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 font-medium text-copper-deep underline-offset-2 transition-colors duration-150 hover:text-copper hover:underline"
              >
                Показать на карте
                <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </span>
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="https://t.me/+74951204060"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-line px-4 text-[13px] font-medium text-ink transition-colors duration-150 hover:border-ink/25"
            >
              <Send size={15} strokeWidth={1.5} aria-hidden="true" />
              Telegram
            </a>
            <a
              href="https://wa.me/74951204060?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D1%81%D0%BC%D0%B5%D1%82%D1%83"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-line px-4 text-[13px] font-medium text-ink transition-colors duration-150 hover:border-ink/25"
            >
              <MessageCircle size={15} strokeWidth={1.5} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* form */}
        <Reveal className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
            aria-label="Форма заявки на замер"
          >
            {sent ? (
              <div className="flex flex-col items-start py-4">
                <CheckCircle2 size={32} strokeWidth={1.5} className="text-copper" aria-hidden="true" />
                <h3 className="mt-4 text-[20px] font-medium text-ink">Заявка отправлена</h3>
                <p className="mt-2 max-w-md text-[14px] leading-[22px] text-secondary">
                  Инженер свяжется с вами в ближайшее рабочее время, уточнит детали и предложит время замера.
                </p>
                <div className="mt-5 w-full max-w-sm rounded-lg border border-line bg-paper p-4">
                  <p className="text-[12px] text-muted">Ваша заявка</p>
                  <p className="mt-1.5 text-[14px] font-medium tabular-nums text-ink">
                    {name.trim()}, {phone}
                  </p>
                  {comment.trim() && (
                    <p className="mt-1.5 text-[13px] leading-[18px] text-secondary line-clamp-3">{comment.trim()}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 inline-flex h-10 items-center rounded-lg border border-line px-4 text-[13px] font-medium text-ink transition-colors duration-150 hover:border-ink/25"
                >
                  Отправить другую заявку
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-[20px] font-medium text-ink sm:text-[22px]">Оставьте контакты, перезвоним в течение часа</h3>
                <p className="mt-1.5 text-[13px] leading-[18px] text-secondary">
                  В рабочее время, Пн–Сб. Данные не передаём третьим лицам.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="lead-name" className="block text-[13px] text-secondary">
                      Имя
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setTouched(true)}
                      placeholder="Александр"
                      aria-invalid={!!errors.name}
                      className={`mt-1.5 h-11 w-full rounded-lg border bg-paper px-3 text-[15px] text-ink outline-none transition-colors duration-150 placeholder:text-muted/70 focus:border-copper focus:ring-2 focus:ring-copper/20 ${
                        errors.name ? "border-red-600" : "border-line"
                      }`}
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-[12px] text-red-700">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lead-phone" className="block text-[13px] text-secondary">
                      Телефон
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      onBlur={() => setTouched(true)}
                      placeholder="+7 (999) 000-00-00"
                      aria-invalid={!!errors.phone}
                      className={`mt-1.5 h-11 w-full rounded-lg border bg-paper px-3 text-[15px] tabular-nums text-ink outline-none transition-colors duration-150 placeholder:text-muted/70 focus:border-copper focus:ring-2 focus:ring-copper/20 ${
                        errors.phone ? "border-red-600" : "border-line"
                      }`}
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-1.5 text-[12px] text-red-700">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="lead-comment" className="block text-[13px] text-secondary">
                    Комментарий
                  </label>
                  <textarea
                    id="lead-comment"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Например: двушка в новостройке, 54 м², хотим закончить к Новому году"
                    className="mt-1.5 w-full resize-y rounded-lg border border-line bg-paper px-3 py-2.5 text-[14px] leading-[20px] text-ink outline-none transition-colors duration-150 placeholder:text-muted/70 focus:border-copper focus:ring-2 focus:ring-copper/20"
                  />
                </div>

                <div className="mt-4">
                  <label className="flex cursor-pointer select-none items-start gap-3">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-copper"
                      aria-invalid={!!errors.consent}
                    />
                    <span className="text-[13px] leading-[18px] text-secondary">
                      Согласен на обработку персональных данных,{" "}
                      <PrivacyPolicy
                        label="политика конфиденциальности"
                        triggerClassName="text-copper-deep underline underline-offset-2 transition-colors duration-150 hover:text-copper"
                      />
                    </span>
                  </label>
                  {errors.consent && (
                    <p role="alert" className="mt-1.5 text-[12px] text-red-700">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-copper px-5 text-[15px] font-medium text-ink transition-colors duration-150 enabled:hover:bg-copper-deep enabled:hover:text-paper disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      Отправляем заявку
                    </>
                  ) : (
                    <>
                      Получить смету бесплатно
                      <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-[12px] text-muted">Звонок инженера, никакой рассылки</p>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
