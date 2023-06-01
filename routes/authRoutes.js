import express from "express";
import {
  deleteAccount,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/delete", authMiddleware, deleteAccount);

export default router;
