const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/User");
const productRouter = require("./routes/Products");
const paymentRouter = require("./routes/Stripe");
const cartsRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => {console.log(err)
  });


//  built-in body parser for parsing req JSON body
app.use(cors());
app.use(express.json());
app.use("/api/auth" , authRouter);
app.use("/api/users" , userRouter); 
app.use("/api/products" , productRouter);
app.use("/api/checkout" , paymentRouter);
app.use("/api/carts" , cartsRouter);
app.use("/api/orders" , orderRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
