import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authMiddleware } from "./middleware/auth.js";
import { apiRouter } from "./routes/index.js";
import { authRouter } from "./routes/auth.routes.js";

export function createApp() {
  const app = express();

  app.use(helmet());

  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:4000"],
      credentials: true,
    })
  );

  app.use(express.json());

  // Serve uploaded files
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // Public auth routes (no auth required)
  app.use("/api/auth", authRouter);

  // Apply auth middleware to all other API routes
  app.use("/api", authMiddleware);

  app.use("/api", apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
