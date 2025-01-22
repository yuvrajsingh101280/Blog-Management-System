import { Router } from "express";
import { checkauth, login, logout, signup } from "../controller/userController";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

// check the user is authenticated
router.get("/check-auth", verifyToken, checkauth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
