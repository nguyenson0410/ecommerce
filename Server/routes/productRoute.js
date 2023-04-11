const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
/*******   CLIENT API  ****** */
// GET_PAGINATION PRODUCT: http://localhost:5000//product/client/pagination?category=iphone&count=9&page=1&search=
router.get("/client/pagination", productController.getPagination);

// GET_ALL PRODUCT: http://localhost:5000/product/client
router.get("/client", productController.getAllProductClient);

/*******   ADMIN API  ****** */
// GET_ALL PRODUCT: http://localhost:5000/product
router.get("/", authMiddleware.verifyAdmin, productController.getAllProduct);

// GET_SEARCH PRODUCT BY KEYWORD: http://localhost:5000/product/search
router.get(
  "/search",
  authMiddleware.verifyAdmin,
  productController.getProductBySearch
);

// GET_TOP TRENDING PRODUCT: http://localhost:5000/product/trending
router.get(
  "/trending",
  authMiddleware.verifyAdmin,
  productController.getProductTrending
);

// POST_NEW PRODUCT: http://localhost:5000/product/create
router.post("/create", productController.postNewProduct);

// DELETE_ADMIN >> DELELE PRODUCT: http://localhost:5000/product/delete/:productId
router.delete(
  "/delete/:productId",
  authMiddleware.verifyAdmin,
  productController.deleteProduct
);

// GET_COUNT TABLE PRODUCT: http://localhost:5000/product/count-table-product
router.get("/count-table-product", productController.countTableProduct);

// PUT_ADMIN >> EDIT PRODUCT: http://localhost:5000/product/edit/:productId
router.put(
  "/edit/:productId",
  authMiddleware.verifyAdmin,
  productController.editProduct
);

// GET_COUNT PRODUCT: http://localhost:5000/product/edit/:productId

// GET_PRODUCT DETAIL INFORMATION BY ID: http://localhost:5000/product/:productId
router.get(
  "/:productId",
  authMiddleware.verifyAdmin,
  productController.getProductDetail
);

module.exports = router;
