const Product = require('../models/Product');

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Vendor
const createProduct = async (req, res) => {
  const { name, description, category, price, inventoryCount, images } = req.body;
  
  try {
    // Crucial: Use storeId from the authenticated vendor's token
    const storeId = req.user.storeId;

    if (!storeId) {
      return res.status(403).json({ message: 'User does not have an associated store' });
    }

    const product = await Product.create({
      storeId,
      name,
      description,
      category,
      price,
      inventoryCount,
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all products (public)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get vendor's own products
// @route   GET /api/products/my-products
// @access  Private/Vendor
const getMyProducts = async (req, res) => {
  try {
    const storeId = req.user.storeId;
    
    if (!storeId) {
      return res.status(403).json({ message: 'User does not have an associated store' });
    }

    // Tenant isolation: Only find products matching the vendor's storeId
    const products = await Product.find({ storeId });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/SuperAdmin or Private/Vendor (owner)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Authorization check: Only SuperAdmin or the Vendor who owns the store can delete
    if (req.user.role !== 'SuperAdmin') {
      if (!req.user.storeId || product.storeId.toString() !== req.user.storeId.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this product' });
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getMyProducts,
  deleteProduct,
};
