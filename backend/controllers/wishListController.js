import userModel from "../models/userModel.js";

// Controller function for adding product to user wishlist
const addToWishList = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);

    let wishListData = userData.wishListData || {};

    // Check if the item is already in the wishlist
    if (wishListData[itemId]) {
      return res.json({ success: false, message: "Item already in wishlist" });
    }

    // Add item to wishlist
    wishListData[itemId] = 1;  // Assuming we store the quantity as 1 for simplicity

    // Update the user document with the new wishlist data
    await userModel.findByIdAndUpdate(userId, { wishListData });

    res.json({ success: true, message: "Added to Wishlist" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Controller function for removing product from user wishlist
const removeFromWishList = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);

    let wishListData = userData.wishListData || {};

    // Check if the item exists in the wishlist
    if (!wishListData[itemId]) {
      return res.json({ success: false, message: "Item not found in wishlist" });
    }

    // Remove item from wishlist
    delete wishListData[itemId];

    // Update the user document with the new wishlist data
    await userModel.findByIdAndUpdate(userId, { wishListData });

    res.json({ success: true, message: "Item removed from Wishlist" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Controller function for getting user wishlist data
const getUserWishList = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);

    let wishListData = userData.wishListData || {};

    res.json({ success: true, wishListData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToWishList, removeFromWishList, getUserWishList };
