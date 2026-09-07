const Store = require('../models/Store');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const { uploadImage, deleteImage } = require('../utils/cloudinary');
const fs = require('fs');

// --- STORE CONTROLLERS ---

// @desc    Get vendor's store
// @route   GET /api/vendor/store
// @access  Private/Vendor
const getVendorStore = async (req, res) => {
  try {
    const store = await Store.findOne({ vendorId: req.user._id });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create vendor's store
// @route   POST /api/vendor/store
// @access  Private/Vendor
const createVendorStore = async (req, res) => {
  try {
    const existingStore = await Store.findOne({ vendorId: req.user._id });
    if (existingStore) {
      return res.status(400).json({ message: 'Vendor already has a store' });
    }

    const { name, slug, description } = req.body;
    let logo = undefined;
    let banner = undefined;

    if (req.files && req.files.logo) {
      logo = await uploadImage(req.files.logo[0].path);
      fs.unlinkSync(req.files.logo[0].path);
    }
    if (req.files && req.files.banner) {
      banner = await uploadImage(req.files.banner[0].path);
      fs.unlinkSync(req.files.banner[0].path);
    }

    const store = await Store.create({
      vendorId: req.user._id,
      name,
      slug,
      description,
      logo,
      banner,
    });

    const user = await User.findById(req.user._id);
    user.storeId = store._id;
    await user.save();

    res.status(201).json(store);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update vendor's store
// @route   PATCH /api/vendor/store
// @access  Private/Vendor
const updateVendorStore = async (req, res) => {
  try {
    const store = await Store.findOne({ vendorId: req.user._id });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const { name, slug, description, isActive } = req.body;

    if (name) store.name = name;
    if (slug) store.slug = slug;
    if (description !== undefined) store.description = description;
    if (isActive !== undefined) store.isActive = isActive;

    if (req.files && req.files.logo) {
      if (store.logo && store.logo.publicId) {
        await deleteImage(store.logo.publicId);
      }
      store.logo = await uploadImage(req.files.logo[0].path);
      fs.unlinkSync(req.files.logo[0].path);
    }

    if (req.files && req.files.banner) {
      if (store.banner && store.banner.publicId) {
        await deleteImage(store.banner.publicId);
      }
      store.banner = await uploadImage(req.files.banner[0].path);
      fs.unlinkSync(req.files.banner[0].path);
    }

    const updatedStore = await store.save();
    res.json(updatedStore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- PRODUCT CONTROLLERS ---

// @desc    Get vendor's products
// @route   GET /api/vendor/products
// @access  Private/Vendor
const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single vendor product
// @route   GET /api/vendor/products/:id
// @access  Private/Vendor
const getVendorProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, vendorId: req.user._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a product
// @route   POST /api/vendor/products
// @access  Private/Vendor
const createVendorProduct = async (req, res) => {
  try {
    const store = await Store.findOne({ vendorId: req.user._id });
    if (!store) {
      return res.status(400).json({ message: 'You need to create a store first' });
    }

    let productData = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
    
    // Check if images are uploaded
    const images = [];
    if (req.files && req.files.images) {
      for (const file of req.files.images) {
        const result = await uploadImage(file.path);
        images.push(result);
        fs.unlinkSync(file.path);
      }
    }

    const product = await Product.create({
      vendorId: req.user._id,
      storeId: store._id,
      ...productData,
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a product
// @route   PATCH /api/vendor/products/:id
// @access  Private/Vendor
const updateVendorProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, vendorId: req.user._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let productData = req.body;
    if (req.body.data) {
        productData = JSON.parse(req.body.data);
    }
    
    // Update fields
    Object.keys(productData).forEach(key => {
      if (key !== 'images') {
         product[key] = productData[key];
      }
    });

    // Handle new images
    if (req.files && req.files.images) {
      for (const file of req.files.images) {
        const result = await uploadImage(file.path);
        product.images.push(result);
        fs.unlinkSync(file.path);
      }
    }
    
    // Handle image deletions if specified in productData (e.g. array of publicIds to remove)
    if (productData.imagesToRemove && Array.isArray(productData.imagesToRemove)) {
       for (const publicId of productData.imagesToRemove) {
          await deleteImage(publicId);
          product.images = product.images.filter(img => img.publicId !== publicId);
       }
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/vendor/products/:id
// @access  Private/Vendor
const deleteVendorProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, vendorId: req.user._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        await deleteImage(img.publicId);
      }
    }
    
    // Also delete images in variants if they exist
    if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
            if (variant.image && variant.image.publicId) {
                await deleteImage(variant.image.publicId);
            }
        }
    }

    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// --- ORDER CONTROLLERS ---

// @desc    Get vendor's orders
// @route   GET /api/vendor/orders
// @access  Private/Vendor
const getVendorOrders = async (req, res) => {
  try {
    if (!req.user.storeId) {
       return res.status(400).json({ message: 'Vendor does not have a store' });
    }
    const orders = await Order.find({ storeId: req.user.storeId })
      .populate('customerId', 'name email')
      .populate('items.productId', 'name images price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update order status
// @route   PATCH /api/vendor/orders/:id
// @access  Private/Vendor
const updateVendorOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, storeId: req.user.storeId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (req.body.status) {
        order.status = req.body.status;
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- CUSTOMER CONTROLLERS ---

// @desc    Get vendor's customers
// @route   GET /api/vendor/customers
// @access  Private/Vendor
const getVendorCustomers = async (req, res) => {
  try {
    if (!req.user.storeId) {
       return res.status(400).json({ message: 'Vendor does not have a store' });
    }
    // Find all orders for this store
    const orders = await Order.find({ storeId: req.user.storeId }).populate('customerId', 'name email');
    
    // Group by customer
    const customerMap = new Map();
    
    orders.forEach(order => {
        if (!order.customerId) return;
        
        const customerId = order.customerId._id.toString();
        if (!customerMap.has(customerId)) {
            customerMap.set(customerId, {
                _id: customerId,
                name: order.customerId.name,
                email: order.customerId.email,
                totalOrders: 0,
                totalSpent: 0
            });
        }
        
        const customerStats = customerMap.get(customerId);
        customerStats.totalOrders += 1;
        customerStats.totalSpent += order.totalAmount;
    });
    
    const customers = Array.from(customerMap.values());
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- ANALYTICS CONTROLLERS ---

// @desc    Get vendor analytics
// @route   GET /api/vendor/analytics
// @access  Private/Vendor
const getVendorAnalytics = async (req, res) => {
  try {
    if (!req.user.storeId) {
       return res.status(400).json({ message: 'Vendor does not have a store' });
    }
    
    const storeId = req.user.storeId;
    
    const orders = await Order.find({ storeId, status: { $ne: 'Cancelled' } });
    
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const totalOrders = orders.length;
    
    let productsSold = 0;
    orders.forEach(order => {
       order.items.forEach(item => {
           productsSold += item.quantity;
       });
    });
    
    const products = await Product.find({ storeId });
    const lowStockThreshold = 5;
    const lowStockProducts = products.filter(p => p.inventoryCount <= lowStockThreshold).length;
    
    // Monthly Revenue for chart
    const monthlyRevenue = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize months
    const currentYear = new Date().getFullYear();
    for(let i=0; i<12; i++) {
        monthlyRevenue.push({ name: months[i], revenue: 0 });
    }
    
    orders.forEach(order => {
        const orderDate = new Date(order.createdAt);
        if (orderDate.getFullYear() === currentYear) {
            monthlyRevenue[orderDate.getMonth()].revenue += order.totalAmount;
        }
    });

    res.json({
        totalRevenue,
        totalOrders,
        productsSold,
        lowStockProducts,
        monthlyRevenue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
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
};
