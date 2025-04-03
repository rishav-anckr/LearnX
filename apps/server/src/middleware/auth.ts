import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { UserRole } from "../models/User";

interface JwtPayload {
  id: number;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecret"
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!roles.includes(req.user.role as UserRole)) {
      return res.status(403).json({
        message: `Role ${req.user.role} is not authorized to access this route`,
      });
    }

    next();
  };
};
