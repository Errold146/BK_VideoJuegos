import { prisma } from "../../db/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export const register = async (email: string, password: string) => {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hash } });
    return user;
};

export const login = async (email: string, password: string) => {

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;

    const token = jwt.sign({ userId: user.id, email: user.email }, env.jwtSecret, { expiresIn: "1d" });
    return { user, token };
};
