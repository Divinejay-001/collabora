import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import toast from "react-hot-toast";

// ✅ Skeleton loader (reusable box)
const SkeletonBox = ({ className }) => (
  <div
    className={`bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse ${className}`}
  />
);

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

      setAllTasks(response.data?.tasks || []);

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

  // ✅ Download report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tasks_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading task report:", error);
      toast.error("Failed to download task report");
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  return (
    <DashBoardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        {/* ✅ Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {loading ? (
            <SkeletonBox className="h-6 w-1/3" />
          ) : (
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100">
                My Tasks
              </h2>
              <button
                className="flex sm:hidden items-center gap-2 px-3 py-1.5 text-xs rounded-md bg-primary text-white hover:opacity-90"
                onClick={handleDownloadReport}
              >
                <LuFileSpreadsheet className="text-base" />
                Download
              </button>
            </div>
          )}

          {!loading && tabs?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />
              <button
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm rounded-md bg-primary text-white hover:opacity-90"
                onClick={handleDownloadReport}
              >
                <LuFileSpreadsheet className="text-base" />
                Download Report
              </button>
            </div>
          )}
        </div>

        {/* ✅ Task Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200/50 dark:border-gray-700"
              >
                <SkeletonBox className="h-5 w-1/2 mb-3" />
                <SkeletonBox className="h-4 w-2/3 mb-2" />
                <SkeletonBox className="h-4 w-1/3 mb-4" />
                <SkeletonBox className="h-10 w-full rounded-lg" />
              </div>
            ))
          ) : allTasks?.length > 0 ? (
            allTasks.map((item) => (
              <TaskCard
                key={item._id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo?.map(
                  (user) => user.profileImageUrl
                )}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklists={item.todoChecklists || []}
                onClick={() => handleClick(item)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-6 col-span-3">
              No tasks found for this status.
            </p>
          )}
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default ManageTasks;
