import { Request, Response } from "express";
import Course from "../models/Course";
import User from "../models/User";

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Only instructors)
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, thumbnail, price, level, duration, status } =
      req.body;

    // The instructorId comes from the authenticated user
    const instructorId = req.user.id;

    // Check if the user is an instructor
    const user = await User.findByPk(instructorId);
    if (!user || user.role !== "instructor") {
      return res.status(403).json({
        message: "Only instructors can create courses",
      });
    }

    // Create the course
    const course = await Course.create({
      title,
      description,
      thumbnail,
      price,
      instructorId,
      level: level || "beginner",
      duration,
      status: status || "draft",
    });

    res.status(201).json(course);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.status(200).json(courses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
