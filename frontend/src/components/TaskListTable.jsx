import React from "react";
import moment from "moment";

const TaskListTable = ({ tableData }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600 dark:bg-green-800/20 dark:text-green-300 border border-green-200/60";
      case "Pending":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-800/20 dark:text-yellow-300 border border-yellow-200/60";
      case "In Progress":
        return "bg-cyan-100 text-cyan-600 dark:bg-cyan-800/20 dark:text-cyan-300 border border-cyan-200/60";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-300 border border-gray-300/40";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600 dark:bg-red-800/20 dark:text-red-300 border border-red-200/60";
      case "Medium":
        return "bg-orange-100 text-orange-600 dark:bg-orange-800/20 dark:text-orange-300 border border-orange-200/60";
      case "Low":
        return "bg-green-100 text-green-600 dark:bg-green-800/20 dark:text-green-300 border border-green-200/60";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-300 border border-gray-300/40";
    }
  };

  return (
    <div className="mt-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-black/30">
            <tr className="text-left text-[13px] text-gray-700 dark:text-gray-300 font-medium">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Created On</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-black/20 text-[13px] text-gray-700 dark:text-gray-300">
            {tableData.map((task) => (
              <tr
                key={task._id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="py-3 px-4 truncate capitalize">{task.title}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${getStatusBadgeColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${getPriorityBadgeColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {task.createdAt
                    ? moment(task.createdAt).format("MMM D, YYYY")
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {tableData.map((task) => (
          <div
            key={task._id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black/20 shadow-sm"
          >
            <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
              {task.title}
            </h4>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span
                className={`px-2 py-1 font-semibold rounded ${getStatusBadgeColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
              <span
                className={`px-2 py-1 font-semibold rounded ${getPriorityBadgeColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {task.createdAt
                  ? moment(task.createdAt).format("MMM D, YYYY")
                  : "N/A"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListTable;
