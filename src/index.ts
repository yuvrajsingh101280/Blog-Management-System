import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

// /router

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`server starting at http://localhost:${port}`);
});
