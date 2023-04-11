const ProductModel = require("../models/productModel");
const productModel = new ProductModel();
// GET_ALL PRODUCT: http://localhost:5000/product
exports.getAllProduct = async (req, res, next) => {
  const table = req.query.table;
  const keyword =
    req.query.keyword === "undefined" || req.query.keyword === ""
      ? {}
      : { $text: { $search: req.query.keyword } };
  try {
    const product = await ProductModel.find(keyword)
      .limit(5)
      .skip(table * 5 - 5);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_SEARCH PRODUCT BY KEYWORD: http://localhost:5000/product/search
exports.getProductBySearch = async (req, res, next) => {
  const keyword = req.query.keyword;
  try {
    const pruduct = await ProductModel.find({ $text: { $search: keyword } });
    res.status(200).json(pruduct);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_TOP TRENDING PRODUCT: http://localhost:5000/product/trending
exports.getProductTrending = async (req, res, next) => {
  try {
    const product = await ProductModel.find({}).limit(8);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_PRODUCT DETAIL INFORMATION BY ID: http://localhost:5000/product/:productId
exports.getProductDetail = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await ProductModel.findById(productId);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// POST_ADMIN >> CREATE NEW PRODUCT: http://localhost:5000/product/create
exports.postNewProduct = async (req, res, next) => {
  const temp = req.body;
  const productModel = new ProductModel(req.body);
  try {
    const saved = await productModel.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// DELETE_ADMIN >> DELELE PRODUCT: http://localhost:5000/product/delete/:productId
exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
};
// PUT_ADMIN >> EDIT PRODUCT: http://localhost:5000/product/edit/:productId
exports.editProduct = async (req, res, next) => {
  const productId = req.params.productId;
};

// GET_COUNT TABLE PRODUCT: http://localhost:5000/product/count-table-product
exports.countTableProduct = async (req, res, next) => {
  try {
    const response = await ProductModel.countDocuments();
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
// GET_ALL PRODUCT: http://localhost:5000/product/client
exports.getAllProductClient = async (req, res, next) => {
  try {
    const product = await ProductModel.find({});

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};

// GET_PAGINATION PRODUCT: http://localhost:5000//product/client/pagination?category=iphone&count=9&page=1&search=
exports.getPagination = async (req, res, next) => {
  const { category, count, page, search } = req.query;
  try {
    const product = await ProductModel.find({
      category: category,
    })
      .skip(page * count - count)
      .limit(count);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      stack: err.stack,
    });
  }
};
