import React from 'react'

import './App.css'
import "@fontsource/outfit";         // Regular (400)
import "@fontsource/outfit/600.css"; // Semi-bold
import "@fontsource/outfit/700.css"; // Bold
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import PrivateRoutes from './routes/PrivateRoutes'
import Dashboard from './pages/Admin/Dashboard'
import ManageTasks from './pages/Admin/ManageTasks'
import CreateTask from './pages/Admin/CreateTask'
import ManageUsers from './pages/Admin/ManageUsers'
import UDashboard from './pages/User/UDashboard'
import MyTasks from './pages/User/MyTasks'
import ViewTaskDetails from './pages/User/ViewTaskDetails'


function App() {

  return (
    <div>
     <BrowserRouter>
  <Routes>
    {/* Redirect / to /login */}
    <Route path="/" element={<Navigate to="/login" />} />

    {/* Auth */}
    <Route path="/login" element={<Login />} />
    <Route path="/signUp" element={<Signup />} />

    {/* Admin routes */}
    <Route element={<PrivateRoutes allowedRoles={['admin']} />}>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/tasks" element={<ManageTasks />} />
      <Route path="/admin/create-task" element={<CreateTask />} />
      <Route path="/admin/users" element={<ManageUsers />} />
    </Route>

    {/* User routes */}
    <Route element={<PrivateRoutes allowedRoles={['user']} />}>
      <Route path="/user/dashboard" element={<UDashboard />} />
      <Route path="/user/tasks" element={<MyTasks />} />
      <Route path="/user/tasks-details/:id" element={<ViewTaskDetails />} />
    </Route>

    {/* Optional 404 */}
    <Route path="*" element={<div>404 Not Found</div>} />
  </Routes>
</BrowserRouter>

      
    </div>
  )
}

export default App
