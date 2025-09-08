const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, deleteTask, updateTaskStatus, updateTaskChecklist, updateTask  
} = require('../controllers/taskController');

const router = express.Router();

//Task Management Router
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); // Get all tasks
router.get("/:id", protect, getTaskById); // Get specific task by ID
router.post("/", protect, adminOnly, createTask); // Create a new task
router.delete("/:id/", protect, adminOnly, deleteTask); // Delete a task
router.put("/:id/status", protect,  updateTaskStatus); // Update a task
router.put("/:id/todo", protect,  updateTaskChecklist); // Update a task
router.put("/:id", protect, adminOnly, updateTask); // 👈 New route here


 module.exports= router;