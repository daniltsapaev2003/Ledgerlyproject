import { users, companies, keyRatios, analystForecasts, trades, type User, type InsertUser, type Company, type KeyRatios, type Forecast, type Trade, type InsertTrade } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCompanies(): Promise<Company[]>;
  getCompanyByTicker(ticker: string): Promise<Company | undefined>;
  getCompanyDetails(companyId: number): Promise<{ ratios: KeyRatios | undefined; forecasts: Forecast[] }>;
  getTrades(userId: number): Promise<Trade[]>;
  createTrade(trade: InsertTrade): Promise<Trade>;
  updateTrade(id: number, trade: Partial<InsertTrade>): Promise<Trade>;
  deleteTrade(id: number): Promise<void>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getCompanies(): Promise<Company[]> {
    return await db.select().from(companies);
  }

  async getCompanyByTicker(ticker: string): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.ticker, ticker));
    return company;
  }

  async getCompanyDetails(companyId: number): Promise<{ ratios: KeyRatios | undefined; forecasts: Forecast[] }> {
    const [ratios] = await db.select().from(keyRatios).where(eq(keyRatios.companyId, companyId));
    const forecasts = await db.select().from(analystForecasts).where(eq(analystForecasts.companyId, companyId));
    return { ratios, forecasts };
  }

  async getTrades(userId: number): Promise<Trade[]> {
    return await db.select().from(trades).where(eq(trades.userId, userId));
  }

  async createTrade(trade: InsertTrade): Promise<Trade> {
    const [created] = await db.insert(trades).values(trade).returning();
    return created;
  }

  async updateTrade(id: number, trade: Partial<InsertTrade>): Promise<Trade> {
    const [updated] = await db.update(trades).set(trade).where(eq(trades.id, id)).returning();
    return updated;
  }

  async deleteTrade(id: number): Promise<void> {
    await db.delete(trades).where(eq(trades.id, id));
  }
}

export const storage = new DatabaseStorage();
