const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Ebook', 'Notes', 'PDF', 'Course'],
  },
  coverImageUrl: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  cloudinaryPublicId: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
