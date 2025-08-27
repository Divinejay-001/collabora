import React from 'react'
import Progress from '../Progress'
import AvatarGroup from '../AvatarGroup'
import { LuPaperclip } from 'react-icons/lu'
import moment from 'moment'

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoCheckList,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-50 text-cyan-500 border border-cyan-500/10 dark:border-cyan-300 dark:bg-cyan-900 dark:text-cyan-300";
      case "Completed":
        return "bg-lime-50 text-lime-600 border border-lime-500/20 dark:bg-lime-900 dark:text-lime-300";
      default:
        return "bg-violet-50 text-violet-500 border border-violet-500/10 dark:bg-violet-900 dark:text-violet-300";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Medium":
        return "bg-amber-50 text-amber-500 border border-amber-500/10 dark:bg-amber-900 dark:text-amber-300";
      case "Low":
        return "bg-emerald-50 text-emerald-500 border border-emerald-500/10 dark:bg-emerald-900 dark:text-emerald-300";
      default:
        return "bg-rose-50 text-rose-500 border border-rose-500/10 dark:bg-rose-900 dark:text-rose-300";
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl py-4 shadow-md shadow-gray-100 dark:shadow-gray-900 border border-gray-200/50 dark:border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      {/* Top Tags */}
      <div className="flex items-end gap-3 px-4">
        <div className={`text-[11px] font-medium px-4 py-0.5 rounded ${getStatusTagColor()}`}>
          {status}
        </div>
        <div className={`text-[11px] font-medium px-4 py-0.5 rounded ${getPriorityTagColor()}`}>
          {priority} Priority
        </div>
      </div>

      {/* Content */}
      <div
        className={`px-4 border-l-[3px] ${
          status === "In Progress"
            ? "border-cyan-500"
            : status === "Completed"
            ? "border-lime-500"
            : "border-violet-500"
        }`}
      >
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-4 line-clamp-2">
          {title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-[18px]">
          {description}
        </p>

        <p className="text-[13px] text-gray-700/80 dark:text-gray-300 font-medium mt-2 mb-2 leading-[18px]">
          Task Done:{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {completedTodoCount} / {todoCheckList.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      {/* Bottom Row */}
      <div className="px-4">
        <div className="flex items-center justify-between my-1">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400">Start Date</label>
            <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100">
              {moment(createdAt).format("Do MMM YYYY")}
            </p>
          </div>
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400">Due Date</label>
            <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100">
              {moment(dueDate).format("Do MMM YYYY")}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <AvatarGroup avatars={assignedTo || []} />

          {attachmentCount > 0 && (
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900 px-2.5 py-1.5 rounded-lg">
              <LuPaperclip className="text-primary" />{" "}
              <span className="text-xs text-gray-900 dark:text-gray-100">{attachmentCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
