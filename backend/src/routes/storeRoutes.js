const express = require('express');
const router = express.Router();
const { getStores, deleteStore } = require('../controllers/storeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, authorize('SuperAdmin'), getStores);

router.route('/:id')
  .delete(protect, authorize('SuperAdmin'), deleteStore);

module.exports = router;
