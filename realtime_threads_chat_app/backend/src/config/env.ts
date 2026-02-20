import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.string().default("5000"),
  JWT_SECRET: z.string().default("your-secret-key-change-in-production"),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  process.exit(1);
}

export const env = parsed.data;
