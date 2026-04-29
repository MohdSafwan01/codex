const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// POST /api/orders/purchase
const purchase = async (req, res) => {
  try {
    const { productIds } = req.body;
    const userId = req.user._id;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: 'Product IDs are required.' });
    }

    // Verify all products exist
    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'One or more products not found.' });
    }

    // Check if user already owns any of these products
    const user = await User.findById(userId);
    const alreadyOwned = productIds.filter(id =>
      user.purchases.some(p => p.toString() === id.toString())
    );
    if (alreadyOwned.length > 0) {
      return res.status(400).json({
        message: 'You already own one or more of these products.',
        alreadyOwned,
      });
    }

    // Calculate total
    const totalAmount = products.reduce((sum, p) => sum + p.price, 0);

    // Create order
    const order = await Order.create({
      userId,
      productIds,
      totalAmount,
    });

    // Add products to user's purchases
    await User.findByIdAndUpdate(userId, {
      $addToSet: { purchases: { $each: productIds } },
    });

    res.status(201).json({
      message: 'Purchase successful!',
      order: {
        id: order._id,
        products: products.map(p => ({ id: p._id, title: p.title, price: p.price })),
        totalAmount,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ message: 'Server error during purchase.' });
  }
};

// GET /api/orders/my-purchases
const getMyPurchases = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('purchases');
    res.json({
      purchases: user.purchases,
    });
  } catch (error) {
    console.error('Get purchases error:', error);
    res.status(500).json({ message: 'Server error fetching purchases.' });
  }
};

module.exports = { purchase, getMyPurchases };
