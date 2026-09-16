import { Router } from "express";

import authRoutes from "./authRoutes.js";
import todoRoutes from "./todoRoutes.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/todos", verifyToken, todoRoutes);

export default router;