import Database from "better-sqlite3";
import { env } from "../config/env.js";
import { logger } from "../lib/logger.js";
import path from "path";

const dbPath = path.join(process.cwd(), "database.sqlite");
export const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

export async function query<T = any>(
  text: string,
  params?: unknown[]
): Promise<{ rows: T[] }> {
  try {
    const stmt = db.prepare(text);
    const rows = params ? stmt.all(...params) : stmt.all();
    return { rows: rows as T[] };
  } catch (error) {
    throw error;
  }
}

export async function assertDatabaseConnection() {
  try {
    db.prepare("SELECT 1").get();
    logger.info("Connected to SQLite database");
  } catch (err) {
    throw err;
  }
}
