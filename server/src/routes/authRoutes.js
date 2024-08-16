import express from "express";
import {
  signup,
  signin,
  getProfile,
  updateProfile,
  logout,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", authenticate, getProfile);
router.post("/profile", authenticate, updateProfile);
router.post("/logout", logout);

export default router;
