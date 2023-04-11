const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  fullname: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone_number: {
    type: String,
    require: true,
  },
  role: { type: String, default: "client" },
  Order_id: {
    type: [Schema.Types.ObjectId],
    ref: "orders",
    default:[]
  },
});

module.exports = mongoose.model("users", UserSchema);
