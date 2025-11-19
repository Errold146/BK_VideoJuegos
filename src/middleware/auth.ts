import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export type JwtPayload = { userId: number; email: string };

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) {
        return res.status(401).json({ ok: false, message: "Unauthorized" });
    }
    
    const token = auth.replace("Bearer ", "");
    try {
        const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
        (req as any).user = payload;
        next();
    } catch {
        return res.status(401).json({ ok: false, message: "Invalid token" });
    }
};
