import express from "express";
import dotenv from "dotenv";
import { connection } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { errorHandler } from "./middlewares/error.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);

connection();

app.get("/", (req, res) => res.send("Welcome"));
app.use("/auth", authRoutes);
app.use("/book", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

app.use(errorHandler);
