const { Router } = require("express");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllser");
const authMiddleware = require("../middlewares/authMiddleware");

/*******   CLIENT API  ****** */
// POST_SIGN UP :http://localhost:5000/user/client/signup/
router.post("/client/signup", userController.postSignUp);

// GET_ ALL USER: http://localhost:5000/user/client
router.get("/client/all", userController.getAllUserClient);

// GET_USER BY ID: http://localhost:5000/user/client/:userId
router.get(
  "/client/:userId",
  authMiddleware.verifyAuth,
  userController.getUserByIdClient
);

/*******   ADMIN API  ****** */
// GET_ ALL USER: http://localhost:5000/user
router.get("/", authMiddleware.verifyAdmin, userController.getAllUser);

// GET_ADMIN >> SEARCH USER BY CONDITON: http://localhost:5000/user/search?
router.get(
  "/search",
  authMiddleware.verifyAdmin,
  userController.getUserBySearch
);

// GET_COUNT CLIENT: http://localhost:5000/user/count-client
router.get("/count-client", userController.countClient);

// POST_CREATE NEW USER: http://localhost:5000/user/create
router.post("/create", authMiddleware.verifyAdmin, userController.postNewUser);

// DELETE_ADMIN >> DELETE USER: http://localhost:5000/user/delete/:userId
router.delete(
  "/delete/:userId",
  authMiddleware.verifyAdmin,
  userController.deleteUser
);

// PUT_ADMIN >> EDIT USER: http://localhost:5000/user/edit/:userId
router.put(
  "/edit/:userId",
  authMiddleware.verifyAdmin,
  userController.editUser
);

// GET_COUNT TABLE CLIENT: http://localhost:5000/user/count-table-client
router.get("/count-table-client", userController.countTableClient);

// GET_USER BY ID: http://localhost:5000/user/:userId
router.get("/:userId", authMiddleware.verifyAdmin, userController.getUserById);

module.exports = router;
