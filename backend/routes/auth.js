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

// Register route

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ error: "Username, password and email are required" });
  }
  const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (userExists.rows.length > 0) {
    return res.status(400).json({ message: "Email already exists" });
  };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    const token = generateToken(newUser.rows[0].id);
    res.cookie("token", token, cookiesOptions);
    res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
});

// Login route

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]); 

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    };

    const userData = user.rows[0];

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    };

    const token = generateToken(userData.id);
    res.cookie("token", token, cookiesOptions);
    res.json({ message: "Logged in successfully", user: userData });


})

// me route

router.get("/me", protect, async (req, res) => {
    res.json({ user: req.user });
    // return info of the logged in user from protect middleware
})

// Logout route

router.post("/logout", (req, res) =>
{ res.cookie("token", "", { ...cookiesOptions, maxAge: 1 }).json({ message: "Logged out successfully" })
});
export default router;   