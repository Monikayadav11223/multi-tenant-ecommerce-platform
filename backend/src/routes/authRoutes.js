const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, login, getMe, updateProfile, updatePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], register);

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], login);

router.get('/me', protect, getMe);

router.put('/profile', protect, updateProfile);

router.put('/password', [
  protect,
  check('currentPassword', 'Current password is required').exists(),
  check('newPassword', 'Please enter a new password with 6 or more characters').isLength({ min: 6 })
], updatePassword);

module.exports = router;
