import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getAllTasks = async () => {
    setLoading(true); 
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASKS, {
        params: { status: filterStatus === "All" ? "" : filterStatus },
      });

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgress || 0 },
        { label: "Completed", count: statusSummary.completed || 0 },
      ];
      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  const handleDownloadReport = async () => {};

  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  return (
    <DashBoardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>

            <button
              className="flex lg:hidden download-btn"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>

          {tabs?.[0]?.count > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />
              <button
                className="hidden lg:flex download-btn"
                onClick={handleDownloadReport}
              >
                <LuFileSpreadsheet className="text-lg" />
                Download Report
              </button>
            </div>
          )}
        </div>

        {/* 🔹 Show Skeleton Loader while fetching */}
        {loading ? (
          <div className="space-y-4 mt-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse p-4 border rounded-lg bg-gray-100"
              >
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : allTasks.length > 0 ? (
          <div className="mt-6 space-y-3">
            {allTasks.map((task) => (
              <div
                key={task._id}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => handleClick(task)}
              >
                <h3 className="font-semibold  dark:text-gray-500">{task.title}</h3>
                <p className="text-sm dark:text-gray-500 dark:hover:text-gray-800 text-gray-600">{task.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-gray-500">No tasks found.</p>
        )}
      </div>
    </DashBoardLayout>
  );
};

export default ManageTasks;
