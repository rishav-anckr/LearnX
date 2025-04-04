import express from "express";

import { protect, authorize } from "../middleware/auth";
import { UserRole } from "../models/User";
import { createCourse, getCourseById, getCourses } from "../controllers/course";

const router = express.Router();

// Public routes
router.get("/", getCourses);
router.get("/:id", getCourseById);

// Protected routes (instructors only)
router.post(
  "/",
  protect,
  authorize(UserRole.INSTRUCTOR, UserRole.ADMIN),
  createCourse
);

export default router;
