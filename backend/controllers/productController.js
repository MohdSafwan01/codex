const Product = require('../models/Product');

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error fetching products.' });
  }
};

// GET /api/products/:id
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error fetching product.' });
  }
};

// POST /api/products (admin)
const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const coverImageUrl = req.files?.coverImage?.[0]?.path || req.body.coverImageUrl;
    const fileUrl = req.files?.file?.[0]?.path || req.body.fileUrl;

    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const product = await Product.create({
      title,
      description,
      price: Number(price),
      category,
      coverImageUrl: coverImageUrl || 'https://picsum.photos/seed/default/800/600',
      fileUrl: fileUrl || '',
      cloudinaryPublicId: req.files?.file?.[0]?.filename || null,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error creating product.' });
  }
};

module.exports = { getAllProducts, getProduct, createProduct };
