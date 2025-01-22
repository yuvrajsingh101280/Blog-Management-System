import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import client from "../prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
const testconnection = async () => {
  try {
    await client.$connect();
    console.log("connected to database");
  } catch (error) {
    console.log("Error in connecting to databse", error);
  }
};
testconnection();

dotenv.config();
const prisma = new PrismaClient();
// middleware
const app = express();
app.use(cookieParser());
app.use(cors());
const port = process.env.PORT || 8000;
app.use(express.json());

// /router

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`server starting at http://localhost:${port}`);
});
