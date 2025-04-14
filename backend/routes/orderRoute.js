import express from "express"
import adminAuth from '../middleware/adminAuth.js'
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, getOrderDetails, verifyRazorpay } from "../controllers/orderController.js"
import authUser from "../middleware/auth.js"

const orderRouter = express.Router()


// for admin
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)


// for payment
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);


// for user
orderRouter.post('/userorders', authUser, userOrders)
// Get order details by orderId
orderRouter.post('/getorder', authUser, getOrderDetails);

// Verify Razorpay payment
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default orderRouter