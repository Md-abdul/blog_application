const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./config/db");
const { userRoutes } = require("./routes/userRoutes");
const { blogRoutes } = require("./routes/blogRoutes");
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to blog applicaiton");
});

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

app.listen(port || 3000, async () => {
  try {
    await connectDB();
    console.log(`Database connected and server running on port ${port}`);
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
});
