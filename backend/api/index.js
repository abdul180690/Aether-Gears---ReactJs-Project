import express from "express";
import cors from "cors";
import connectDB from "../config/mongodb.js";
import connectCloudinary from "../config/cloudinary.js";
import userRouter from "../routes/userRoute.js";
import productRouter from "../routes/productRoute.js";
import cartRouter from "../routes/cartRoute.js";
import wishListRouter from "../routes/wishListRoute.js";
import orderRouter from "../routes/orderRoute.js";

connectDB();
connectCloudinary();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishListRouter);
app.use("/api/order", orderRouter);
app.get("/", (req, res) => res.send("API Working"));

module.exports = app;
