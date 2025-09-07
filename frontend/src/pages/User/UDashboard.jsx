import React, { useEffect, useState, useContext } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/Context';
import DashBoardLayout from '../../components/layouts/DashBoardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';

// (Optional) Skeleton loader component using Tailwind animate-pulse
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse ${className}`} />
);

const COLORS = ["#8D517F", "#00B8DB", "#7BCE00"];

const UDashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "☀️ Good Morning";
    if (hour < 18) return "🌤️ Good Afternoon";
    if (hour < 21) return "🌆 Good Evening";
    return "🌙 Good Night";
  };

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || {};
    const taskPriorityLevels = data?.taskPriorityLevels || {};

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    const PriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setPieChartData(taskDistributionData);
    setBarChartData(PriorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      setLoading(true); // ✅ start loading
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || {});
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  const onSeeMore = () => {
    navigate('/admin/tasks');
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashBoardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div className="col-span-3">
          {loading ? (
            <div className="space-y-2">
              <SkeletonBox className="h-6 w-1/3" />
              <SkeletonBox className="h-4 w-1/4" />
            </div>
          ) : (
            <>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                {getGreeting()}{user?.name ? `, ${user.name}` : ''}!
              </h2>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                {moment().format("dddd, Do MMMM YYYY")}
              </p>
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          {loading ? (
            <>
              <SkeletonBox className="h-20 w-full" />
              <SkeletonBox className="h-20 w-full" />
              <SkeletonBox className="h-20 w-full" />
              <SkeletonBox className="h-20 w-full" />
            </>
          ) : (
            <>
              <InfoCard
                label="Total Tasks"
                value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.All || 0)}
                color="bg-primary"
              />
              <InfoCard
                label="Pending Tasks"
                value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Pending || 0)}
                color="bg-yellow-400"
              />
              <InfoCard
                label="In Progress Tasks"
                value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.InProgress || 0)}
                color="bg-cyan-400"
              />
              <InfoCard
                label="Completed Tasks"
                value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Completed || 0)}
                color="bg-green-500"
              />
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        {/* Task Distribution Chart */}
        <div className="card">
          {loading ? (
            <SkeletonBox className="h-56 w-full" />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h5 className="font-medium dark:text-white">Task Distribution</h5>
              </div>
              <CustomPieChart data={pieChartData} colors={COLORS} />
            </>
          )}
        </div>

        {/* Task Priority Levels */}
        <div className="card">
          {loading ? (
            <SkeletonBox className="h-56 w-full" />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h5 className="font-medium dark:text-white">Task Priority Levels</h5>
              </div>
              <CustomBarChart data={barChartData} />
            </>
          )}
        </div>

        {/* Recent Tasks */}
        <div className="card md:col-span-2">
          {loading ? (
            <SkeletonBox className="h-40 w-full" />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h5 className="text-lg dark:text-white">Recent Tasks</h5>
                <button className="card-btn" onClick={onSeeMore}>
                  See All <LuArrowRight className="text-base" />
                </button>
              </div>
              <TaskListTable tableData={dashboardData?.recentTasks || []} />
            </>
          )}
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default UDashboard;
