-- Этот SQL-миграционный скрипт создает четыре основные таблицы для базы данных приложения, которое связано с компаниями, финансовыми коэффициентами и прогнозами аналитиков.
-- Скрипт будет выполнен через миграционную систему (например, Drizzle, Knex, или напрямую в PostgreSQL), чтобы описать структуру данных на стороне сервера.
-- Таблицы используются серверной логикой для хранения, чтения и связи сущностей приложения (например, API-сервис читает и пишет в эти таблицы; клиентское приложение — через backend).

-- 1. Таблица "analyst_forecasts"
-- Хранит прогнозы и рекомендации аналитиков по компаниям.
CREATE TABLE "analyst_forecasts" (
	"id" serial PRIMARY KEY NOT NULL,  -- Уникальный идентификатор прогноза
	"company_id" integer NOT NULL,     -- Внешний ключ к компании
	"analyst_name" text NOT NULL,      -- Имя аналитика
	"recommendation" text NOT NULL,    -- Рекомендация (например, "Покупать", "Держать")
	"target_price" text NOT NULL       -- Целевая цена
);

--> statement-breakpoint

-- 2. Таблица "companies"
-- Справочник компаний, по которым идет аналитика.
CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,  -- Уникальный ID компании
	"ticker" text NOT NULL,            -- Биржевой тикер (уникальный)
	"name" text NOT NULL,              -- Название компании
	"description" text NOT NULL,       -- Описание компании
	"sector" text NOT NULL,            -- Сектор экономики
	"logo_color" text NOT NULL,        -- Цвет логотипа (например, hex-код)
	"logo_url" text,                   -- URL на логотип
	CONSTRAINT "companies_ticker_unique" UNIQUE("ticker") -- Ограничение уникальности тикера
);

--> statement-breakpoint

-- 3. Таблица "key_ratios"
-- Ключевые финансовые коэффициенты по компаниям для анализа и сравнения.
CREATE TABLE "key_ratios" (
	"id" serial PRIMARY KEY NOT NULL,        -- Уникальный идентификатор
	"company_id" integer NOT NULL,           -- Внешний ключ к компании
	"payout_ratio" text,                     -- Доля выплаты дивидендов
	"dividend_yield" text,                   -- Дивидендная доходность
	"avg_div_yield" text,                    -- Средняя дивидендная доходность
	"roa" text,                              -- Return on Assets
	"roe" text,                              -- Return on Equity
	"net_debt_ebitda" text,                  -- Соотношение чистый долг/EBITDA
	"net_debt_capital" text,                 -- Чистый долг/капитал
	"ev_ebitda" text,                        -- EV/EBITDA
	"ps" text,                               -- Price/Sales
	"pe" text,                               -- Price/Earnings
	"pbv" text,                              -- Price/Book Value
	"revenue_growth" text,                   -- Рост выручки
	"ebitda_growth" text,                    -- Рост EBITDA
	"net_profit_growth" text                 -- Рост чистой прибыли
);

--> statement-breakpoint

-- 4. Таблица "users"
-- Пользователи системы (например, для авторизации в приложении).
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,    -- Уникальный идентификатор пользователя
	"email" text NOT NULL,               -- Email (уникальный, для логина)
	"password" text NOT NULL,            -- Пароль (захеширован, для аутентификации)
	"first_name" text NOT NULL,          -- Имя пользователя
	"last_name" text NOT NULL,           -- Фамилия пользователя
	"phone_number" text NOT NULL,        -- Телефон пользователя
	CONSTRAINT "users_email_unique" UNIQUE("email") -- Ограничение уникальности email
);

--> statement-breakpoint

-- 5. Внешние ключи для связей между таблицами
-- Связывают аналитику и коэффициенты с конкретными компаниями.
ALTER TABLE "analyst_forecasts" ADD CONSTRAINT "analyst_forecasts_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "key_ratios" ADD CONSTRAINT "key_ratios_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;

-- ВКРАТЦЕ ГДЕ ИСПОЛЬЗУЕТСЯ:
-- - Эти таблицы участвуют в серверной логике — через ORM или SQL-запросы REST/GraphQL API на стороне Node.js.
-- - "companies", "analyst_forecasts" и "key_ratios" — это базы для формирования финансовых витрин, отчетов и аналитики для пользователей.
-- - "users" используется для регистрации, аутентификации и авторизации пользователей приложения.