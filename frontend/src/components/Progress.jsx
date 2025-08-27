import React from 'react'

const Progress = ({progress, status }) => {
  const getColor = () =>{
    switch (status) {
        case "In Progress":
            return "bg-cyan-500 text-cyan-500 border border-cyan-500/10 dark:border-cyan-300 dark:bg-cyan-800";

            case "Completed":
                return "text-indigo-500 bg-indigo-500 border border-indigo-500/20";

        default:
            return "text-violet-500 bg-violet-500 border border-violet-500/10";
    }
  }

  return (
  <div className="w-full bg-gray-200 rounded-full h-1.5">
    <div
      className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`}
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);
}
export default Progress