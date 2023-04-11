const UserModel = require("../models/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

/************* CLIENT API ********************/

//POST_LOGIN: http://localhost:5000/auth/signin
exports.postSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user)
      return res.json({
        status: "reject",
        message: "email not found ",
      });
    /*
    if (user.password !== password)
      return res.json({
        status: "reject",
        message: "password wrong ",
      });
*/
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      return res.json({
        status: "reject",
        message: "password wrong ",
      });
    }
    res.cookie("user", user._id, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      signed: false,
    });
    res.cookie("role", user.role, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      signed: false,
    });
    res.json({
      status: "ok",
      _id: user._id,
      fullname: user.fullname,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

/***************** ADMIN API ***********/
//POST_LOGIN: http://localhost:5000/auth/admin/signin
exports.postSignInAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user)
      return res.json({
        status: "reject",
        message: "email not found ",
      });

    if (user.role == "client")
      return res.json({
        status: "reject",
        message: " sign in require admin role ",
      });

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect)
      return res.json({
        status: "reject",
        message: "password wrong ",
      });
    res
      .status(200)
      .cookie("role", user.role, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        signed: false,
      })
      .json({
        status: "ok",
        _id: user._id,
        fullname: user.fullname,
      });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};
