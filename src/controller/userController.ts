import { Request, Response } from "express";
import client from "../../prisma/client";
import bcrypt from "bcryptjs";
import genrateTokenAndSetCookie from "../utils/generateTokenandSetCookie";
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, age, address } = req.body;

  try {
    if (!email || !password) {
      res
        .status(404)
        .json({ success: false, message: "Email and password required" });
    }

    const ExistingUser = await client.user.findUnique({ where: { email } });
    if (ExistingUser) {
      res.status(400).json({ success: false, message: "User Already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await client.user.create({
        data: { email, password: hashedPassword, name, age, address },
      });

      genrateTokenAndSetCookie(res, user.id);

      res.status(200).json({
        success: true,
        message: "user created successfully",
        ...user,
        password: undefined,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await client.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ success: false, message: "user doesnot exist" });
    }

    const verifyPassword = await bcrypt.compare(password, `${user?.password}`);

    if (!verifyPassword) {
      res.status(401).json({ success: false, message: "Invalid credential" });
    }

    genrateTokenAndSetCookie(res, `${user?.id}`);

    res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    console.log("Error in login :--- ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "User logged out" });
};
f;
