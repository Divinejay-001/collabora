import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useContext } from 'react'
import { UserContext } from '../../context/Context'
import DashBoardLayout from '../../components/layouts/DashBoardLayout'

const Dashboard = () => {
  useUserAuth()

  const {user} = useContext(UserContext)
  return (
    <DashBoardLayout>Dashboard</DashBoardLayout>
  )
}

export default Dashboard