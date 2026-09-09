const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get customer wishlist
// @route   GET /api/customer/wishlist
// @access  Private/Customer
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add product to wishlist
// @route   POST /api/customer/wishlist
// @access  Private/Customer
const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    
    user.wishlist.push(productId);
    await user.save();
    
    const updatedUser = await User.findById(req.user._id).populate('wishlist');
    res.json(updatedUser.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/customer/wishlist/:productId
// @access  Private/Customer
const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await User.findById(req.user._id);
    
    user.wishlist = user.wishlist.filter(
      (id) => id != null && id.toString() !== productId.toString()
    );
    await user.save();
    
    const updatedUser = await User.findById(req.user._id).populate('wishlist');
    res.json(updatedUser.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
