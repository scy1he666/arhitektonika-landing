import { Send, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";
import PrivacyPolicy from "./PrivacyPolicy";

const COMPANY = [
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор сметы", href: "#calculator" },
  { label: "Проекты", href: "#portfolio" },
  { label: "Этапы работы", href: "#process" },
];

const CLIENTS = [
  { label: "Гарантия 5 лет", href: "#process" },
  { label: "Рассрочка 0% на 12 месяцев", href: "#lead" },
  { label: "Частые вопросы", href: "#faq" },
  { label: "Оставить заявку", href: "#lead" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-sunk" aria-label="Подвал сайта">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:pb-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-[18rem] text-[14px] leading-[22px] text-secondary">
              Ремонт квартир и домов под ключ в Москве и области с 2011 года. Смета в договоре, фотоотчёт каждый вечер,
              гарантия 5 лет.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href="https://t.me/+74951204060"
                target="_blank"
                rel="noreferrer"
                aria-label="Написать в Telegram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-secondary transition-colors duration-150 hover:border-ink/25 hover:text-ink"
              >
                <Send size={16} strokeWidth={1.5} />
              </a>
              <a
                href="https://wa.me/74951204060"
                target="_blank"
                rel="noreferrer"
                aria-label="Написать в WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-secondary transition-colors duration-150 hover:border-ink/25 hover:text-ink"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:privet@architectonic.ru"
                aria-label="Написать на почту"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-secondary transition-colors duration-150 hover:border-ink/25 hover:text-ink"
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <nav className="lg:col-span-2" aria-label="Компания">
            <p className="text-[12px] text-muted">Компания</p>
            <ul className="mt-3 space-y-2">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14px] text-secondary transition-colors duration-150 hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Клиентам">
            <p className="text-[12px] text-muted">Клиентам</p>
            <ul className="mt-3 space-y-2">
              {CLIENTS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14px] text-secondary transition-colors duration-150 hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-[12px] text-muted">Контакты</p>
            <a
              href="tel:+74951204060"
              className="mt-3 flex items-center gap-2 text-[16px] font-medium tabular-nums text-ink transition-colors duration-150 hover:text-copper"
            >
              <Phone size={16} strokeWidth={1.5} className="text-copper" aria-hidden="true" />
              +7 (495) 120-40-60
            </a>
            <a
              href="mailto:privet@architectonic.ru"
              className="mt-2 flex items-center gap-2 text-[14px] text-secondary transition-colors duration-150 hover:text-ink"
            >
              <Mail size={16} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
              privet@architectonic.ru
            </a>
            <p className="mt-2 flex items-start gap-2 text-[14px] leading-[20px] text-secondary">
              <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
              Москва, Пресненская набережная, 12, стр. 2, офис 804
            </p>
            <p className="mt-4 text-[13px] text-muted">Пн–Сб, 9:00–21:00, Вс по записи</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] leading-[18px] text-muted">
            © 2011–2026 ООО «АРХИТЕКТОНИКА», ИНН 7708456123, КПП 770801001
          </p>
          <PrivacyPolicy
            label="Политика конфиденциальности"
            triggerClassName="text-left text-[12px] text-secondary underline underline-offset-2 transition-colors duration-150 hover:text-ink"
          />
        </div>
      </div>
    </footer>
  );
}
