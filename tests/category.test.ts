import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/db/prisma";

let token: string;

beforeAll(async () => {
    await prisma.game.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    
    await request(app).post("/api/auth/register").send({ email: "test@x.com", password: "pass" });
    const login = await request(app).post("/api/auth/login").send({ email: "test@x.com", password: "pass" });
    token = login.body.data.token;
});

describe("Categories", () => {
    it("creates category", async () => {
        const res = await request(app).post("/api/categories").set("Authorization", `Bearer ${token}`).send({ name: "RPG" });
        expect(res.status).toBe(201);
    });

    it("returns all categories", async () => {
        const res = await request(app).get("/api/categories").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("does not delete category with games", async () => {
        const cat = await prisma.category.findFirst({ where: { name: "RPG" } });
        await prisma.game.create({ data: { name: "Final Fantasy", categoryId: cat!.id } });
        const res = await request(app).delete(`/api/categories/${cat!.id}`).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(409);
    });
});

