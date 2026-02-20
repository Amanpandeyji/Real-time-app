import { Router } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt.js";
import { query, db } from "../db/db.js";
import { BadRequestError } from "../lib/errors.js";

export const authRouter = Router();

// Register
authRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password, displayName, handle } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    // Check if user exists
    const existing = await query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.rows.length > 0) {
      throw new BadRequestError("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (SQLite uses datetime('now') instead of NOW())
    const stmt = db.prepare(
      `INSERT INTO users (email, password, display_name, handle, created_at, updated_at) 
       VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`
    );
    
    const result = stmt.run(email, hashedPassword, displayName || null, handle || null);
    const userId = result.lastInsertRowid;

    // Generate token
    const token = generateToken({ userId: Number(userId), email });

    res.status(201).json({
      token,
      user: {
        id: userId,
        email,
        displayName,
        handle,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Login
authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    // Find user
    const result = await query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (result.rows.length === 0) {
      throw new BadRequestError("Invalid credentials");
    }

    const user = result.rows[0] as any;

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new BadRequestError("Invalid credentials");
    }

    // Generate token
    const token = generateToken({ userId: user.id, email: user.email });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        handle: user.handle,
        avatarUrl: user.avatar_url,
        bio: user.bio,
      },
    });
  } catch (error) {
    next(error);
  }
});