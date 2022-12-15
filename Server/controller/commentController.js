const Comment = require("../model/commentModel");
const Post = require("../model/postModel");

exports.addComment = async (req, res) => {
  const { text, userId } = req.body;
  const comment = await Comment.create({ text, user: userId });
  const postId = req.body.postId;
  // push comment to Post
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: { _id: comment._id } },
    },
    { new: true }
  );
  return res.status(200).json({
    status: "success",
    comment,
    updatedPost,
  });
};
