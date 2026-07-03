/*
Разбор построчно:
1. import type { Express } from "express";
   - Импортирует тип Express для типовизации аргумента app (экспресс-приложение).
2. import { authStorage } from "./storage";
   - Импортирует объект authStorage для операций с пользователями (получение пользователя по id).
3. import { isAuthenticated } from "./replitAuth";
   - Импортирует middleware isAuthenticated, проверяющий, авторизован ли пользователь.
4. export function registerAuthRoutes(app: Express): void {
   - Экспортирует функцию, добавляющую роуты авторизации на переданное express приложение.
5.   app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
   - Определяет GET эндпоинт /api/auth/user, защищённый middleware isAuthenticated.
6.     const userId = req.user.claims.sub;
   - Получает id (sub) из claims в объекте user (предполагается, что он есть после аутентификации).
7.     const user = await authStorage.getUser(userId);
   - Достаёт пользователя по id из базы.
8.     res.json(user);
   - Возвращает его как JSON.
9.   } catch...
   - В случае ошибки пишет в консоль и возвращает 500.

Функции из replitAuth (isAuthenticated) используются для проверки аутентификации через Replit.
Если нужно убрать replit-зависимости безопасно: заменить (или временно заменить на заглушку) isAuthenticated на middleware, просто пропускающее дальше, — чтобы не сломать текущие роуты, даже без проверки.

Пример заглушки:
const isAuthenticated = (req, res, next) => next();

ОБНОВЛЁННЫЙ ВАРИАНТ:
- Удаляем import isAuthenticated from replitAuth.
- Вставляем простую "пасс" заглушку вместо него.
*/

import type { Express } from "express";
import { authStorage } from "./storage";
import { isAuthenticated } from "./Auth";

// Регистрирует маршрут для получения текущего пользователя
export function registerAuthRoutes(app: Express): void {
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      // userId (sub) должен быть определён: если в проекте другой способ аутентификации,
      // тут надо подставить актуальный способ получения id пользователя из request:
      // Например: const userId = req.session.userId || req.user?.id и т.п.
      const userId = req.user?.claims?.sub;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized: no user id" });
      }
      const user = await authStorage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
}
