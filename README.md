# АРХИТЕКТОНИКА — ремонт квартир под ключ

Лендинг компании по ремонту квартир в Москве. Чистый фронтенд, без бэкенда:
заявки из формы сохраняются в `localStorage` и имитируют отправку,
калькулятор сметы считает предварительную стоимость мгновенно.

## Скриншоты

Первый экран продакшн-сборки: десктоп (1440 × 900) и мобильная версия (390 × 844).
Нажмите на превью, чтобы открыть полностраничный снимок.

<p>
  <a href="docs/screenshots/desktop-full.webp"><img src="docs/screenshots/desktop-preview.webp" alt="Первый экран на компьютере" width="544"></a>
  <a href="docs/screenshots/mobile-full.webp"><img src="docs/screenshots/mobile-preview.webp" alt="Первый экран на телефоне" width="157"></a>
</p>

[Десктоп целиком](docs/screenshots/desktop-full.webp) · [Мобильная версия целиком](docs/screenshots/mobile-full.webp)

## Стек

React 19 · Vite 7 · Tailwind CSS 4 · lucide-react · vite-plugin-singlefile

## Запуск

```bash
npm ci          # установка зависимостей
npm run dev     # dev-сервер на 0.0.0.0:5173
npm run build   # продакшн-сборка → dist/index.html (всё инлайнено в один файл)
npm run preview # предпросмотр сборки на 0.0.0.0:4173
```

## Структура

- `src/App.tsx` — композиция страницы и связка калькулятор → форма
- `src/components/` — Header, Hero, Services (вкладки), Calculator (интерактивная смета),
  Portfolio (фильтры + лайтбокс), Process, Guarantees, Reviews (автокарусель),
  Faq (аккордеон), LeadForm (маска телефона, валидация), Footer
- `src/assets/` — оптимизированные фотографии интерьеров
