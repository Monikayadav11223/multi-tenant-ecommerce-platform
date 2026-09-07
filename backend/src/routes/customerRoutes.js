const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/customerController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('Customer'));

router.route('/wishlist')
  .get(getWishlist)
  .post(addToWishlist);

router.route('/wishlist/:productId')
  .delete(removeFromWishlist);

module.exports = router;
