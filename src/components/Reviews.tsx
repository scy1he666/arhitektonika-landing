import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, BadgeCheck } from "lucide-react";
import Reveal from "./Reveal";

const REVIEWS = [
  {
    text: "Смета не изменилась ни на копейку, хотя мы поменяли плитку в процессе — пересчитали отдельной строкой, и только после моего «ок». Прораб всегда на месте, фото каждый вечер. Лучший сервисный опыт в нашей жизни.",
    author: "Анна Ковалёва",
    meta: "ЖК «Селигер Сити» · капитальный ремонт · 8 недель",
  },
  {
    text: "Жили в другой стране и делали ремонт дистанционно. Каждый вечер — фото, раз в две недели — видеозвонок с объекта. Ключи получили в день, который стоял в договоре. Грамотно, чисто, без предоплаты.",
    author: "Игорь и Марина Дементьевы",
    meta: "Замоскворечье · дизайнерский ремонт · 12 недель",
  },
  {
    text: "Взяли в рассрочку 0% на 12 месяцев — два документа, одобрение за день. Сделали перепланировку: снесли кладовку, узаконили расширенную кухню-гостиную. Согласование взяли полностью на себя.",
    author: "Дмитрий Орлов",
    meta: "ЖК «Фили Град» · капитальный ремонт + согласование",
  },
  {
    text: "Косметический ремонт студии за 3 недели: красили, стелили кварц-винил, меняли сантехнику. Мусора было так мало, что даже не понадобился контейнер на улицу. Съехали с съёмной квартиры в чистоту.",
    author: "Светлана Рашидова",
    meta: "Новая Москва · косметический ремонт · 3 недели",
  },
  {
    text: "Делали пентхаус под сдачу. Команда работала в две смены, уложились в 14 недель. Умный дом, парящие потолки, скрытые карнизы — всё собрано идеально. Уже второй объект с ними.",
    author: "Роман Гельфанд",
    meta: "Москва-Сити · дизайнерский ремонт · 184 м²",
  },
  {
    text: "Дом за городом, 200 м², отопление и электрика с нуля. Зимой приехали на Новый год — тепло, тихо, работает как швейцарские часы. Через год заезжали на чек-ап: нашли и бесплатно устранили два мелких момента.",
    author: "Елена Тихонова",
    meta: "Истринский район · дизайнерский ремонт дома",
  },
];

const AUTOPLAY_MS = 6500;

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = REVIEWS.length;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const review = REVIEWS[index];

  return (
    <section id="reviews" className="border-t border-line py-16 sm:py-24 scroll-mt-24" aria-label="Отзывы клиентов">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-copper-deep">06 — Отзывы</p>

        <div className="mt-6 grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* summary column */}
          <div className="lg:col-span-4">
            <h2 className="font-display font-extrabold tracking-[-0.02em] text-ink text-4xl sm:text-5xl leading-[1.05]">
              Говорят <em className="font-serif italic font-medium text-copper">клиенты</em>
            </h2>
            <Reveal className="mt-8">
              <div className="rounded-3xl border border-line bg-white p-6 sm:p-7">
                <div className="flex items-end gap-4">
                  <span className="font-display font-extrabold text-7xl leading-none text-ink">4.9</span>
                  <div className="pb-1.5">
                    <div className="flex gap-0.5" aria-label="Рейтинг 4.9 из 5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={20} className="fill-copper text-copper" />
                      ))}
                    </div>
                    <p className="mt-1.5 text-xs font-semibold text-ink">1 284 оценки</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Яндекс Карты · 4.9", "2ГИС · 5.0", "Отзовик · 4.8"].map((chip) => (
                    <span key={chip} className="rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/75">
                      {chip}
                    </span>
                  ))}
                </div>
                <p className="mt-5 border-t border-line pt-4 inline-flex items-center gap-2 text-[11px] text-muted">
                  <BadgeCheck size={14} className="text-copper" />
                  Все отзывы — от реальных клиентов с актами сдачи
                </p>
              </div>
            </Reveal>
          </div>

          {/* carousel column */}
          <div
            className="lg:col-span-8 flex flex-col"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative flex-1 rounded-3xl border border-line bg-ink p-6 sm:p-10 text-paper flex flex-col justify-between overflow-hidden">
              <Quote aria-hidden="true" size={110} strokeWidth={1} className="absolute -top-4 -left-3 text-copper/15" />
              <blockquote key={index} className="review-enter relative">
                <p className="font-serif italic text-[19px] sm:text-2xl leading-[1.35] text-paper/95">
                  «{review.text}»
                </p>
                <footer className="mt-6">
                  <p className="font-display font-extrabold text-base sm:text-lg text-paper">{review.author}</p>
                  <p className="mt-1 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] text-paper/50">{review.meta}</p>
                </footer>
              </blockquote>

              <div className="relative mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i - 1 + count) % count)}
                    aria-label="Предыдущий отзыв"
                    className="rounded-full border border-paper/20 p-2.5 text-paper/80 transition hover:border-copper hover:text-copper"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i + 1) % count)}
                    aria-label="Следующий отзыв"
                    className="rounded-full border border-paper/20 p-2.5 text-paper/80 transition hover:border-copper hover:text-copper"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-paper/50">
                  {String(index + 1).padStart(2, "0")} <span className="text-copper">/</span> {String(count).padStart(2, "0")}
                </p>
              </div>
            </div>

            {/* dots */}
            <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Выбор отзыва">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Отзыв ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-400 ${i === index ? "w-8 bg-copper" : "w-2.5 bg-ink/20 hover:bg-ink/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
