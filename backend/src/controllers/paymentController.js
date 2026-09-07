const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Store = require('../models/Store');
const { sendOrderConfirmationEmail } = require('../utils/email');

const createCheckoutSession = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const lineItems = [];
    const validItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(400).json({ message: 'Product not found' });
      if (product.status !== 'active') return res.status(400).json({ message: 'Product is not active' });
      if (product.inventoryCount < item.quantity) return res.status(400).json({ message: 'Insufficient inventory' });

      validItems.push({
         productId: product._id.toString(),
         storeId: product.storeId.toString(),
         quantity: item.quantity,
         price: product.price,
         name: product.name
      });

      lineItems.push({
        price_data: {
          currency: 'inr',
          product_data: { name: product.name },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: req.user.email,
      metadata: {
        customerId: req.user._id.toString(),
        shippingAddress: JSON.stringify(shippingAddress),
        items: JSON.stringify(validItems.map(i => ({ pId: i.productId, sId: i.storeId, q: i.quantity, pr: i.price })))
      },
      success_url: (process.env.FRONTEND_URL || 'http://localhost:5173') + '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: (process.env.FRONTEND_URL || 'http://localhost:5173') + '/checkout/cancel',
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature failed.', err.message);
    return res.status(400).send('Webhook Error: ' + err.message);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await handleCheckoutSession(session);
  }

  res.status(200).end();
};

const handleCheckoutSession = async (session) => {
  const checkoutSessionId = session.id;
  const existingOrder = await Order.findOne({ checkoutSessionId });
  if (existingOrder) {
    console.log('Duplicate webhook handled for session:', checkoutSessionId);
    return;
  }

  const { customerId, shippingAddress: addressStr, items: itemsStr } = session.metadata;
  const shippingAddress = JSON.parse(addressStr);
  const items = JSON.parse(itemsStr);

  const storeGroups = {};
  for (const item of items) {
    if (!storeGroups[item.sId]) storeGroups[item.sId] = [];
    storeGroups[item.sId].push(item);
  }

  const createdOrders = [];
  
  for (const storeId of Object.keys(storeGroups)) {
    const storeItems = storeGroups[storeId];
    
    let totalAmount = 0;
    const formattedItems = [];
    
    for (const item of storeItems) {
      const product = await Product.findById(item.pId);
      if (product && product.inventoryCount >= item.q) {
         product.inventoryCount -= item.q;
         await product.save();
         totalAmount += (item.pr * item.q);
         formattedItems.push({
           productId: item.pId,
           quantity: item.q,
           price: item.pr
         });
      }
    }

    if (formattedItems.length > 0) {
      const order = await Order.create({
        checkoutSessionId,
        storeId,
        customerId,
        items: formattedItems,
        totalAmount,
        status: 'Pending',
        paymentStatus: 'Paid',
        shippingAddress
      });
      createdOrders.push(order);
    }
  }

  try {
     const user = await User.findById(customerId);
     if (user) {
        await sendOrderConfirmationEmail(createdOrders, user.email, user.name);
     }
  } catch (e) {
     console.error('Email failed:', e);
  }
};

module.exports = { createCheckoutSession, webhook };
