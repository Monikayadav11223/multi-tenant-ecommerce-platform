const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect, authorize } = require('../middleware/authMiddleware');

const {
  getVendorStore,
  createVendorStore,
  updateVendorStore,
  getVendorProducts,
  getVendorProductById,
  createVendorProduct,
  updateVendorProduct,
  deleteVendorProduct,

  getVendorOrders,
  updateVendorOrderStatus,
  getVendorCustomers,
  getVendorAnalytics
} = require('../controllers/vendorController');

// All routes require authentication and Vendor role
router.use(protect);
router.use(authorize('Vendor'));

// Store Routes
router.route('/store')
  .get(getVendorStore)
  .post(upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), createVendorStore)
  .patch(upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), updateVendorStore);

// Product Routes
router.route('/products')
  .get(getVendorProducts)
  .post(upload.fields([{ name: 'images', maxCount: 10 }]), createVendorProduct);

router.route('/products/:id')
  .get(getVendorProductById)
  .patch(upload.fields([{ name: 'images', maxCount: 10 }]), updateVendorProduct)
  .delete(deleteVendorProduct);


// Order Routes
router.route('/orders')
  .get(getVendorOrders);

router.route('/orders/:id')
  .patch(updateVendorOrderStatus);

// Customer Routes
router.route('/customers')
  .get(getVendorCustomers);

// Analytics Routes
router.route('/analytics')
  .get(getVendorAnalytics);

module.exports = router;
