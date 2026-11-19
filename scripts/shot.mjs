#!/usr/bin/env node
/**
 * Снимки сайта для README и превью.
 *
 * Нужен Playwright с Chromium (один раз):
 *   npm i -D playwright
 *   npx playwright install chromium
 *
 * Запуск (сайт уже должен быть запущен):
 *   npm run shots                 # dev-сервер на 5173
 *   npm run shots -- http://localhost:4173/    # сборка из vite preview
 *
 * Что делает: десктоп 1440×900 и мобильный 390×844, первый экран и полная страница,
 * складывает в docs/screenshots/*.webp (через ImageMagick, если он есть, иначе *.png).
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";
import path from "node:path";

const url = process.argv[2] ?? "http://localhost:5173/";
const outDir = path.resolve("docs/screenshots");

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "Playwright не установлен. Один раз выполните:\n  npm i -D playwright\n  npx playwright install chromium"
  );
  process.exit(1);
}

const hasImageMagick = (() => {
  try {
    execFileSync("magick", ["-version"], { stdio: "ignore" });
    return "magick";
  } catch {
    try {
      execFileSync("convert", ["-version"], { stdio: "ignore" });
      return "convert";
    } catch {
      return null;
    }
  }
})();

const toWebp = (file) => {
  if (!hasImageMagick) return file;
  const webp = file.replace(/\.png$/, ".webp");
  execFileSync(hasImageMagick, [file, "-quality", "82", webp]);
  rmSync(file);
  return webp;
};

mkdirSync(outDir, { recursive: true });
for (const f of readdirSync(outDir)) if (/\.(png|webp)$/.test(f)) rmSync(path.join(outDir, f), { force: true });

const browser = await chromium.launch();

const shoot = async ({ name, width, height, mobile }) => {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: mobile ? 2 : 1 });
  await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });
  // прогоняем страницу, чтобы сработали появления по скроллу, и возвращаемся наверх
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });

  const preview = path.join(outDir, `${name}-preview.png`);
  const full = path.join(outDir, `${name}-full.png`);
  await page.screenshot({ path: preview });
  await page.screenshot({ path: full, fullPage: true });
  await page.close();
  console.log("saved", path.basename(toWebp(preview)), path.basename(toWebp(full)));
};

await shoot({ name: "desktop", width: 1440, height: 900, mobile: false });
await shoot({ name: "mobile", width: 390, height: 844, mobile: true });

await browser.close();
if (!existsSync(outDir)) process.exit(1);
console.log("готово:", outDir);
