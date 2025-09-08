require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const path = require("path");
const multer = require("multer"); // ✅ You were missing this
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// ========== Multer Config ==========
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('MONGO_URI:', process.env.MONGO_URI);

const upload = multer({ storage, fileFilter });
// =====================================

// Middleware to handle cors
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://coollabora.netlify.app" // ✅ must be https
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Connect to the database
connectDB()

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ========== Image Upload Route ==========
app.post('/api/image/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  res.status(200).json({
    message: 'Image uploaded successfully',
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
