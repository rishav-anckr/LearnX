import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/auth";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

export default router;
