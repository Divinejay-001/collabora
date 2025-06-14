const Task = require("../models/Task")

// Get all tasks (Admin all, User: only assigned tasks )
// @route GET /api/tasks
// @access Private
const getTasks = async (req, res) => {
    try {
       const { status } = req.query;
       let filter = {};
          
       if (status) {
        filter.status = status;
       }

       let tasks;

       if (req.user.role === "admin"){
        tasks = await Task.find(filter).populate(
            "assignedTo",
            "name email profileImageUrl"
        );
       } else{
        tasks = await Task.find({...filter, assignedTo: req.user._id }).populate(
            "assignedTo",
            "name email profileImageUrl"
        );
       }

       // Add completed todo checklist count
       tasks = await Promise.all(
              tasks.map(async (task) => {
                const completedCount = Array.isArray(task.todoCheckLists)
                ? task.todoCheckLists.filter((item) => item.completed).length
                : 0;
              

                return {
                    ...task._doc,
                    completedTodoCount: completedCount,
                }
                    
         })
       );

       // Status summary counts
       const allTasks = await Task.countDocuments(
        req.user.role === "admin" ? {} : { assignedTo: req.user._id }
       );

       const pendingTasks = await Task.countDocuments({
        ...filter,
        status: "Pending",
        ...(req.user.role !== "admin" &&  { assignedTo: req.user._id }),
       });

       const inProgressTasks = await Task.countDocuments({
        ...filter,
        status: "In Progress",
        ...(req.user.role !== "admin" &&  { assignedTo: req.user._id }),
       });

       const completedTasks = await Task.countDocuments({
        ...filter,
        status: "Completed",
        ...(req.user.role !== "admin" &&  { assignedTo: req.user._id }),
       });

       res.json({
            tasks,
            statusSummary: {
              all:  allTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks
            }
       });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get task by ID
// @route GET /api/tasks/:id
// @access Private
const getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      } 
      res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Create a new task(Admin only)
// @route POST /api/tasks
// @access Private
const createTask = async (req, res) => {
    try {
      const {
        title,
        description,
        priority,
        dueDate,
        assignedTo,
        attachments,
        todoCheckLists,
      }  = req.body;

      if (!Array.isArray(assignedTo)){
        return res
        .status(400)
        .json({ message: "AssignedTo must be an array of user IDs" });
      }

      const task =  await Task.create({
        title,
        description,
        priority,
        dueDate,
        assignedTo,
        createdBy: req.user._id,
        todoCheckLists,
        attachments,
      });

      res.status(201).json({
        message: "Task created successfully",
        task
      });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// update task status (Admin only)
// @route PUT /api/tasks/:id/status
// @access Private
const updateTask = async (req, res) => {
    try {
       const task = await  Task.findById(req.params.id);
         if (!task) {
          return res.status(404).json({ message: "Task not found" });
         }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.todoCheckLists = req.body.todoCheckLists || task.todoCheckLists;
        task.attachments = req.body.attachments || task.attachments; 

        if (req.body.assignedTo){
            if (!Array.isArray(req.body.assignedTo)) {
                return res
                .status(400)
                .json({ message: "AssignedTo must be an array of user IDs" });
        }
            task.assignedTo = req.body.assignedTo;
        }
        const updatedTask = await task.save();
        res.json({
            message: "Task updated successfully",
             updatedTask
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Delete a task (Admin only)
// @route DELETE /api/tasks/:id
// @access Private
const deleteTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      await task.deleteOne(); // ⬅️ only runs if task exists
      res.json({ message: "Task deleted successfully" }); // ⬅️ send response
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// Update task status 
// @route PUT /api/tasks/:id/status
// @access Private
const updateTaskStatus = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });
  
      // Check if user is assigned to the task or is an admin
      const isAssigned = task.assignedTo.some(
        (userId) => userId.toString() === req.user._id.toString()
      );
  
      if (!isAssigned && req.user.role !== "admin") {
        return res.status(403).json({ message: "Not Authorized" });
      }
  
      // Update status
      task.status = req.body.status || task.status;
  
      // If completed, mark all checklist items as done
      if (task.status === "Completed") {
        task.todoCheckLists.forEach(item => item.Completed = true);
        task.progress = 100;
      }
  
      await task.save();
  
      res.json({
        message: "Task status updated successfully",
        task
      });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// Update task checklist
// @route PUT /api/tasks/:id/todo
// @access Private
const updateTaskChecklist = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        const { todoChecklist } = req.body;

        // Check if user is assigned to the task or is an admin
        const isAssigned = task.assignedTo.some(
            (id) => id.toString() === req.user._id.toString()
        );

        if (!isAssigned && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not Authorized To Update Checklist" });
        }

        task.todoChecklists = todoChecklist;

        // Auto-calculate progress
        const completedCount = task.todoChecklists.filter(item => item.completed).length;
        const totalItems = task.todoChecklists.length;
        task.progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

        // Auto-update task status
        if (task.progress === 100) {
            task.status = "Completed";
        } else if (task.progress > 0) {
            task.status = "In Progress";
        } else {
            task.status = "Pending";
        }

        await task.save();

        const updatedTask = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        );

        res.json({
            message: "Task checklist updated successfully",
            task: updatedTask
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get dashboard data (Admin only)
// @route GET /api/tasks/dashboard-data
// @access Private
const getDashboardData = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// Get user dashboard data (User only)
// @route GET /api/tasks/user-dashboard-data
// @access Private
const getUserDashboardData = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask, 
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData
};