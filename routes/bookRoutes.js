import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  addBook,
  getBooks,
  updateCategory,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/add", authMiddleware, addBook);
router.get("/get", authMiddleware, getBooks);
router.patch("/update", authMiddleware, updateCategory);

export default router;
