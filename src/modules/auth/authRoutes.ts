import { Router } from "express";
import { postLogin, postRegister } from "./authController";

const router = Router();
router.post("/register", postRegister);
router.post("/login", postLogin);

export default router;
