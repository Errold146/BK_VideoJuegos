import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { postGame, putGameCategory, getGames, getGamesByCat, removeGame, getGame } from "./gameController";

const router = Router();

// Endpoints públicos
router.get("/", getGames);
router.get("/:id", getGame);  
router.get("/category/:categoryId", getGamesByCat);

// Endpoint protegidos
router.use(requireAuth);
router.post("/", postGame);
router.put("/:id/category", putGameCategory);
router.delete("/:id", removeGame);

export default router;
