const express = require('express');
const { adminOnly, protect } = require('../middlewares/authMiddleware');
const { getUsers, getUserById, deleteUser } = require('../controllers/userController');

const router = express.Router();

// User Management Routes
router.get("/", protect, adminOnly, getUsers); // Get all users (only admin)
router.get("/:id", protect,  getUserById); //Get specific user 

module.exports = router;