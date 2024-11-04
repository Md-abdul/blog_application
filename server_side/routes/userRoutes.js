const express = require("express");
const userRoutes = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { userModel } = require("../model/user.model");

userRoutes.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "Email is already registered" });
    }

    const hash = await bcryptjs.hash(password, 5);
    const user = new userModel({ name, email, password: hash });
    await user.save();
    res.status(201).send({ msg: "New User Signup successfully" });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ msg: "Wrong credentials" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ msg: "Wrong credentials" });
    }

    const token = jwt.sign(
      { authorID: user._id, author: user.name },
      process.env.SECRET_KEY || "not_found"
    );

    res.status(200).send({
      msg: "Login successful",
      token,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).send({ err: "Login error" });
  }
});

userRoutes.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "not_found");
    const user = await userModel.findById(decoded.authorID).select("-password");
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ err: "Could not fetch user data" });
  }
});

userRoutes.put("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ msg: "Unauthorized" });
  }

  const { name, email, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "not_found");
    const userId = decoded.authorID;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcryptjs.hash(password, 5);
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, updateData, {
        new: true,
      })
      .select("-password");

    if (!updatedUser) {
      return res.status(404).send({ msg: "User not found" });
    }

    res
      .status(200)
      .send({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).send({ err: "Could not update user data" });
  }
});

module.exports = { userRoutes };
