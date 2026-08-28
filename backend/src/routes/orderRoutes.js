const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders, getVendorOrders } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('Customer'), addOrderItems);
router.get('/myorders', protect, authorize('Customer'), getMyOrders);
router.get('/vendor', protect, authorize('Vendor'), getVendorOrders);

module.exports = router;
