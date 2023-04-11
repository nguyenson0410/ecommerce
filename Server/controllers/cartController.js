const CartModel = require("../models/cartModel");

// POST_ADD PRODUCT TO CART:http://localhost:5000/carts/add?idProduct=62ccdb045eefc71539bb6b56&idUser=636b745a0ca8dbd8ce45a437&count=1

exports.postAddProductToCart = async (req, res, next) => {
  const { count, idProduct, idUser } = req.query;
  const cartModel = new CartModel({
    idUser: idUser,
    idProduct: idProduct,
    count: count,
  });
  try {
    await cartModel.save();
    res.json({
      status: "ok",
      message: "Add product to cart success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_CART:http://localhost:5000/carts?
exports.getCarts = async (req, res, next) => {
  const { idUser } = req.query;
  try {
    const cart = await CartModel.find({
      idUser: idUser,
    }).populate({ path: "idProduct" });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};
