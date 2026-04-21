import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(express.json()); // lets you read req.body

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

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});