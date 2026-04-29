const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Storage for cover images
const coverImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'codex/covers',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'fill' }],
  },
});

// Storage for product files (PDFs, ebooks, etc.)
const productFileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'codex/files',
    resource_type: 'raw',
    allowed_formats: ['pdf', 'epub', 'zip'],
  },
});

const uploadCover = multer({ storage: coverImageStorage });
const uploadFile = multer({ storage: productFileStorage });

module.exports = { uploadCover, uploadFile };
