import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validator.js";

const router = Router();

// POST /api/auth/register - Daftarkan user baru
router.post("/register", validateRegister, register);

// POST /api/auth/login - Login dan dapatkan token
router.post("/login", validateLogin, login);

export default router;