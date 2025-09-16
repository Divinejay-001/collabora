import React, { useState, useEffect } from 'react';
import DashBoardLayout from '../../components/layouts/DashBoardLayout';
import { PRIORITY_DATA } from '../../utils/data';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuTrash2 } from 'react-icons/lu';
import SelectDropdown from '../../components/Input/SelectDropdown';
import SelectUsers from '../../components/Input/SelectUsers';
import TodoListInput from '../../components/Input/TodoListInput';
import AddAttachmentsInput from '../../components/Input/AddAttachmentsInput';

const CreateTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskId } = location.state || {};

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    dueDate: '',
    assignedTo: [],
    todoChecklists: [],   // ✅ FIX: use consistent lowercase key
    attachments: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: '',
      description: '',
      priority: 'Low',
      dueDate: '',
      assignedTo: [],
      todoChecklists: [],
      attachments: [],
    });
    setError('');
  };

  // ✅ Fetch task if editing
  useEffect(() => {
    if (taskId) getTaskDetailsById();
  }, [taskId]);

  const getTaskDetailsById = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));
      if (res?.data) {
        setTaskData({
          title: res.data.title || '',
          description: res.data.description || '',
          priority: res.data.priority || 'Low',
          dueDate: res.data.dueDate ? res.data.dueDate.split('T')[0] : '',
          assignedTo: res.data.assignedTo || [],
          todoChecklists: (res.data.todoChecklists || []).map((item) =>
            typeof item === "string" ? { text: item, completed: false } : item
          ),
          attachments: res.data.attachments || [],
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch task');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    setLoading(true);
    try {
      const payload = {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
        assignedTo: taskData.assignedTo.map((u) => u._id || u.id || u),
        attachments: taskData.attachments.map((att) =>
          typeof att === 'string' ? att : att.url || ''
        ),
        todoChecklists: taskData.todoChecklists.map((item) =>
          typeof item === 'string'
            ? { text: item, completed: false }
            : { text: item.text, completed: !!item.completed }
        ),
      };

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, payload);
      toast.success('Task Created Successfully');
      clearData();
      navigate('/admin/create-task');
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    try {
      setLoading(true);
      const payload = {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
        assignedTo: taskData.assignedTo.map((u) => u._id || u.id || u),
        attachments: taskData.attachments.map((att) =>
          typeof att === 'string' ? att : att.url || ''
        ),
        todoChecklists: taskData.todoChecklists.map((item) =>
          typeof item === 'string'
            ? { text: item, completed: false }
            : { text: item.text, completed: !!item.completed }
        ),
      };

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), payload);
      toast.success('Task updated successfully');
      navigate('/admin/create-task');
    } catch (err) {
      console.error(err);
      toast.error('Error updating task');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      toast.success('Task deleted');
// inside createTask, updateTask, deleteTask success cases:
navigate('/admin/tasks');  // ✅ instead of /admin/create-task
    } catch {
      toast.error('Failed to delete task');
    } finally {
      setLoading(false);
      setOpenDeleteAlert(false);
    }
  };

  const handleSubmit = async () => {
    setError('');

    if (!taskData.title.trim()) return setError('Task title is required.');
    if (!taskData.description.trim()) return setError('Description is required.');
    if (!taskData.dueDate) return setError('Due date is required.');
    if (taskData.assignedTo?.length === 0) return setError('Task not assigned to any member.');
    if (taskData.todoChecklists?.length === 0) return setError('Add at least one todo task.');

    if (taskId) {
      updateTask();
    } else {
      createTask();
    }
  };

  return (
    <DashBoardLayout activeMenu="Create Tasks">
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="form-card col-span-3 bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-700 dark:text-white">
                {taskId ? 'Update Task' : 'Create Task'}
              </h2>
              {taskId && (
                <button
                  onClick={() => setOpenDeleteAlert(true)}
                  className="flex items-center gap-1.5 text-sm text-red-500 dark:text-red-100 border border-rose-200 bg-rose-50 dark:bg-rose-500 hover:bg-rose-100 px-3 py-1.5 rounded"
                >
                  <LuTrash2 className="text-base" />
                  Delete
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Task Title
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Create App UI"
                  value={taskData.title}
                  onChange={(e) => handleValueChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="form-input"
                  placeholder="Describe task..."
                  value={taskData.description}
                  onChange={(e) => handleValueChange('description', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Priority
                  </label>
                  <SelectDropdown
                    options={PRIORITY_DATA}
                    value={taskData.priority}
                    onChange={(val) => handleValueChange('priority', val)}
                    placeholder="Select Priority"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    value={taskData.dueDate || ''}
                    onChange={(e) => handleValueChange('dueDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Assign To
                  </label>
                  <SelectUsers
                    selectedUsers={taskData.assignedTo}
                    setSelectedUsers={(val) => handleValueChange('assignedTo', val)}
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  TODO CHECKLIST
                </label>
                <TodoListInput
                  todoList={taskData.todoChecklists}
                  setTodoList={(value) => handleValueChange('todoChecklists', value)}
                />
              </div>

              <div className="mt-3">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Add Attachments
                </label>
                <AddAttachmentsInput
                  attachments={taskData.attachments}
                  setAttachments={(value) => handleValueChange('attachments', value)}
                />
              </div>

              {error && <p className="text-red-600 text-xs mt-5">{error}</p>}

              <div className="mt-6 flex justify-end">
                <button onClick={handleSubmit} className="add-btn" disabled={loading}>
                  {loading ? 'Saving...' : taskId ? 'UPDATE TASK' : 'CREATE TASK'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
    {/* Delete Confirmation Modal */}
{openDeleteAlert && (
  <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-white">
          Delete Task?
        </h3>
        <p className="text-sm text-slate-500 mt-2">
          This action cannot be undone.
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => setOpenDeleteAlert(false)}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={deleteTask}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      </div>
    </DashBoardLayout>
  );
};

export default CreateTask;
