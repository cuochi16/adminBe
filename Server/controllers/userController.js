const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const multer = require("multer");
const path = require('path');

exports.getUser = async (req, res, next) => {
  const id = req.query.userId;
  const user = await User.findById(id);
  if (!user) {
    return res.status(204).json({
      status: "No content",
    });
  }
  return res.status(200).json({
    status: "success",
    user,
  });
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  // neu khong tim thay user, insert new user to database
  if (!user) {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
    });

    const token = jwt.sign({ newUser }, email, {
      expiresIn: 60 * 24,
    });

    return res.status(201).json({
      status: "success",
      token,
      user: newUser,
    });
  }

  const token = jwt.sign({ user }, email, {
    expiresIn: 60 * 24,
  });

  // neu co return response
  return res.status(200).json({
    status: "success",
    token,
    user,
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Client/src/Assets/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

exports.uploadImage = multer({
  storage:storage
}).single('photo');

exports.updateMe = async (req, res, next) => {
  console.log("file",req.file);
  const email = req.body.email;
  let photo;
  const { name, gender, dob, gender_interest, about, address } = req.body;
  if(req.file) {
    photo = req.file.filename;
  }
  const user = await User.findOneAndUpdate(
    { email },
    { name, gender, dob, gender_interest, about, address,photo },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      message: "No user found with this email",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
};

exports.getGenderInterestUser = async (req, res, next) => {
  const gender = req.query.gender;
  const users = await User.find({ gender });
  return res.status(200).json({
    status: "success",
    users,
  });
};

exports.getAllMatches = async (req, res, next) => {
  const id = req.query.id;
  const users = await User.find({ matches: id });
  return res.status(200).json({
    status: "success",
    users,
  });
};

// Tuấn
//Get all users
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json({
    status: "success",
    users,
  });
};

