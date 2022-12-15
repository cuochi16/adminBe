const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    text: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);  

commentSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name photo" });
  next();
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
