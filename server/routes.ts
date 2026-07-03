import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, hashPassword } from "./auth";
import passport from "passport";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  app.post(api.auth.register.path, async (req, res, next) => {
    try {
      const input = api.auth.register.input.parse(req.body);
      const existingUser = await storage.getUserByEmail(input.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists", field: "email" });
      }

      const hashedPassword = await hashPassword(input.password);
      const user = await storage.createUser({ ...input, password: hashedPassword });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      next(err);
    }
  });

  app.post(api.auth.login.path, (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info?.message || "Incorrect email or password" });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(200).json(user);
      });
    })(req, res, next);
  });

  app.post(api.auth.logout.path, (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get(api.auth.user.path, (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.status(200).json(req.user);
  });

  app.get("/api/companies", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    const companies = await storage.getCompanies();
    res.json(companies);
  });

  app.get("/api/companies/:ticker", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    const company = await storage.getCompanyByTicker(req.params.ticker);
    if (!company) return res.status(404).send("Company not found");
    
    const details = await storage.getCompanyDetails(company.id);
    res.json({
      company,
      ratios: details.ratios,
      forecasts: details.forecasts
    });
  });

  app.get("/api/trades", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    const user = req.user as any;
    const tradesList = await storage.getTrades(user.id);
    res.json(tradesList);
  });

  app.post("/api/trades", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    const user = req.user as any;
    const trade = await storage.createTrade({ ...req.body, userId: user.id });
    res.status(201).json(trade);
  });

  app.patch("/api/trades/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    const trade = await storage.updateTrade(Number(req.params.id), req.body);
    res.json(trade);
  });

  app.delete("/api/trades/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    await storage.deleteTrade(Number(req.params.id));
    res.sendStatus(204);
  });

  app.get("/api/tinkoff/shares", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const { getAllRussianShares } = await import("./tinkoff");
      const shares = await getAllRussianShares();
      res.json(shares);
    } catch (err: any) {
      console.error("Tinkoff shares error:", err.message);
      res.status(500).json({ message: err.message });
    }
  });

  app.get("/api/prices", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    const tickers = String(req.query.tickers || "").split(",").filter(Boolean);
    if (tickers.length === 0) return res.json({});
    try {
      const { getMultipleStockPrices } = await import("./tinkoff");
      const prices = await getMultipleStockPrices(tickers);
      res.json(prices);
    } catch (err: any) {
      console.error("Tinkoff API error:", err.message);
      res.status(500).json({ message: err.message });
    }
  });

  return httpServer;
}
