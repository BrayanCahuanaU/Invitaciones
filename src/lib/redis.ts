import { Redis } from "@upstash/redis";

// Soporta tanto Upstash directo como Vercel KV (que usa Upstash por debajo).
// Vercel KV expone: KV_REST_API_URL / KV_REST_API_TOKEN
// Upstash directo:  UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
let redis: Redis | null = null;

export function getRedis(): Redis {
  if (!redis) {
    const url =
      process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
    const token =
      process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      throw new Error(
        "Faltan variables de entorno de Redis/KV. Configura KV_REST_API_URL y KV_REST_API_TOKEN en Vercel."
      );
    }
    redis = new Redis({ url, token });
  }
  return redis;
}
