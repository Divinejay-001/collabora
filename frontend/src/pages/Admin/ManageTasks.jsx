import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]); // ✅ fixed destructuring
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false); // ✅ loader state

  const navigate = useNavigate();

  const getAllTasks = async () => {
    setLoading(true); // show loader before fetch
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      // Map status summary
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
      setLoading(false); // stop loader
    }
  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  const handleDownloadReport = async () => {
   
  }
  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  return (
    <DashBoardLayout activeMenu="Manage Tasks">
      <div className="my-5">
       <div className="flex flex-col md:items-center justify-between">
        <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>

        <button
        className="flex md:hidden download-btn"
        onClick={handleDownloadReport}
        >
          <LuFileSpreadsheet className="text-lg"/>
          Download Report
        </button>
       </div>
       </div>
      </div>
    </DashBoardLayout>
  );
};

export default ManageTasks;
