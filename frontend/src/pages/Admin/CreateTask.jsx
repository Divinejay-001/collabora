import React, { useState } from 'react'
import DashBoardLayout from '../../components/layouts/DashBoardLayout'
import { PRIORITY_DATA } from '../../utils/data'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { LuTrash2 } from 'react-icons/lu'

const CreateTask = () => {

  const location = useLocation();
  const {taskId} = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklists: [],
    attachments: []
  })

  const [currentTask, setCurrentTask] = useState(null)
  const [error, setError ] = useState("")
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)

  const handleValueChange = (key, value) =>{
    
  }

  return (
    <DashBoardLayout activeMenu='Create Tasks'>Create Task</DashBoardLayout>
  )
}

export default CreateTask