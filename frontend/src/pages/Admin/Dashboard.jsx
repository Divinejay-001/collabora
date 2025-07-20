import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useContext } from 'react'
import { UserContext } from '../../context/Context'
import DashBoardLayout from '../../components/layouts/DashBoardLayout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import moment from 'moment'
import InfoCard from '../../components/Cards/InfoCard'
import { addThousandsSeparator } from '../../utils/helper'

const Dashboard = () => {
  useUserAuth()

  const {user} = useContext(UserContext)

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get
        (
        API_PATHS.TASKS.GET_DASHBOARD_DATA
        );
        if(response.data) {
      setDashboardData(response.data);
        }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);
  return (
    <DashBoardLayout activeMenu="Dashboard">
      <div className='card my-5'>
        <div className=''>
          <div className='col-span-3'>
            <h2 className='text-xl md:text-2xl'>Good Morning!{user?.name}</h2>
            <p className='text-xs md:text-[13px] text-gray-500 mt-1.5'>
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5'>
      <InfoCard
      // icon={<IoMdCard/>}
      label="Total Tasks"
      value={addThousandsSeparator(
        dashboardData?.charts?.taskDistribution?.All || 0
      )}
      color="bg-primary"
      />
        </div>
      </div>
      </DashBoardLayout>
  )
}

export default Dashboard