import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const cookiesOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ error: "Username, password and email are required" });
  }
  const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  if (userExists.rows.length > 0) {
    return res.status(400).json({ error: "Username already exists" });
  };
});

export default router;   