import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./modules/auth/authRoutes";
import categoryRoutes from "./modules/categories/categoryRoutes";
import gameRoutes from "./modules/games/gameRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/games", gameRoutes);
app.use("/img", express.static(path.join(__dirname, "../public/img")));

app.get("/health", (_req, res) => res.json({ ok: true, message: "Conected..." }));

export default app;
