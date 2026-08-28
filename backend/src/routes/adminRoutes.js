const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getCustomers,
  getVendors,
  getStores,
  getProducts,
  getOrders,
  deactivateUser,
  deactivateStore
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('SuperAdmin'));

router.get('/dashboard', getDashboardStats);
router.get('/customers', getCustomers);
router.get('/vendors', getVendors);
router.get('/stores', getStores);
router.get('/products', getProducts);
router.get('/orders', getOrders);
router.put('/users/:id/deactivate', deactivateUser);
router.put('/stores/:id/deactivate', deactivateStore);

module.exports = router;
