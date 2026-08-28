const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true }
}, { _id: false });

const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  options: {
    type: Map,
    of: String
  },
  price: { type: Number, required: true, min: 0 },
  inventoryCount: { type: Number, required: true, default: 0, min: 0 },
  image: imageSchema,
  isActive: { type: Boolean, default: true }
}, { _id: true });

const productSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  sku: {
    type: String,
    index: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  compareAtPrice: {
    type: Number,
    min: 0,
  },
  inventoryCount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  lowStockThreshold: {
    type: Number,
    default: 5,
    min: 0,
  },
  images: [imageSchema],
  variants: [variantSchema],
  status: {
    type: String,
    enum: ['draft', 'active', 'archived'],
    default: 'active',
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
