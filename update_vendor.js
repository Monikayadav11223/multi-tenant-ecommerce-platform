const fs = require('fs');
const path = require('path');

const controllerPath = path.join(__dirname, 'backend', 'src', 'controllers', 'vendorController.js');
let content = fs.readFileSync(controllerPath, 'utf8');

const newMethods = `
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
      .populate('products.productId', 'name images price')
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
       order.products.forEach(item => {
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
`;

// Insert the models
content = content.replace("const Product = require('../models/Product');", "const Product = require('../models/Product');\nconst Order = require('../models/Order');\nconst User = require('../models/User');");

// Insert new methods before module.exports
content = content.replace("module.exports = {", newMethods + "\nmodule.exports = {");

// Add to exports
content = content.replace("deleteVendorProduct", "deleteVendorProduct,\n  getVendorOrders,\n  updateVendorOrderStatus,\n  getVendorCustomers,\n  getVendorAnalytics");

fs.writeFileSync(controllerPath, content);
console.log('Vendor controller updated');
