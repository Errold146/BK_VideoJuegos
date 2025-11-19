import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/db/prisma";

let token: string;
let categoryId: number;

beforeAll(async () => {
    await prisma.user.deleteMany();
    await prisma.game.deleteMany();
    await prisma.category.deleteMany();

    await request(app).post("/api/auth/register").send({ email: "games@x.com", password: "pass" });
    const login = await request(app).post("/api/auth/login").send({ email: "games@x.com", password: "pass" });
    token = login.body.data.token;
    const cat = await prisma.category.create({ data: { name: "Action" } });
    categoryId = cat.id;
});

describe("Games", () => {
    it("creates game", async () => {
        const res = await request(app).post("/api/games").set("Authorization", `Bearer ${token}`).send({ name: "Doom", categoryName: "Action" });
        expect(res.status).toBe(201);
    });

    it("lists games by category", async () => {
        const res = await request(app).get(`/api/games/category/${categoryId}`).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0].category.id).toBe(categoryId);

    });

    it("re-associates game to another category", async () => {
        const cat2 = await prisma.category.create({ data: { name: "Shooter" } });
        const game = await prisma.game.findFirst({ where: { name: "Doom" } });
        const res = await request(app)
            .put(`/api/games/${game!.id}/category`)
            .set("Authorization", `Bearer ${token}`)
            .send({ categoryName: "Shooter" })
        expect(res.status).toBe(200);
        expect(res.body.data.categoryId).toBe(cat2.id);
    });
});
