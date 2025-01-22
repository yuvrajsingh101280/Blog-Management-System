import express from "express";
import verifyToken from "../middleware/authMiddleware";
import {
  createPost,
  deletePost,
  editpost,
  getAllPost,
  getPost,
} from "../controller/postController";
const router = express.Router();

router.post("/createpost", verifyToken, createPost);
router.get("/getallpost", verifyToken, getAllPost);
router.get("/getpost/:id", verifyToken, getPost);
router.put("/editpost/:id", verifyToken, editpost);
router.delete("/deletepost/:id", verifyToken, deletePost);

export default router;
