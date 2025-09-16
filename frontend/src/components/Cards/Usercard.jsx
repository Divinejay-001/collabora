import React from 'react'

const Usercard = ({ userInfo }) => {
  return (
    <div className="user-card p-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
          <img
            src={userInfo?.profileImageUrl || "/default-avatar.png"}
            alt="Avatar"
            className="rounded-full border-2 border-white w-14 h-14 sm:w-16 sm:h-16 object-cover"
          />

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm sm:text-base font-medium">{userInfo?.name}</p>
              {userInfo?.role && (
                <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs bg-green-100 text-green-600">
                  {userInfo.role}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>

      {/* Task Statuses */}
      <div className="flex flex-wrap gap-2 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  )
}

export default Usercard

// ✅ Fixed StatCard
const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-gray-100 text-cyan-500"
      case "Completed":
        return "bg-gray-100 text-green-500"
      default:
        return "bg-gray-100 text-violet-500"
    }
  }

  return (
    <div
      className={`flex-1 text-[11px] sm:text-[12px] font-medium ${getStatusTagColor()} 
        px-2 py-1 rounded text-center`}
    >
      <span className="font-semibold">{count}</span> {label}
    </div>
  )
}
