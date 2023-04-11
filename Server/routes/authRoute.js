const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/*****************ADMIN API *****************/
//POST_LOGIN: http://localhost:5000/auth/admin/signin
router.post("/admin/signin", authController.postSignInAdmin);

/*****************CLIENT API *****************/
// POST_LOGIN: http://localhost:500/auth/signin
router.post("/signin", authController.postSignIn);

module.exports = router;
