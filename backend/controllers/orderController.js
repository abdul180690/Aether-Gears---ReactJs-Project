import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

// Global Variables for payment
const currency = "INR";
const deliveryCharges = 100;

// Getway initialize
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// conrtroller function for placing order using COD method
// Enhanced placeOrder controller
const placeOrder = async (req, res) => {
  try {
    // Required fields validation
    const requiredFields = ['userId', 'items', 'amount', 'address'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    // Validate items array
    if (!Array.isArray(req.body.items)) {
      return res.status(400).json({
        success: false,
        message: "Items must be an array"
      });
    }

    const orderData = {
      orderId: uuidv4(),
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod || "cod",
      payment: req.body.payment || false,
      paymentStatus: req.body.paymentStatus || "pending",
      paymentId: req.body.paymentId || null,
      date: Date.now()
    };

    console.log("Creating order with:", orderData);

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user's cart only after successful order creation
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({
      success: true,
      orderId: newOrder.orderId,
      message: "Order placed successfully"
    });

  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// controller function for placing order using RAZORPAY method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderId = uuidv4();

    const orderData = {
      orderId,
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    console.log("Order Method:", paymentMethod); // Debugging
    console.log("Order Data Before Saving:", orderData); // Debugging

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const razorpayOrder = await razorpay.orders.create({
      amount: req.body.amount,
      currency: "INR",
      receipt: newOrder._id.toString(),
    });

    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log("Razorpay error:", error);
    res.json({ success: false, message: error.message });
  }
};

// controller function for verifying razorpay payment
const verifyRazorpay = async (req, res) => {
  try {
    const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature, userId } = req.body;

    if (!orderId || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification data"
      });
    }

    // Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      await orderModel.findOneAndDelete({ orderId });
      return res.json({ 
        success: false, 
        message: "Payment verification failed - invalid signature" 
      });
    }

    // Update order status
    await orderModel.findOneAndUpdate(
      { orderId },
      { 
        payment: true,
        paymentStatus: "paid",
        paymentId: razorpay_payment_id
      }
    );

    // Clear cart if not already done
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ 
      success: true, 
      message: "Payment verified successfully" 
    });

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// controller function for getting all orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// conrtroller function for getting user orders data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// conrtroller function for updating user order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Controller function to get a single order by orderId
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Order ID is required" });
    }

    const order = await orderModel.findOne({ orderId });

    const totalAmount = order.amount;

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order, totalAmount });
  } catch (error) {
    console.log("Error fetching order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export {
  placeOrder,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  getOrderDetails,
  updateStatus,
  verifyRazorpay,
};
