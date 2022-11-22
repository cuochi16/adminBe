const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  // _id: {
  //   type: Schema.Types.ObjectId,
  // },
  name: {
    type: String,
    trim: true,
    maxLength: [25, "Must be less than 20 characters"],
  },
  email: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
  },
  dob: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["man", "woman", "undefined"],
  },
  gender_interest: {
    enum: ["man", "woman", "undefined"],
    type: String,
  },
  about: {
    type: String,
  },
  matches: {
    type: [{ type: String, ref: "User" }],
  },
  images: {
    type: Array,
  },
  address: {
    type: String,
  },
  level: {
    type: String,
  },
  liked_by: [{ type: String, ref: "User" }],
  posts: [{type:Schema.Types.ObjectId, ref:'Post'}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
