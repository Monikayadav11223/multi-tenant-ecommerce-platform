const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('SuperAdmin'), getUsers);

module.exports = router;
