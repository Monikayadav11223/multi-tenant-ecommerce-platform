const express = require('express');
const router = express.Router();
const { getStores, getStoreById, deleteStore } = require('../controllers/storeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getStores);

router.route('/:id')
  .get(getStoreById)
  .delete(protect, authorize('SuperAdmin'), deleteStore);

module.exports = router;
