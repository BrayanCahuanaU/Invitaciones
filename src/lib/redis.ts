import { Redis } from "@upstash/redis";

// Un solo store de Redis compartido por todas las invitaciones.
// Las claves se namespacean por slug (rsvp:{slug}, songs:{slug}, songmeta:{slug}),
// así que un proyecto/DB alcanza para todos los clientes en paralelo.
let redis: Redis | null = null;

export function getRedis(): Redis {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      throw new Error(
        "Faltan UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN en las variables de entorno"
      );
    }
    redis = new Redis({ url, token });
  }
  return redis;
}
