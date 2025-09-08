import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashBoardLayout from '../../components/layouts/DashBoardLayout';
import moment from 'moment';
import AvatarGroup from '../../components/AvatarGroup';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-50 text-cyan-500 border border-cyan-500/10 dark:border-cyan-300 dark:bg-cyan-900 dark:text-cyan-300";
      case "Completed":
        return "bg-lime-50 text-lime-600 border border-lime-500/20 dark:bg-lime-900 dark:text-lime-300";
      default:
        return "bg-violet-50 text-violet-500 border border-violet-500/10 dark:bg-violet-900 dark:text-violet-300";
    }
  };

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = 'http://' + link; // prepend http if missing
    }
  window.open(link, "_blank"); // opens attachment in new tab
};


  const getTaskDetailsById = async (taskId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodoChecklist = async (index) => {
  if (!task || !task.todoChecklists) return;

  // Clone current state
  const updatedTodos = [...task.todoChecklists];
  const taskId = id;

  // Toggle the value locally
  updatedTodos[index].completed = !updatedTodos[index].completed;

  // Optimistically update UI
  setTask({ ...task, todoChecklists: updatedTodos });

  try {
    const response = await axiosInstance.put(
      API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
      { todoChecklists: updatedTodos }
    );

    if (response.status === 200) {
      // Make sure state is synced with backend response
      setTask(response.data?.task || task);
    }
  } catch (error) {
    console.error("Failed to update checklist:", error);

    // Revert change if API call fails
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTask({ ...task, todoChecklists: updatedTodos });
  }
};


  useEffect(() => {
    if (id) {
      getTaskDetailsById(id);
    }
  }, [id]);

  return (
    <DashBoardLayout activeMenu='My Tasks'>
      <div className="mt-5">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4 animate-pulse">
            <div className="col-span-3 form-card bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="mt-4">
                <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
              </div>
              <div className="grid grid-cols-12 gap-4 mt-6">
                <div className="col-span-6 md:col-span-4">
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="col-span-6 md:col-span-4">
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-5 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="col-span-6 md:col-span-4">
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : task ? (
          <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
            <div className='col-span-3 form-card bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl md:text-xl font-medium text-gray-900 dark:text-gray-100'>
                  {task?.title}
                </h2>
                <div
                  className={`text-[13px] font-medium ${getStatusTagColor(task?.status)} px-4 py-0.5 rounded`}
                >
                  {task?.status}
                </div>
              </div>

              <div className='mt-4'>
                <InfoBox label="Description" value={task?.description} />
              </div>
              <div className='grid grid-cols-12 gap-4 mt-4'>
                <div className='col-span-6 md:col-span-4'>
                  <InfoBox label="Priority" value={task?.priority} />
                </div>
                <div className='col-span-6 md:col-span-4'>
                  <InfoBox
                    label='Due Date'
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("Do MMMM YYYY")
                        : "N/A"
                    }
                  />
                </div>
                <div className='col-span-6 md:col-span-4'>
                  <label className='text-xs font-medium text-slate-500 dark:text-slate-300'>
                    Assigned To
                  </label>
                  <AvatarGroup
                    avatars={task?.assignedTo?.map((item) => item?.profileImageUrl) || []}
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className='mt-2'>
                <label className='text-xs font-medium text-slate-500 dark:text-slate-300'>
                  Todo Checklist
                </label>
                {task?.todoChecklists?.map((item, index) => (
                  <TodoCheckList
                    key={`todo_${index}`}
                    text={item.text}
                    isChecked={item?.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>

              {task?.attachments?.length > 0 && (
                <div className='mt-2'>
                  <label htmlFor="" className='text-xs font-medium text-slate-500 '>
                    Attachments
                  </label>

                 {task?.attachments?.map((link, index) => (
                <Attachment 
                  key={`link_${index}`}
                  link={link}
                  index={index}
                  onClick={() => handleLinkClick(link)}
                />
              ))}


                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300 py-6">Task not found</p>
        )}
      </div>
    </DashBoardLayout>
  );
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => (
  <>
    <label className='text-xs font-medium text-slate-500 dark:text-slate-300'>{label}</label>
    <p className='text-[12px] md:text-[13px] font-medium text-gray-700 dark:text-gray-200 mt-0.5'>
      {value}
    </p>
  </>
);

const TodoCheckList = ({ text, isChecked, onChange }) => (
  <div className='flex items-center gap-3 p-2'>
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer'
    />
    <p className={`text-[13px] ${isChecked ? "line-through text-gray-500" : "text-gray-800 dark:text-gray-200"}`}>
      {text}
    </p>
  </div>
);

const Attachment = ({ link, index, onClick }) => {
  return <div className='flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2 cursor-pointer'
  onClick={onClick}
>
  <div className='flex-1 flex items-center gap-3 border border-gray-100'>
    <span className='text-xs text-gray-400 font-semibold mr-2'>
      {index < 9 ? `0${index + 1}` : index + 1}
    </span>

    <p className='text-xs text-black'>{link}</p>
  </div>
  <LuSquareArrowOutUpRight className='text-gray-400'/>
  </div>
}