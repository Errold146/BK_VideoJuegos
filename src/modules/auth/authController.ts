import type { Request, Response } from "express";
import { register, login } from "./authService";
import { apiOk, apiError } from "../../utils/api";

export const postRegister = async (req: Request, res: Response) => {
    
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json(apiError("VALIDATION", null, "Email and password required"));
    }

    try {
        const user = await register(email, password);
        res.status(201).json(apiOk({ id: user.id, email: user.email }, "User registered"));

    } catch (e: any) {
        const isUnique = e?.code === "P2002";
        res.status(isUnique ? 409 : 500)
            .json(apiError(isUnique ? "EMAIL_EXISTS" : "UNKNOWN", e?.meta, "Registration error"));
    }
};

export const postLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json(apiError("VALIDATION", null, "Email and password required"));
    }

    const result = await login(email, password);
    if (!result) {
        return res.status(401).json(apiError("INVALID_CREDENTIALS", null, "Invalid credentials"))
    }
    res.json(apiOk({ 
        token: result.token, 
        user: { 
            id: result.user.id, 
            email: result.user.email 
        }}, 
        "Login ok"
    ));
};
