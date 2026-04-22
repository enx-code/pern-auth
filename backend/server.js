import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json()); // lets you read req.body
app.use(cookieParser()); // lets you read cookies from req.cookies  


app.get("/", (req, res) => {
  res.send("Hello World!");
});


// Test DB connection route
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ connected: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});