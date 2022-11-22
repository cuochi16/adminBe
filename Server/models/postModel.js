const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  content: {
    type: String,
    trim: true,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  liked: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Post must belong to a user"],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
