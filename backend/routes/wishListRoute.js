import express from 'express';
import { addToWishList, removeFromWishList, getUserWishList } from '../controllers/wishListController.js';
import authUser from '../middleware/auth.js';

const wishListRouter = express.Router();

// Route to add an item to the wishlist
wishListRouter.post('/add', authUser, addToWishList);

// Route to remove an item from the wishlist
wishListRouter.post('/remove', authUser, removeFromWishList);

// Route to get the user's wishlist data
wishListRouter.post('/get', authUser, getUserWishList);

export default wishListRouter;
