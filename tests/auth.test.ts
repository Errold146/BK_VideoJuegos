import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/db/prisma";

describe("Auth", () => {
    beforeAll(async () => { await prisma.user.deleteMany(); });

    it("registers a user", async () => {
        const res = await request(app).post("/api/auth/register").send({ email: "a@b.com", password: "123456" });
        expect(res.status).toBe(201);
        expect(res.body.ok).toBe(true);
    });

    it("logs in and returns token", async () => {
        const res = await request(app).post("/api/auth/login").send({ email: "a@b.com", password: "123456" });
        expect(res.status).toBe(200);
        expect(res.body.data.token).toBeDefined();
    });
});
