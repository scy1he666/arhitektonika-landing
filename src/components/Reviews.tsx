import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

const REVIEWS = [
  {
    text: "Смета не изменилась ни на копейку, хотя мы поменяли плитку в процессе. Пересчитали отдельной строкой и только после моего «ок». Прораб всегда на месте, фото каждый вечер.",
    author: "Анна Ковалёва",
    meta: "ЖК «Селигер Сити», капитальный ремонт, 8 недель",
  },
  {
    text: "Жили в другой стране и делали ремонт дистанционно. Каждый вечер фото, раз в две недели видеозвонок с объекта. Ключи получили в день, который стоял в договоре.",
    author: "Игорь и Марина Дементьевы",
    meta: "Замоскворечье, дизайнерский ремонт, 12 недель",
  },
  {
    text: "Взяли рассрочку 0% на 12 месяцев, два документа, одобрение за день. Перепланировку согласовали за нас: снесли кладовку, узаконили расширенную кухню-гостиную.",
    author: "Дмитрий Орлов",
    meta: "ЖК «Фили Град», капитальный ремонт и согласование",
  },
  {
    text: "Косметический ремонт студии за 3 недели: покрасили, положили кварц-винил, поменяли сантехнику. Мусора было так мало, что контейнер на улицу не понадобился.",
    author: "Светлана Рашидова",
    meta: "Новая Москва, косметический ремонт, 3 недели",
  },
  {
    text: "Делали пентхаус под сдачу, команда работала в две смены и уложилась в 14 недель. Умный дом, парящие потолки, скрытые карнизы собраны идеально. Это второй объект с ними.",
    author: "Роман Гельфанд",
    meta: "Москва-Сити, дизайнерский ремонт, 184 м²",
  },
  {
    text: "Дом за городом, 200 м², отопление и электрика с нуля. Через год приехали на чек-ап: нашли и бесплатно устранили два мелких замечания.",
    author: "Елена Тихонова",
    meta: "Истринский район, дизайнерский ремонт дома",
  },
];

const RATINGS = [
  { source: "Яндекс Карты", value: "4,9" },
  { source: "2ГИС", value: "5,0" },
  { source: "Отзовик", value: "4,8" },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const count = REVIEWS.length;
  const review = REVIEWS[index];

  useEffect(() => {
    setIndex((i) => (i >= count ? 0 : i));
  }, [count]);

  return (
    <section id="reviews" className="scroll-mt-24 border-t border-line py-20 lg:py-28" aria-label="Отзывы клиентов">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="max-w-[30rem] text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-ink sm:text-[34px]">
          Отзывы с актами сдачи
        </h2>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-baseline gap-3">
              <p className="text-[40px] font-medium leading-none tabular-nums text-ink">4,9</p>
              <p className="text-[14px] text-secondary">из 5, 1 284 оценки</p>
            </div>
            <dl className="mt-6 border-t border-line">
              {RATINGS.map((r) => (
                <div key={r.source} className="flex items-baseline justify-between gap-4 border-b border-line py-2.5">
                  <dt className="text-[13px] text-secondary">{r.source}</dt>
                  <dd className="text-[13px] tabular-nums text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 max-w-[16rem] text-[13px] leading-[18px] text-muted">
              Все отзывы оставляют клиенты после подписания акта сдачи.
            </p>
          </div>

          <Reveal className="lg:col-span-8">
            <figure className="flex h-full flex-col rounded-2xl bg-surface p-6 sm:p-8">
              <blockquote key={index} className="review-enter flex-1">
                <p className="text-[18px] leading-[28px] text-ink sm:text-[20px] sm:leading-[30px]">«{review.text}»</p>
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
                <div>
                  <p className="text-[15px] font-medium text-ink">{review.author}</p>
                  <p className="mt-0.5 text-[13px] text-muted">{review.meta}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="mr-1 text-[13px] tabular-nums text-muted">
                    {index + 1} / {count}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i - 1 + count) % count)}
                    aria-label="Предыдущий отзыв"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors duration-150 hover:border-ink/25"
                  >
                    <ChevronLeft size={17} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i + 1) % count)}
                    aria-label="Следующий отзыв"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors duration-150 hover:border-ink/25"
                  >
                    <ChevronRight size={17} strokeWidth={1.5} />
                  </button>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
