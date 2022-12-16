const multer = require("multer");
const path = require("path");
const Support = require("../model/supportModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/Assets/Images/Post");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// exports.uploadPostImage = multer({
//   storage: storage,
// }).single("image");

exports.createSupport = async (req, res) => {
  let image;
  console.log(req.file);
  if (req.file) image = req.file.filename;
  const { user, content } = req.body;
  const support = await Support.create({ content, user, image });
  return res.status(200).json({
    status: "success",
    support,
  });
};

exports.getAll = async (req, res) => {
  const supports = await Support.find();
  return res.status(200).json({
    status: "success",
    supports,
  });
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const support = await Support.findById(id);
  if (!support) {
    return res.status(204).json({
      status: "No support found !",
    });
  }

  return res.status(200).json({
    status: "success",
    support,
  });
};

// exports.updatePost = async (req, res) => {
//   const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   if (!post) {
//     return res.status(204).json({
//       status: "Can not update post",
//     });
//   }

//   return res.status(200).json({
//     status: "Update successfully",
//     post,
//   });
// };

exports.deleteSupport = async (req, res) => {
  const id = req.params.id;
  const support = await Support.findByIdAndDelete(id);
  if (!support) {
    return res.status(204).json({
      status: "No content",
    });
  }

  return res.status(200).json({
    status: "Deleted successfully !",
  });
};

// exports.likePost = async (req, res) => {
//   const id = req.params.id;
//   const post = await Post.findById(id);
//   const updatedPost = await Post.findByIdAndUpdate(
//     id,
//     { like: post.like + 1 },
//     { new: true }
//   );
//   return res.status(200).json({
//     status: "Liked",
//     updatedPost,
//   });
// };