import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

// /router

app.listen(port, () => {
  console.log(`server starting at http://localhost:${port}`);
});
