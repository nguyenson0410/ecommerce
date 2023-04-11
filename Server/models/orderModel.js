const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    //type: String,
    ref: "users",
  },
  total: {
    type: Number,
    require: true,
  },
  delivery: {
    type: String,
    default: "Chưa Vận Chuyển",
  },
  status: {
    type: String,
    default: "Chưa Thanh Toán",
  },
  product_in_order: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      count: {
        type: Number,
      },
    },
  ],
});
module.exports = mongoose.model("orders", OrderSchema);
