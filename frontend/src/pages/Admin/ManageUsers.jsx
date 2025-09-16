import React, { useEffect, useState } from "react"
import DashBoardLayout from "../../components/layouts/DashBoardLayout"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"
import { LuFileSpreadsheet } from "react-icons/lu"
import Usercard from "../../components/Cards/Usercard"
import toast from "react-hot-toast"

const SkeletonCard = () => (
  <div className="user-card p-2 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    </div>
  </div>
)

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS)
      if (response.data?.length > 0) {
        setAllUsers(response.data)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Download users report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "users_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading user report:", error)
      toast.error("Failed to download user report")
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <DashBoardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        {/* ✅ Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100">
            Team Members
          </h2>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm rounded-md bg-primary text-white hover:opacity-90 flex-shrink-0"
            onClick={handleDownloadReport}
          >
            <LuFileSpreadsheet className="text-base" />
            Download Report
          </button>
        </div>

        {/* ✅ User Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : allUsers?.map((user) => (
                <Usercard key={user._id} userInfo={user} />
              ))}
        </div>
      </div>
    </DashBoardLayout>
  )
}

export default ManageUsers
