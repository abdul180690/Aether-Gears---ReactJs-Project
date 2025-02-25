import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
import { v4 as uuidv4 } from 'uuid';

// Global Variables for payment
const currency = "INR"
const deliveryCharges = 100

// Getway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// conrtroller function for placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    
    const orderId = uuidv4();

    const orderData = {
      orderId,
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    console.log("Order Data Before Saving:", orderData); // Debugging

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, {cartData:{}})

    res.json({success:true, orderId, message:"OrderPlacedSuccessfully"})

  } catch (error) {
    console.log(error)
    res.json({success:false, message: error.message})
  }
};

// conrtroller function for placing order using STRIPE method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const {origin} = req.headers


    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    const line_items = items.map((item)=> ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 * 87.85 // converting into inr currency
      },
      quantity: item.quantity
    }))
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: deliveryCharges * 100 * 87.85
      },
      quantity : 1
    })

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment'
    })
    res.json({success:true, success_url:session.url})


  } catch (error) {
    console.log(error)
    res.json({success:false, message: error.mesage})
  }
};



// controller function for verifying stripe (this is a temperory method for rest)
const verifyStripe = async (req, res) => {
  const {orderId, success, userId} = req.body
  
  try {
    if(success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, {payment: true})
      await userModel.findByIdAndUpdate(userId, {cartData: {}})
      
      res.json({success: true})
    } else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  } catch (error) {
    console.log(error)
    res.json({success:false, message: error.message})
    
  }
}





// controller function for getting all orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({success: true, orders})
  } catch (error) {
    console.log(error)
    res.json({success:false, message: error.message}) 
  }
};

// conrtroller function for getting user orders data for frontend
const userOrders = async (req, res) => {
  try {
    const {userId} = req.body

    const orders = await orderModel.find({ userId })
    res.json({ success:true, orders })
  } catch (error) {
    console.log(error)
    res.json({success:false, message: error.message})
  }
};

// conrtroller function for updating user order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body
    
    await orderModel.findByIdAndUpdate(orderId, {status})
    res.json({ success: true, message: "Status Updated" })
  } catch (error) {

    console.log(error)
    res.json({success: false, message: error.message })
    
  }
};

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe };
