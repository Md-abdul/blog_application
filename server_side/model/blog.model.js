const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  content: { type: String, required: true },
  tags: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = {
  blogModel,
};
