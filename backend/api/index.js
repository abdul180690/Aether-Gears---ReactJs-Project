import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../config/mongodb.js";
import connectCloudinary from "../config/cloudinary.js";
import userRouter from "../routes/userRoute.js";
import productRouter from "../routes/productRoute.js";
import cartRouter from "../routes/cartRoute.js";
import wishListRouter from "../routes/wishListRoute.js";
import orderRouter from "../routes/orderRoute.js";

// Initialize DB and Cloudinary (only once)
await connectDB();
connectCloudinary();

// App Config
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishListRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('API Working from Vercel');
});

// Export for Vercel
export default app;
