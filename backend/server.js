const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});