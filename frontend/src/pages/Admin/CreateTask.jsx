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
    todoChecklists: [],
    attachments: [],
  });

  const [loading, setLoading] = useState(false);
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
  };

  // Load task if editing
  useEffect(() => {
    if (taskId) getTaskDetailsById();
  }, [taskId]);

  const getTaskDetailsById = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`${API_PATHS.TASKS}/${taskId}`);
      if (res?.data) {
        setTaskData(res.data);
      }
    } catch (err) {
      toast.error('Failed to fetch task');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    try {
      setLoading(true);
      await axiosInstance.post(API_PATHS.TASKS, taskData);
      toast.success('Task created successfully');
      clearData();
      navigate('/dashboard/tasks');
    } catch (err) {
      toast.error('Error creating task');
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    try {
      setLoading(true);
      await axiosInstance.put(`${API_PATHS.TASKS}/${taskId}`, taskData);
      toast.success('Task updated successfully');
      navigate('/dashboard/tasks');
    } catch (err) {
      toast.error('Error updating task');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`${API_PATHS.TASKS}/${taskId}`);
      toast.success('Task deleted');
      navigate('/dashboard/tasks');
    } catch (err) {
      toast.error('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!taskData.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    if (taskId) {
      await updateTask();
    } else {
      await createTask();
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
                  className="flex items-center gap-1.5 text-sm text-red-500 border border-rose-200 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded"
                >
                  <LuTrash2 className="text-base" />
                  Delete
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Task Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Create App UI"
                  value={taskData.title}
                  onChange={(e) => handleValueChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Description</label>
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
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Priority</label>
                  <SelectDropdown
                    options={PRIORITY_DATA}
                    value={taskData.priority}
                    onChange={(val) => handleValueChange('priority', val)}
                    placeholder="Select Priority"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Due Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={taskData.dueDate || ''}
                    onChange={(e) => handleValueChange('dueDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Assign To</label>
                  <SelectUsers
                    selectedUsers={taskData.assignedTo}
                    setSelectedUsers={(val) => handleValueChange('assignedTo', val)}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : taskId ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* You can add a Delete Confirmation Modal here using openDeleteAlert */}
      </div>
    </DashBoardLayout>
  );
};

export default CreateTask;
