import { Router } from "express";
import {
  addComment,
  createPost,
  createUser,
  getPostAndComment,
  getUserAndPost,
} from "../controller/blog";
const router = Router();

router.post("users", createUser);
router.post("users/:userId/posts", createPost);
router.post("posts/:postId/coments", addComment);
router.get("/users", getUserAndPost);
router.get("/posts", getPostAndComment);

export default router;
