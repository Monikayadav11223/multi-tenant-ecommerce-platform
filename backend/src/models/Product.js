const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true, // Crucial for tenant isolation
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  inventoryCount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  images: [{
    type: String, // Cloudinary URLs
  }],
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
