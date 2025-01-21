import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
