import React, { useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/Context'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  // Handle LOgin Form Submission
  const handleLogin = async (e) =>{
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }

    if (!password) {
     setError("Please enter the paasword");
     return;
    }

    setError("")

    // Call the API to login
    try{
      console.log('Email:', email, 'Password:', password);
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      })
      
      const { token, role } = response.data;

      if(token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        //Redirect based on role
        if(role === "admin") {
          navigate("/admin/dashboard")
        } else{
          navigate("/user/dashboard")
        }
      }
    } catch(error) {
      if(error.response && error.response.data.message){
      setError("Login failed. Please try again.");

      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
       <h3 className='text-shadow-glow text-2xl md:text-3xl font-bold text-black'>Welcome Back <span className='inline-block animate-wave origin-bottom'>👋</span></h3>
<p className='text-sm md:text-base text-slate-600 mt-2 mb-6'>
  Please enter your credentials to access your account.
</p>

        
        <form onSubmit={handleLogin}>
          <Input
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label="Email Address"
          placeholder="sam@example.com"
          type="text"
          />
          <Input
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label="Password"
          placeholder="Minimum 8 characters"
          type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button
  type="submit"
  className="w-full mt-4 bg-gradient-to-r from-indigo-800 to-violet-500 hover:from-violet-600 hover:to-indigo-600
  focus:ring-2 focus:ring-violet-500 focus:outline-none
 text-white py-2.5 rounded-xl font-medium shadow-md transition duration-300 ease-in-out"
>
  LOGIN
</button>


          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <Link className='font-medium text-primary underline' to='/signup'>
            SignUp
            </Link>
            </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login