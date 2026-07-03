/*
Построчный разбор:
1. import { users, type User, type UpsertUser } from "@shared/models/auth";
   - Импортируются таблица users, типы User и UpsertUser из общего слоя моделей (для работы с пользователями и типизацией).
2. import { db } from "../../db";
   - Импортирует объект db для работы с базой данных через Drizzle ORM.
3. import { eq } from "drizzle-orm";
   - Импортируется функция eq для построения where-условий в запросах Drizzle.

5-9. // Interface for auth storage operations
      // (IMPORTANT) These user operations are mandatory for Replit Auth.
   - Описан интерфейс IAuthStorage с двумя методами:
     - getUser(id): возвращает промис с объектом User или undefined;
     - upsertUser(user): добавляет или обновляет пользователя, возвращает промис с User.

10-27. class AuthStorage implements IAuthStorage {...}
   - Класс имплементирует интерфейс хранения пользователей:
     - getUser(id): выбирает пользователя по id из таблицы users, возвращает первого найденного (или undefined).
     - upsertUser(userData): вставляет пользователя userData (или обновляет по конфликту id); поле updatedAt обязательно обновляется; возвращает пользователя из базы.

29. export const authStorage = new AuthStorage();
   - Экспортирует экземпляр класса AuthStorage как authStorage для использования в других модулях.

В этом файле НЕТ специфичных функций Replit — только слой работы с хранилищем пользователей (storage).
Если проект ранее был завязан на Replit-авторизацию, эти методы — универсальны и не зависят от Replit, так что ничего убирать не нужно.
*/

// Код ниже — универсальный слой стореджа пользователей, безопасно использовать вне зависимости от Replit:

import { users, type User, type UpsertUser } from "@shared/models/auth";
import { db } from "../../db";
import { eq } from "drizzle-orm";

// Интерфейс для операций с пользователями (универсальный, не привязан к Replit)
export interface IAuthStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
}

class AuthStorage implements IAuthStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
}

export const authStorage = new AuthStorage();
