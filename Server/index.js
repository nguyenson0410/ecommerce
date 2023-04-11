const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const authRoute = require("./routes/authRoute");
const cartRoute = require("./routes/cartRoute");
const authMiddleware = require("./middlewares/authMiddleware");
const cookieParser = require("cookie-parser");
var session = require("express-session");

const app = express();
const mongodbUr =
  "mongodb+srv://assignment03:assignment03@cluster0.lorqi48.mongodb.net/Assigment03";
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser("assigment03"));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
/*
app.use( 
  session({
    secret: "assigment3-session",
    resave: false,
    saveUninitialized: true,
  })
);
*/
app.use("/carts", cartRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/order", authMiddleware.verifyAuth, orderRoute);
app.use("/product", productRoute);

mongoose
  .connect(mongodbUr)
  .then((result) => {
    //  console.log(result.connections);
    /* app.listen(
      port,
      "127.0.0.1",  () => {
        console.log("server is running on Port:", port);
      }
    );*/
    app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
      console.log("server is running on Port:", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("mongoDb connect err: ", err);
  });
