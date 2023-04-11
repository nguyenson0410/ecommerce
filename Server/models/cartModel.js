const mongoose = require("mongoose");
const { Schema } = mongoose;
const CartSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  idProduct: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  count: {
    type: Number,
    default: 1,
  },
});
module.exports = mongoose.model("carts", CartSchema);
