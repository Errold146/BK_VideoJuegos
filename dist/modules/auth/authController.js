"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.postRegister = void 0;
const authService_1 = require("./authService");
const api_1 = require("../../utils/api");
const postRegister = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json((0, api_1.apiError)("VALIDATION", null, "Email and password required"));
    }
    try {
        const user = await (0, authService_1.register)(email, password);
        res.status(201).json((0, api_1.apiOk)({ id: user.id, email: user.email }, "User registered"));
    }
    catch (e) {
        const isUnique = e?.code === "P2002";
        res.status(isUnique ? 409 : 500).json((0, api_1.apiError)(isUnique ? "EMAIL_EXISTS" : "UNKNOWN", e?.meta, "Registration error"));
    }
};
exports.postRegister = postRegister;
const postLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json((0, api_1.apiError)("VALIDATION", null, "Email and password required"));
    }
    const result = await (0, authService_1.login)(email, password);
    if (!result) {
        return res.status(401).json((0, api_1.apiError)("INVALID_CREDENTIALS", null, "Invalid credentials"));
    }
    res.json((0, api_1.apiOk)({
        token: result.token,
        user: {
            id: result.user.id,
            email: result.user.email
        }
    }, "Login ok"));
};
exports.postLogin = postLogin;
