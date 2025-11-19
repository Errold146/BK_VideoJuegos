"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prisma_1 = require("../../db/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const register = async (email, password) => {
    const hash = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({ data: { email, password: hash } });
    return user;
};
exports.register = register;
const login = async (email, password) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        return null;
    const ok = await bcryptjs_1.default.compare(password, user.password);
    if (!ok)
        return null;
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, env_1.env.jwtSecret, { expiresIn: "1d" });
    return { user, token };
};
exports.login = login;
