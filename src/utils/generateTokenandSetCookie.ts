import jwt from "jsonwebtoken";
import { Response } from "express";
const genrateTokenAndSetCookie = async (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, `${process.env.JWT_SECRET}`, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",

    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
export default genrateTokenAndSetCookie;
