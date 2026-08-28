const User = require('../models/User');
const Store = require('../models/Store');
const generateToken = require('../utils/generateToken');
const { validationResult } = require('express-validator');

// @desc    Register user (Vendor or Customer)
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role, storeName, storeDescription } = req.body;

  try {
    // SuperAdmin cannot be registered publicly
    if (role === 'SuperAdmin') {
      return res.status(403).json({ message: 'Cannot register SuperAdmin via public endpoint' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Customer',
    });

    let store = null;
    let storeId = null;

    // If Vendor, create a store
    if (user.role === 'Vendor') {
      if (!storeName) {
        await User.findByIdAndDelete(user._id);
        return res.status(400).json({ message: 'Vendor must provide a storeName' });
      }

      const storeSlug = storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const storeExists = await Store.findOne({ slug: storeSlug });
      if (storeExists) {
        await User.findByIdAndDelete(user._id);
        return res.status(400).json({ message: 'Store name is already taken' });
      }

      store = await Store.create({
        vendorId: user._id,
        name: storeName,
        slug: storeSlug,
        description: storeDescription || ''
      });

      storeId = store._id;
      user.storeId = storeId;
      await user.save();
    }

    const token = generateToken(user._id, user.role, storeId);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      storeId: user.storeId,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (user.isActive === false) {
        return res.status(401).json({ message: 'Account has been deactivated. Please contact support.' });
      }

      const token = generateToken(user._id, user.role, user.storeId);
      
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        storeId: user.storeId,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        storeId: user.storeId,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      storeId: updatedUser.storeId,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword
};
