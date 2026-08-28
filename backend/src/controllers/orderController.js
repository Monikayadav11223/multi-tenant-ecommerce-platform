const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/Customer
const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  try {
    // Assuming single-store checkout for simplicity
    const storeId = orderItems[0].storeId;

    const order = new Order({
      storeId,
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get logged in customer orders
// @route   GET /api/orders/myorders
// @access  Private/Customer
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get orders for a vendor's store
// @route   GET /api/orders/vendor
// @access  Private/Vendor
const getVendorOrders = async (req, res) => {
  try {
    const storeId = req.user.storeId;
    if (!storeId) {
       return res.status(403).json({ message: 'User does not have an associated store' });
    }
    // Isolate data to only this tenant
    const orders = await Order.find({ storeId }).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getVendorOrders,
};
