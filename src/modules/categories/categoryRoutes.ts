import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { postCategory, putCategory, getCategories, getCategory, removeCategory } from "./categoryController";

const router = Router();
router.use(requireAuth);

router.post("/", postCategory);
router.put("/:id", putCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.delete("/:id", removeCategory);

export default router;
