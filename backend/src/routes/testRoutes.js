const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/auth', protect, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

router.get('/vendor', protect, authorize('Vendor'), (req, res) => {
  res.json({ message: 'Welcome Vendor', storeId: req.user.storeId });
});

router.get('/customer', protect, authorize('Customer'), (req, res) => {
  res.json({ message: 'Welcome Customer' });
});

router.get('/admin', protect, authorize('SuperAdmin'), (req, res) => {
  res.json({ message: 'Welcome SuperAdmin' });
});

module.exports = router;
