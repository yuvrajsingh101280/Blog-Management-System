import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import client from "../../prisma/client";
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  try {
    if (!token) {
      res
        .status(400)
        .json({ success: false, message: "The token is not provided" });
    }

    const decoded: any = await jwt.verify(token, `${process.env.JWT_SECRET}`);

    if (!decoded) {
      res.status(404).json({ success: false, message: "Invalid token" });
    }

    const user = await client.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Ivalid token user not found" });
    }
    next();
    res.status(200).json({
      success: true,
      message: "User authenticated",
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};
export default verifyToken;
