import { Send, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";
import PrivacyPolicy from "./PrivacyPolicy";

const COMPANY = [
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор сметы", href: "#calculator" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Этапы работы", href: "#process" },
];

const CLIENTS = [
  { label: "Гарантия 5 лет", href: "#process" },
  { label: "Рассрочка 0% на 12 мес", href: "#lead" },
  { label: "Вопросы и ответы", href: "#faq" },
  { label: "Оставить заявку", href: "#lead" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-ink text-paper" aria-label="Подвал сайта">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 sm:pt-16 pb-24 lg:pb-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
              Ремонт квартир и домов под ключ в Москве и области с 2011 года. Фиксированная смета в договоре,
              фотоотчёт каждый вечер, гарантия 5 лет.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href="https://t.me/+74951204060"
                target="_blank"
                rel="noreferrer"
                aria-label="Написать в Telegram"
                className="rounded-full border border-paper/15 p-3 text-paper/70 transition hover:border-copper hover:text-copper"
              >
                <Send size={17} />
              </a>
              <a
                href="https://wa.me/74951204060"
                target="_blank"
                rel="noreferrer"
                aria-label="Написать в WhatsApp"
                className="rounded-full border border-paper/15 p-3 text-paper/70 transition hover:border-copper hover:text-copper"
              >
                <MessageCircle size={17} />
              </a>
              <a
                href="mailto:privet@architectonic.ru"
                aria-label="Написать на почту"
                className="rounded-full border border-paper/15 p-3 text-paper/70 transition hover:border-copper hover:text-copper"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          <nav className="lg:col-span-2" aria-label="Компания">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper/45">Компания</p>
            <ul className="mt-3 space-y-2.5">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[13px] text-paper/70 transition hover:text-copper-light">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Клиентам">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper/45">Клиентам</p>
            <ul className="mt-3 space-y-2.5">
              {CLIENTS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[13px] text-paper/70 transition hover:text-copper-light">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper/45">Контакты</p>
            <a href="tel:+74951204060" className="mt-3 flex items-center gap-2 font-display font-extrabold text-xl text-paper transition hover:text-copper-light">
              <Phone size={19} className="text-copper" /> +7 (495) 120-40-60
            </a>
            <a href="mailto:privet@architectonic.ru" className="mt-2 flex items-center gap-2 text-[13px] text-paper/70 transition hover:text-copper-light">
              <Mail size={15} className="text-copper" /> privet@architectonic.ru
            </a>
            <p className="mt-2 flex items-start gap-2 text-[13px] leading-snug text-paper/70">
              <MapPin size={15} className="mt-0.5 shrink-0 text-copper" />
              Москва, Пресненская набережная, 12, стр. 2, офис 804
            </p>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40">Пн–Сб 9:00–21:00 · Вс по записи</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-paper/10 pt-6">
          <p className="text-[11px] leading-relaxed text-paper/45">
            © 2011–2026 ООО «АРХИТЕКТОНИКА» · ИНН 7708456123 · КПП 770801001
          </p>
          <PrivacyPolicy
            label="Политика конфиденциальности"
            triggerClassName="text-[11px] text-paper/55 underline underline-offset-2 transition hover:text-copper-light"
          />
        </div>
      </div>

      {/* watermark */}
      <div aria-hidden="true" className="pointer-events-none select-none border-t border-paper/5 pt-2 overflow-hidden">
        <p className="outline-text whitespace-nowrap text-center font-display font-extrabold leading-none tracking-tight text-[13.5vw] lg:text-[10.5rem]">
          АРХИТЕКТОНИКА
        </p>
      </div>
    </footer>
  );
}
