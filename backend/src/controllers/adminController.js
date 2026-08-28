const User = require('../models/User');
const Store = require('../models/Store');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/SuperAdmin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'Customer' });
    const totalVendors = await User.countDocuments({ role: 'Vendor' });
    const totalStores = await Store.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    const orders = await Order.find({ status: { $ne: 'Cancelled' } });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('storeId', 'name');
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email role');

    res.json({
      totalUsers,
      totalCustomers,
      totalVendors,
      totalStores,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all customers
// @route   GET /api/admin/customers
// @access  Private/SuperAdmin
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'Customer' }).select('-password').sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all vendors
// @route   GET /api/admin/vendors
// @access  Private/SuperAdmin
const getVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: 'Vendor' }).select('-password').sort({ createdAt: -1 });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all stores
// @route   GET /api/admin/stores
// @access  Private/SuperAdmin
const getStores = async (req, res) => {
  try {
    const stores = await Store.find().populate('vendorId', 'name email').sort({ createdAt: -1 });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private/SuperAdmin
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('storeId', 'name').populate('vendorId', 'name email').sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/SuperAdmin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('storeId', 'name').populate('customerId', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Deactivate a user
// @route   PUT /api/admin/users/:id/deactivate
// @access  Private/SuperAdmin
const deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (req.body.isActive !== undefined) {
      user.isActive = req.body.isActive;
    } else {
      user.isActive = false;
    }
    
    await user.save();
    res.json({ message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`, user });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Deactivate a store
// @route   PUT /api/admin/stores/:id/deactivate
// @access  Private/SuperAdmin
const deactivateStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    
    if (req.body.isActive !== undefined) {
      store.isActive = req.body.isActive;
    } else {
      store.isActive = false;
    }
    
    await store.save();
    res.json({ message: `Store ${store.isActive ? 'activated' : 'deactivated'} successfully`, store });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getCustomers,
  getVendors,
  getStores,
  getProducts,
  getOrders,
  deactivateUser,
  deactivateStore
};
