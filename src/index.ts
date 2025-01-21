import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import blogroute from "../routes/blog";
dotenv.config();
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

// /router

app.use("/api/", blogroute);

app.listen(port, () => {
  console.log(`server starting at http://localhost:${port}`);
});
