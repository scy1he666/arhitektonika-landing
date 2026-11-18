import { useEffect, useState, type FormEvent } from "react";
import { PhoneCall, MapPin, Send, MessageCircle, Check, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
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
    name: touched && !nameValid ? "Как к вам обращаться? Минимум 2 буквы." : "",
    phone: touched && !phoneValid ? "Введите телефон полностью: +7 (___) ___-__-__" : "",
    consent: touched && !consent ? "Отметьте согласие — иначе мы не сможем перезвонить." : "",
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    if (!formValid || sending) return;
    setSending(true);
    // no backend — persist locally and simulate dispatch latency
    try {
      const prev = JSON.parse(localStorage.getItem("architectonic-leads") ?? "[]") as unknown[];
      prev.push({ name: name.trim(), phone, comment: comment.trim(), at: new Date().toISOString() });
      localStorage.setItem("architectonic-leads", JSON.stringify(prev));
    } catch {
      /* storage may be unavailable — the success flow still works */
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
    <section id="lead" className="relative border-t border-line py-16 sm:py-24 scroll-mt-24" aria-label="Заявка на замер">
      <span aria-hidden="true" className="pointer-events-none select-none absolute bottom-0 left-0 font-display font-extrabold leading-none text-[18vw] lg:text-[12rem] text-ink/[0.035]">
        5 ЛЕТ
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* left: contacts */}
        <div className="lg:col-span-5">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-copper-deep">08 — Заявка</p>
          <h2 className="mt-3 font-display font-extrabold tracking-[-0.02em] text-ink text-4xl sm:text-5xl leading-[1.04]">
            Замер и смета —{" "}
            <em className="font-serif italic font-medium text-copper">бесплатно</em>
          </h2>
          <ul className="mt-7 space-y-3.5">
            {[
              "Выезд инженера в день обращения — без предоплаты",
              "Точная смета на 40+ позиций за 2 рабочих дня",
              "Фиксируем цену и сроки в договоре — неустойка за каждый день просрочки",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[14px] sm:text-[15px] leading-snug text-ink/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-copper/15">
                  <Check size={12} strokeWidth={3} className="text-copper-deep" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <a href="tel:+74951204060" className="group mt-8 inline-flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-copper-light transition group-hover:bg-copper group-hover:text-ink">
              <PhoneCall size={24} />
            </span>
            <span>
              <span className="block font-display font-extrabold text-2xl tracking-tight text-ink transition group-hover:text-copper">+7 (495) 120-40-60</span>
              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Пн–Сб 9:00–21:00 · Вс по записи</span>
            </span>
          </a>

          <div className="mt-6 space-y-3 text-sm text-muted">
            <p className="inline-flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-copper" />
              <span>
                Москва, Пресненская набережная, 12, стр. 2, офис 804<br />
                <a
                  href="https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9F%D1%80%D0%B5%D1%81%D0%BD%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BD%D0%B0%D0%B1%D0%B5%D1%80%D0%B5%D0%B6%D0%BD%D0%B0%D1%8F%2C%2012"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 font-semibold text-copper-deep transition hover:text-copper"
                >
                  Показать на карте <ArrowRight size={13} />
                </a>
              </span>
            </p>
          </div>

          <div className="mt-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">Быстрее в мессенджере</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <a
                href="https://t.me/+74951204060"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[13px] font-semibold text-ink transition hover:border-copper hover:text-copper"
              >
                <Send size={15} /> Telegram
              </a>
              <a
                href="https://wa.me/74951204060?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D1%81%D0%BC%D0%B5%D1%82%D1%83"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[13px] font-semibold text-ink transition hover:border-copper hover:text-copper"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* right: form card */}
        <Reveal className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative rounded-3xl border border-line bg-white p-6 shadow-[0_35px_80px_-40px_rgba(23,27,30,0.5)] sm:p-8 lg:p-10"
            aria-label="Форма заявки на замер"
          >
            {sent ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-copper/15">
                  <CheckCircle2 size={44} className="text-copper-deep" strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 font-display font-extrabold text-2xl sm:text-3xl text-ink">Заявка отправлена!</h3>
                <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-muted">
                  Инженер <span className="font-semibold text-ink">Архитектоники</span> свяжется с вами в ближайшее рабочее время
                  ({new Date().getDay() === 0 ? "в понедельник" : "сегодня"}), уточнит детали и предложит время замера.
                </p>
                <div className="mt-6 w-full max-w-sm rounded-2xl border border-line bg-paper p-4 text-left">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Ваша заявка</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{name.trim()} · {phone}</p>
                  {comment.trim() && <p className="mt-1.5 text-xs leading-relaxed text-muted line-clamp-3">{comment.trim()}</p>}
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 rounded-full border border-ink/20 px-6 py-3 font-display text-sm font-bold text-ink transition hover:border-copper hover:text-copper"
                >
                  Отправить другую заявку
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-ink">Оставьте контакты — перезвоним в течение часа</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-muted">В рабочее время, Пн–Сб. Данные не передаём третьим лицам.</p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lead-name" className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Ваше имя *</label>
                    <input
                      id="lead-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setTouched(true)}
                      placeholder="Александр"
                      aria-invalid={!!errors.name}
                      className={`mt-2 w-full rounded-xl border bg-paper px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-ink/30 focus:border-copper focus:ring-2 focus:ring-copper/25 ${errors.name ? "border-red-400" : "border-line"}`}
                    />
                    {errors.name && <p role="alert" className="mt-1.5 text-[11px] font-medium text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="lead-phone" className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Телефон *</label>
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
                      className={`mt-2 w-full rounded-xl border bg-paper px-4 py-3.5 font-mono text-[15px] text-ink outline-none transition placeholder:text-ink/30 focus:border-copper focus:ring-2 focus:ring-copper/25 ${errors.phone ? "border-red-400" : "border-line"}`}
                    />
                    {errors.phone && <p role="alert" className="mt-1.5 text-[11px] font-medium text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="lead-comment" className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Комментарий</label>
                  <textarea
                    id="lead-comment"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Например: двушка в новостройке, 54 м², хочу к Новому году…"
                    className="mt-2 w-full resize-y rounded-xl border border-line bg-paper px-4 py-3.5 text-[14px] text-ink outline-none transition placeholder:text-ink/30 focus:border-copper focus:ring-2 focus:ring-copper/25"
                  />
                </div>

                <div className="mt-4">
                  <label className="flex cursor-pointer items-start gap-3 select-none">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-[#C26D3D]"
                      aria-invalid={!!errors.consent}
                    />
                    <span className="text-[12.5px] leading-snug text-muted">
                      Я соглашаюсь с обработкой персональных данных и{" "}
                      <PrivacyPolicy
                        label="политикой конфиденциальности"
                        triggerClassName="font-semibold text-copper-deep underline underline-offset-2 transition hover:text-copper"
                      />
                    </span>
                  </label>
                  {errors.consent && <p role="alert" className="mt-1.5 text-[11px] font-medium text-red-600">{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-copper px-6 py-4 sm:py-5 font-display text-base font-extrabold text-ink transition enabled:hover:bg-copper-deep enabled:hover:text-paper disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Отправляем заявку…
                    </>
                  ) : (
                    <>
                      Получить смету бесплатно
                      <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                  Ниже по воронке: только звонок инженера · никакого спама
                </p>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
