/**
 * Этот файл предназначен для настройки сессионной аутентификации на сервере Express
 * с использованием PostgreSQL в качестве хранилища сессий. Он содержит две основные части:
 * 
 * 1. Функция getSession() — настраивает middleware express-session так, чтобы сессии 
 *    (например, id пользователя, jwt и другие авторизационные данные) хранились в таблице "sessions"
 *    в базе данных Postgres. Это безопаснее и удобнее, чем хранить сессии в памяти сервера,
 *    особенно если приложение масштабируется.
 *
 *    Как работает:
 *    - sessionTtl определяет, сколько будет жить сессия (1 неделя).
 *    - connect-pg-simple создает хранилище сессий, использующее PostgreSQL.
 *    - Параметры cookie (httpOnly, secure, maxAge) обеспечивают безопасность хранения сессионного идентификатора.
 *    - Для защиты используется секрет (SESSION_SECRET).
 *
 *    Пример использования:
 *      app.use(getSession())
 *    После этого в req.session можно сохранять/получать пользовательские данные в сессии.
 * 
 * 2. Middleware isAuthenticated — проверяет, авторизован ли пользователь:
 *    - Сначала, если установлен метод req.isAuthenticated (например, при использовании passport.js) и он говорит YES — пользователь авторизован.
 *    - Если в req.session есть поле user — тоже пропускаем дальше.
 *    - Иначе возвращаем ошибку 401 (Unauthorized).
 * 
 *    Пример использования:
 *      app.get('/private', isAuthenticated, (req, res) => {...})
 *    Таким образом приватные маршруты будут доступны только авторизованным.
 */

import session from "express-session";
import connectPg from "connect-pg-simple";
import type { RequestHandler } from "express";

// Настраивает сессионный middleware для Express, с хранением сессий в PostgreSQL
export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 неделя
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
    },
  });
}

// Middleware для проверки аутентификации пользователя
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  if ((req.session as any)?.user) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};
