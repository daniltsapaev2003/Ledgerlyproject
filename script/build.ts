/**
 * Этот файл — скрипт сборки проекта, обычно используется для подготовки production-сборки перед публикацией или деплоем приложения.
 *
 * Где используется:
 * - Скрипт запускается вручную или через npm-скрипт (например, "npm run build" или "pnpm build").
 * - Является точкой входа для автоматизированной сборки клиентской и серверной частей fullstack-приложения (frontend + backend).
 * - Используется разработчиками и CI/CD пайплайнами для получения финального артефакта (директории dist/), готового к деплою.
 * 
 * Что делает пошагово:
 * 1. Импортирует необходимые модули:
 *    - esbuild — быстрый бандлер для сборки серверной части Node.js.
 *    - vite — современный инструмент для сборки фронтенда (React/Vue/Svelte и др.).
 *    - rm, readFile из fs/promises — асинхронно управляет файловой системой (удаление, чтение файлов).
 * 2. allowlist — "белый список" npm-пакетов, которые будут включены внутрь bundle серверного кода (esbuild). Все остальные зависимости будут отмечены как "external" и ожидаться во время выполнения из node_modules, что сокращает количество системных вызовов и ускоряет cold start (запуск) на сервере.
 * 3. async function buildAll():
 *    - Удаляет (если есть) папку dist с предыдущими сборками, чтобы не было мусора.
 *    - Запускает сборку клиентской части через vite (viteBuild()), результат попадет в dist/.
 *    - Затем читает package.json, чтобы получить все зависимости (prod и dev).
 *    - Сравнивает зависимости из package.json с allowlist: те, что не попали в allowlist, попадут в external при сборке бэкенда, то есть не будут упакованы в итоговый файл bundle.
 *    - Запускает esbuild для сборки backend (Node.js):
 *       - Входная точка server/index.ts (сервер приложения, Express и т.д.).
 *       - Итоговый файл bundle — dist/index.cjs (CommonJS-модуль для Node.js).
 *       - Минификация, установка переменной окружения NODE_ENV в production.
 *       - За пределами bundle останутся зависимости из external.
 * 4. buildAll().catch: обработка ошибок — если что-то пошло не так, выводит ошибку и завершает процесс с exit code 1.
 *
 * Резюме: этот файл — главный build-скрипт для всего приложения: он собирает фронтенд через Vite и сервер через esbuild, аккуратно управляет зависимостями для оптимальной работы в production и очищает выходную папку перед новой сборкой.
 */

import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";

// Белый список npm-зависимостей для бандла сервера.
// Всё, что не включено сюда — считается external и не попадает в bundle.
// Это позволяет ускорить запуск (cold start) сервера за счёт сокращения
// количества обращений к файловой системе для node_modules.
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

// Главная функция сборки — по шагам описано выше
async function buildAll() {
  // 1. Удаляет папку dist для чистой сборки
  await rm("dist", { recursive: true, force: true });

  // 2. Сборка клиента
  console.log("building client...");
  await viteBuild();

  // 3. Сборка сервера
  console.log("building server...");
  // Чтение package.json и получение всех зависимостей
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  // Вычисление списока external (всё, что вне allowlist)
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  // Сборка backend через esbuild в один bundle
  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

// Запуск всей сборки и обработка ошибок
buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
