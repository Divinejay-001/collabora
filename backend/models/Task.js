const { text } = require('express');
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'medium' },
    status: { type: String, enum: ['pending', 'In Progress', 'Completed'], default: 'pending' },
    dueDate: { type: Date, required: true },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    attachments: { type: String},
    todoChecklists: [todoSchema],
    progress: { type: Number, default: 0 }, // Percentage of task completion
}, 
{ timestamps: true }

);

module.exports = mongoose.model('Task', taskSchema);