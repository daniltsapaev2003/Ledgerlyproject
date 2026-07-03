/*
  Этот файл устанавливает подключение к базе данных PostgreSQL и настраивает объект для удобной работы с ORM (drizzle-orm).

  1. Импортируются необходимые модули: 
    - drizzle из drizzle-orm/node-postgres — это ORM, который облегчает работу с PostgreSQL в Node.js.
    - pg — официальный клиент для PostgreSQL на Node.js.
    - * as schema из "@shared/schema" — описание структуры таблиц БД (обновляется при изменении миграций).

  2. Из модуля pg берётся Pool — это менеджер пулов подключений к базе данных.

  3. Проверяется, что переменная окружения DATABASE_URL (URL для подключения к БД) установлена. Если её нет — выбрасывается ошибка.

  4. Экспортируется два объекта:
    - pool — пул подключений к PostgreSQL, который будет использоваться приложением.
    - db — объект drizzle-orm, который оборачивает pool и схемы, чтобы удобно выполнять запросы к БД согласно описанной структуре schema.
*/

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });