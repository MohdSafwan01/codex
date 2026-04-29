const cloudinary = require('../config/cloudinary');
const User = require('../models/User');
const Product = require('../models/Product');

// GET /api/download/:productId
const downloadProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    // Check if user owns the product
    const user = await User.findById(userId);
    const ownsProduct = user.purchases.some(p => p.toString() === productId);

    if (!ownsProduct) {
      return res.status(403).json({ message: 'You do not own this product.' });
    }

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Generate a signed URL with 60-second expiry
    if (product.cloudinaryPublicId) {
      const signedUrl = cloudinary.url(product.cloudinaryPublicId, {
        resource_type: 'raw',
        sign_url: true,
        type: 'authenticated',
        expires_at: Math.floor(Date.now() / 1000) + 60,
      });

      return res.json({ downloadUrl: signedUrl, expiresIn: 60 });
    }

    // Fallback: return the direct file URL
    res.json({ downloadUrl: product.fileUrl, expiresIn: null });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Server error generating download link.' });
  }
};

module.exports = { downloadProduct };
