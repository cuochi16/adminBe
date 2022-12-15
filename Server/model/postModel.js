const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
    },
    like: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

postSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name photo" });
  this.populate({ path: "comments", select: "text created_at" });
  next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;