import { z } from 'zod';
import { insertUserSchema, users } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

/**
 * Объект api описывает структуру аутентификационных API-эндпоинтов.
 *
 * Каждый эндпоинт описывается объектом с информацией:
 * - method: HTTP-метод (например, 'POST', 'GET') для осуществления запроса.
 * - path: путь эндпоинта (например, '/api/register').
 * - input: входные данные, которые ожидает этот эндпоинт (например, схема для регистрации пользователя).
 * - responses: возможные ответы от сервера, где:
 *   - Ключ — HTTP-статус ответа (например, 201, 400 и т.д.).
 *   - Значение — схема (zod-схема) ожидаемых данных для этого ответа.
 *
 * auth содержит:
 * - register: эндпоинт для регистрации пользователя.
 * - login: эндпоинт для логина пользователя.
 * - logout: эндпоинт для выхода пользователя.
 * - user: эндпоинт для получения информации о текущем пользователе.
 *
 * Это определение удобно для валидации входных/выходных данных и автогенерации клиентского кода.
 */
export const api = {
  auth: {
    register: {
      method: 'POST' as const,
      path: '/api/register' as const,
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(), // успешная регистрация, возвращает пользователя
        400: errorSchemas.validation,               // ошибка валидации данных
      },
    },
    login: {
      method: 'POST' as const,
      path: '/api/login' as const,
      input: insertUserSchema,
      responses: {
        200: z.custom<typeof users.$inferSelect>(), // успешная аутентификация, возвращает пользователя
        401: errorSchemas.unauthorized,            // неавторизован (неправильные данные)
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout' as const,
      responses: {
        200: z.void(), // успешный выход, тело пустое
      },
    },
    user: {
      method: 'GET' as const,
      path: '/api/user' as const,
      responses: {
        200: z.custom<typeof users.$inferSelect>(), // возвращает информацию о текущем пользователе
        401: errorSchemas.unauthorized,            // если пользователь не авторизован
      },
    }
  }
};

/**
 * buildUrl — функция для построения URL пути с подстановкой параметров.
 *
 * Как она работает:
 * - На вход принимает путь (например, '/user/:id') и объект параметров (например, {id: 42}).
 * - Если параметры переданы:
 *   - Перебирает каждую пару ключ-значение.
 *   - Проверяет, есть ли в пути плейсхолдер, например :id.
 *   - Если есть, заменяет :id на переданное значение (например, '42').
 * - Возвращает итоговый путь, где все плейсхолдеры заменены на значения из params.
 *
 * Пример:
 *   buildUrl('/user/:id/profile', {id: 42}) -> '/user/42/profile'
 */
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  // url начинается как исходный путь, например "/user/:id"
  let url = path;

  // Если передан объект параметров
  if (params) {
    // Перебрать все пары ключ-значение из params, например {id: 42}
    Object.entries(params).forEach(([key, value]) => {
      // Проверить, есть ли плейсхолдер типа :key в url
      if (url.includes(`:${key}`)) {
        // Заменить первый найденный плейсхолдер :key на строковое значение
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  // Вернуть итоговый url с подставленными значениями
  return url;
}
