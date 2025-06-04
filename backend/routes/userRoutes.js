const express = require('express');
const { adminOnly, protect } = require('../middlewares/authMiddleware');
const { getUsers, getUserById, deleteUser } = require('../controllers/userController');

const router = express.Router();

// User Management Routes
router.get("/", protect, adminOnly, getUsers); // Get all users (only admin)
router.get("/:id", protect,  getUserById); //Get specific user 
router.delete("/:id", protect, adminOnly, deleteUser); // Delete user (only admin)

module.exports = router;