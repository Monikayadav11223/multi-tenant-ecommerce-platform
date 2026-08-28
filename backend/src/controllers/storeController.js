const Store = require('../models/Store');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get all stores (Public)
// @route   GET /api/stores
// @access  Public
const getStores = async (req, res) => {
  try {
    const stores = await Store.find({ isActive: true }).select('-vendorId');
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get store by ID (Public)
// @route   GET /api/stores/:id
// @access  Public
const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).select('-vendorId');
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json(store);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a store
// @route   DELETE /api/stores/:id
// @access  Private/SuperAdmin
const deleteStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Cascade delete products associated with this store
    await Product.deleteMany({ storeId: store._id });
    
    // Remove storeId reference from the vendor user so they aren't orphaned
    await User.findByIdAndUpdate(store.vendorId, { storeId: null });

    await Store.findByIdAndDelete(req.params.id);

    res.json({ message: 'Store and all its products removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getStores,
  getStoreById,
  deleteStore,
};
