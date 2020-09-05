const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudKey,
  api_secret: process.env.cloudSecret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'nightstand',
      format: async (req, file) => 'jpg',
      public_id: (req, file) => file.originalname,
    }
});

module.exports = multer({ storage });