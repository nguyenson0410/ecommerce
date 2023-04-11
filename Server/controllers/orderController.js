const OrderModel = require("../models/orderModel");
const UserModdel = require("../models/userModel");
const ProductModel = require("../models/productModel");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const { json } = require("express");

// GET_ORDER HISTORY OF USER: http://localhost:5000/order/history/:userId
exports.getOrderHistoryOfUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const order = await OrderModel.find({
      user_id: mongoose.Types.ObjectId(userId),
      // user_id: userId,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_SEARCH ORDER  BY ID: http://localhost:5000/order/orderId
exports.getOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await OrderModel.findById(orderId)
      .populate({
        path: "user_id",
      })
      .populate({
        path: "product_in_order.product_id",
      });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// POST_CREATE NEW ORDER: http://localhost:5000/order/create
exports.postNewOrder = async (req, res, next) => {
  const { idUser, total, product_in_order, email, fullname, phone, address } =
    req.body;
  const orderModel = new OrderModel({
    user_id: idUser,
    total: total,
    product_in_order: product_in_order,
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "assginment03@gmail.com",
      pass: "qydttmrwfipqexhj",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const templatePath = path.join(__dirname, "../views/newOrderEmail.ejs");

  try {
    const order = await orderModel.save();
    try {
      const id = order.user_id;
      const objUpdate = { $push: { Order_id: order._id } };
      await UserModdel.findByIdAndUpdate(id, objUpdate);
      transporter.verify((error, success) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Mail server is running ...");
        }
      });
      const getProductProperty = async (item) => {
        const data = await ProductModel.findById(item.product_id, {
          name: 1,
          img1: 1,
          price: 1,
          _id: 0,
        });
        const result = { ...data._doc, count: item.count };
        console.log("result", result);
        return result;
      };
      const orderProduct = await Promise.all(
        product_in_order.map(async (item) => {
          return await getProductProperty(item);
        })
      );
      console.log("orderProduct", orderProduct);
      const data = await ejs.renderFile(templatePath, {
        idUser,
        total,
        fullname,
        phone,
        address,
        orderProduct,
      });

      res.send(data);
      const mailOptions = {
        from: "assginment03@gmail.com",
        to: email,
        subject: "New Order",
        template: "newOrderEmail",
        html: data,
      };
      transporter.sendMail(mailOptions, function (err, response) {
        if (err) {
          res.json({
            status: "failure",
            message: "send email unsuccess",
            error: err,
          });
        } else {
          res.json({
            status: "ok",
            message: "Email sent:" + info.response,
          });
        }
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || err,
        stack: err.stack,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// DELETE_ADMIN >> DELETE ORDER: http://localhost:5000/order/delete/:orderId
exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const del = await OrderModel.findByIdAndDelete(orderId);

    try {
      const id = del.user_id;
      const objUpdate = { $pull: { Order_id: del._id } };
      await UserModdel.findByIdAndUpdate(id, objUpdate);
      res.status(200).json({
        message: `delete order id: ${orderId} success`,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || err,
        stack: err.stack,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// PUT_ADMIN >> EDIT ORDER: http://localhost:5000/order/edit/:orderId
exports.editOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  const objUpdate = {
    $set: req.body,
  };
  try {
    await OrderModel.findByIdAndUpdate(orderId, objUpdate, {
      new: true,
    });
    res.status(200).json({
      message: `update order id ${orderId} success`,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_EARNING http://localhost:5000/order/earning
exports.getEarning = async (req, res, next) => {
  try {
    const result = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          sum_earn: { $sum: "$total" },
        },
      },
    ]);
    res.status(200).json(result[0].sum_earn);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_COUNT NEW ORDER: http://localhost:5000/order/count-new-order
exports.countNewOrder = async (req, res, next) => {
  try {
    const result = await OrderModel.countDocuments();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_ALL ORDER: http://localhost:5000/order/all
exports.getAllOrder = async (req, res, next) => {
  const table = req.query.table;
  try {
    const result = await OrderModel.find()
      .populate({
        path: "user_id",
      })
      .limit(5)
      .skip(table * 5 - 5);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_COUNT TABLE ORDER: http://localhost:5000/order/count-table-order
exports.countTableOrder = async (req, res, next) => {
  try {
    const response = await OrderModel.countDocuments();
    const result = Math.ceil(response / 5);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

/***************CLIENT API*************************/
// GET_ORDER HISTORY OF USER http://localhost:5000/order/client/history?idUser=636b745a0ca8dbd8ce45a437
exports.getOrderHistoryOfUserClient = async (req, res, next) => {
  const idUser = req.query.idUser;
  try {
    const order = await OrderModel.find({ user_id: idUser }).populate({
      path: "user_id",
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};
