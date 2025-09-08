const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "collabora", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

// Create the upload middleware
const upload = multer({ storage });

module.exports = upload;
