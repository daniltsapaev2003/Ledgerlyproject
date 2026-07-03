/**
 * Этот файл задаёт структуру и схемы основных сущностей для проекта:
 * пользователей, компаний, ключевых финансовых коэффициентов, аналитических прогнозов и сделок (trades) с помощью библиотеки drizzle-orm.
 *
 * Где используется:
 * - Эти сущности и схемы используются по всему проекту для работы с БД (PostgreSQL).
 * - Валидационные схемы (созданные через createInsertSchema и zod) применяются для проверки данных на входе в API, а также для автогенерации типов.
 * - В частности, insertUserSchema используется в shared/routes.ts для описания входных данных API регистрации и логина.
 * - Типы вроде Trade, User, Company и др. помогают типизировать работу с БД и API в TypeScript-коде.
 */

import { pgTable, text, serial, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Описание таблицы пользователей.
// Хранит email, пароль, имя, фамилию, номер телефона.
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
});

// Описание таблицы компаний для справочника акций.
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  ticker: text("ticker").notNull().unique(),   // тикер (уникальный)
  name: text("name").notNull(),                // имя компании
  description: text("description").notNull(),  // описание
  sector: text("sector").notNull(),            // сектор рынка
  logoColor: text("logo_color").notNull(),
  logoUrl: text("logo_url"),
});

// Описание таблицы с ключевыми финансовыми коэффициентами по компаниям.
export const keyRatios = pgTable("key_ratios", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => companies.id).notNull(),
  payoutRatio: text("payout_ratio"),
  dividendYield: text("dividend_yield"),
  avgDivYield: text("avg_div_yield"),
  roa: text("roa"),
  roe: text("roe"),
  netDebtEbitda: text("net_debt_ebitda"),
  netDebtCapital: text("net_debt_capital"),
  evEbitda: text("ev_ebitda"),
  ps: text("ps"),
  pe: text("pe"),
  pbv: text("pbv"),
  revenueGrowth: text("revenue_growth"),
  ebitdaGrowth: text("ebitda_growth"),
  netProfitGrowth: text("net_profit_growth"),
});

// Таблица с прогнозами аналитиков по акциям (например, целевая цена, рекомендация).
export const analystForecasts = pgTable("analyst_forecasts", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => companies.id).notNull(),
  analystName: text("analyst_name").notNull(),
  recommendation: text("recommendation").notNull(), // BUY, HOLD, SELL
  targetPrice: text("target_price").notNull(),
});

// Таблица сделок пользователя (trade history).
export const trades = pgTable("trades", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  date: text("date").notNull(),
  company: text("company").notNull(),
  ticker: text("ticker").notNull(),
  type: text("type").notNull(),
  buyPrice: numeric("buy_price").notNull(),
  sellPrice: numeric("sell_price"),
  quantity: integer("quantity").notNull(),
  currentPrice: numeric("current_price"),
  comment: text("comment"),
  status: text("status").notNull().default("open"), // статус сделки
  sector: text("sector"),
  takeProfit: numeric("take_profit"),
  stopLoss: numeric("stop_loss"),
});

// Схемы для валидации и автотипизации данных при вставке (insert) в таблицы.
// Они используются для проверки тела запросов к API, например, при создании пользователя или сделки.
export const insertTradeSchema = createInsertSchema(trades).omit({ id: true });
export type Trade = typeof trades.$inferSelect;
export type InsertTrade = z.infer<typeof insertTradeSchema>;

export const insertCompanySchema = createInsertSchema(companies);
export const insertKeyRatiosSchema = createInsertSchema(keyRatios);
export const insertForecastSchema = createInsertSchema(analystForecasts);

// Схема регистрации/логина пользователя — используется в shared/routes.ts как input схемы эндпоинтов API.
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  phoneNumber: true,
});

// Экспорт типов для работы с данными в коде (отражают строки таблиц).
export type Company = typeof companies.$inferSelect;
export type KeyRatios = typeof keyRatios.$inferSelect;
export type Forecast = typeof analystForecasts.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
