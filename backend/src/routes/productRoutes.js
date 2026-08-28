const express = require('express');
const router = express.Router();
const { getProducts, getProductById, deleteProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getProducts);

router.route('/:id')
  .get(getProductById)
  .delete(protect, authorize('SuperAdmin'), deleteProduct);

module.exports = router;
