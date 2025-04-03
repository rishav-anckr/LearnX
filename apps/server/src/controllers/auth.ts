import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserRole } from "../models/User";

// Generate JWT
const generateToken = (id: number, role: string): string => {
  if (!process.env.JWT_SECRET) {
    console.warn("WARNING: JWT_SECRET is not defined. Using unsafe default.");
  }

  return jwt.sign(
    { id, role }, // Include role in the payload
    process.env.JWT_SECRET || "defaultsecret",
    {
      expiresIn: "30h",
    }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || UserRole.STUDENT,
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role), // Pass role to token generator
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check for user email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role), // Pass role to token generator
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // This assumes your auth middleware has attached the user ID to req.user
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Refresh user token
// @route   POST /api/auth/refresh
// @access  Private
export const refreshToken = async (req: Request, res: Response) => {
  try {
    // Get user from authenticated request
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new token
    const token = generateToken(user.id, user.role);

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
