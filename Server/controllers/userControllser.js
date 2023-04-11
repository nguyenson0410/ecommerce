const UserModel = require("../models/userModel");
const OrderModel = require("../models/orderModel");
const bcrypt = require("bcryptjs");

/*******   ADMIN API  ****** */
// GET_ ALL USER: http://localhost:5000/user
exports.getAllUser = async (req, res, next) => {
  const table = req.query.table;
  try {
    const user = await UserModel.find({})
      .limit(5)
      .skip(5 * table - 5);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_USER BY ID: http://localhost:5000/user/:userId
exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_ADMIN >> SEARCH USER BY CONDITON: http://localhost:5000/user/search?
exports.getUserBySearch = async (req, res, next) => {
  const objKeyword = req.query;
  try {
    const user = await UserModel.find(objKeyword);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// POST_CREATE NEW USER: http://localhost:5000/user/create
exports.postNewUser = async (req, res, next) => {
  const userModel = new UserModel(req.body);

  try {
    await userModel.save();
    res.status(200).json({
      message: "create 1 new user success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// DELETE_ADMIN >> DELETE USER: http://localhost:5000/user/delete/:userId
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    await UserModel.findByIdAndDelete(userId);
    res.status(200).json({
      message: `delete user id: ${userId} success`,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// PUT_ADMIN >> EDIT USER: http://localhost:5000/user/edit/:userId
exports.editUser = async (req, res, next) => {
  const userId = req.params.userId;
  const objUpdate = {
    $set: req.body,
  };
  try {
    await UserModel.findByIdAndUpdate(userId, objUpdate, {
      new: true,
    });
    res.status(200).json({
      message: `update user id ${userId} success`,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_COUNT CLIENT: http://localhost:5000/user/count-client
exports.countClient = async (req, res, next) => {
  try {
    const result = await UserModel.countDocuments({ role: "client" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_COUNT TABLE CLIENT: http://localhost:5000/user/count-table-client
exports.countTableClient = async (req, res, next) => {
  try {
    const response = await UserModel.countDocuments({ role: "client" });
    const result = Math.ceil(response / 5);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

/*******   CLIENT API  ****** */
// GET_ ALL USER: http://localhost:5000/user/client/all
exports.getAllUserClient = async (req, res, next) => {
  try {
    const user = await UserModel.find({});

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_USER BY ID: http://localhost:5000/user/client/:userId
exports.getUserByIdClient = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);

    res
      .status(200)
      /*
      .cookie("userId", user._id, {
        expire: 86400000 + Date.now(),
        signed: true,
        HttpOnly: true,
      })*/
      .json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// POST_SIGN UP :http://localhost:5000/user/client/signup/
exports.postSignUp = async (req, res, next) => {
  const { email, fullname, password, phone } = req.query;
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const existsUser = await UserModel.findOne({ email: email });
    if (!existsUser) {
      const userModel = new UserModel({
        username: email,
        fullname: fullname,
        password: hash,
        email: email,
        phone_number: phone,
      });
      try {
        await userModel.save();
        res.status(200).json({
          status: "ok",
          message: "create new user success",
        });
      } catch (err) {
        res.status(500).json({
          message: err.message || err,
          stack: err.stack,
        });
      }
    } else res.status(200).send("Email has been registered");
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};
