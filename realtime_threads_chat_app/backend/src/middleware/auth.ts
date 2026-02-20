import type { Response, Request, NextFunction } from "express";
import { UnauthorizedError } from "../lib/errors.js";
import { verifyToken } from "../config/jwt.js";

export interface AuthRequest extends Request {
  userId?: number;
  userEmail?: string;
}

export function authMiddleware(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    
    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid or expired token"));
  }
}

export function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const authReq = req as AuthRequest;
  
  if (!authReq.userId) {
    return next(
      new UnauthorizedError("You must be signed in to access this resource")
    );
  }

  return next();
}
