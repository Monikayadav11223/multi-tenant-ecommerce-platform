const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getMyProducts, deleteProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, authorize('Vendor'), createProduct)
  .get(getProducts);

router.get('/my-products', protect, authorize('Vendor'), getMyProducts);

router.route('/:id')
  .delete(protect, authorize('SuperAdmin', 'Vendor'), deleteProduct);

module.exports = router;
