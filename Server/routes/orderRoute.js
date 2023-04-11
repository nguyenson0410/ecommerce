const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

/**************CLIENT API ********************/
// GET_ORDER HISTORY OF USER http://localhost:5000/order/client/history?idUser=636b745a0ca8dbd8ce45a437
router.get("/client/history", orderController.getOrderHistoryOfUserClient);

/*************ADMIN API **********************/
// GET_ORDER HISTORY OF USER: http://localhost:5000/order/history/:userId
router.get(
  "/history/:userId",
  authMiddleware.verifyAdmin,
  orderController.getOrderHistoryOfUser
);

// POST_CREATE NEW ORDER: http://localhost:5000/order/create
router.post(
  "/create",
  authMiddleware.verifyAdmin,
  orderController.postNewOrder
);

// DELETE_ADMIN >> DELETE ORDER: http://localhost:5000/order/delete/:orderId
router.delete(
  "/delete/:orderId",
  authMiddleware.verifyAdmin,
  orderController.deleteOrder
);

// PUT_ADMIN >> EDIT ORDER: http://localhost:5000/order/edit/:orderId
router.put(
  "/edit/:orderId",
  authMiddleware.verifyAdmin,
  orderController.editOrder
);

// GET_EARNING http://localhost:5000/order/earning
router.get("/earning", orderController.getEarning);

// GET_COUNT NEW ORDER: http://localhost:5000/order/count-new-order
router.get("/count-new-order", orderController.countNewOrder);

// GET_ALL ORDER: http://localhost:5000/order/all
router.get("/all", authMiddleware.verifyAdmin, orderController.getAllOrder);

// GET_COUNT TABLE ORDER: http://localhost:5000/order/count-table-order
router.get("/count-table-order", orderController.countTableOrder);

// GET_ORDER  BY ID: http://localhost:5000/order/:orderId
router.get(
  "/:orderId",
  authMiddleware.verifyAdmin,
  orderController.getOrderById
);

module.exports = router;
