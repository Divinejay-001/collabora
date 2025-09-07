import React, { useContext } from 'react'
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
import UserProvider, { UserContext } from './context/Context';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <UserProvider>
      <div className='select-none'>
        <BrowserRouter>
          <Routes>
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

            {/* Root route decides where to go */}
            <Route path="/" element={<Root />} />

            {/* Optional 404 */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </div>

      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: '13px',
          },
        }}
      />
    </UserProvider>
  )
}

export default App

// Root route logic
const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return user.role === "admin"
    ? <Navigate to="/admin/dashboard" />
    : <Navigate to="/user/dashboard" />
}
