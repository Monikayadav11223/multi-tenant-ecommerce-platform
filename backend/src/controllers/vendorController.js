const Store = require('../models/Store');
const Product = require('../models/Product');
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

module.exports = {
  getVendorStore,
  createVendorStore,
  updateVendorStore,
  getVendorProducts,
  getVendorProductById,
  createVendorProduct,
  updateVendorProduct,
  deleteVendorProduct
};
