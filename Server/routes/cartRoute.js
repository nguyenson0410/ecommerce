const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// POST_ADD PRODUCT TO CART:http://localhost:5000/carts/add?idProduct=62ccdb045eefc71539bb6b56
router.post("/add", cartController.postAddProductToCart);

// GET_CART:http://localhost:5000/carts
router.get("/", cartController.getCarts);

module.exports = router;
