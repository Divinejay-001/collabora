import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector'
import Input from '../../components/Input/Input'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/Context'
import uploadImage from '../../utils/uploadImage'

const Signup = () => {
  const [profilePic,  setProfilePic] =useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminInviteToken, setAdminInviteToken] = useState("")

  const { updateUser} = useContext(UserContext)
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Handle Sign Up Form Submission
    const handleSignUp = async (e) =>{
      e.preventDefault()
  
      let profileImageUrl = "";
      
      if (!fullName) {
        setError("Please enter a valid name.")
        return;
      }
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.")
        return;
      }
      if (!password) {
       setError("Please enter the paasword");
       return;
      }
  
      setError("")
  
      // Call the API to signup
       try{

if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      console.log('Email:', email, 'Password:', password);
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
      })

      const { token, role } = response.data;

      if(token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
      }
      //Redirect based on role
      if (role === "admin"){
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
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
      <div className=' lg:w-[100%] h-auto md:h-full mt-0 sm:mt-3 md:mt-0 flex flex-col justify-center '>
        <h3 className='text-xl font-semibold text-black'>
          Create An Account </h3>
          <p className='text-xs text-slate-700 mt-[1px] mb-6 sm:mb-3'>Start your journey with us by entering your details.</p>

        <form onSubmit={handleSignUp}>
      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
<div className='grid grid-cols-1 md:grid-cols-2 sm:gap-2 md:gap-4 gap-4 '> 
<Input
value={fullName}
onChange={({target}) => setFullName(target.value)}
label="Full Name"
placeholder="Your Name"
type="text"
/>

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
          <Input
          value={adminInviteToken}
          onChange={({target}) => setAdminInviteToken(target.value)}
          label="Admin Invite Token (Optional)"
          placeholder="15 Digit Code"
          type="text"
          />

          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button
  type="submit"
  className="w-full mt-4 bg-gradient-to-r from-indigo-800 to-violet-500 hover:from-violet-600 hover:to-indigo-600
  focus:ring-2 focus:ring-violet-500 focus:outline-none
 text-white py-2.5 rounded-xl font-medium shadow-md transition duration-300 ease-in-out"
>
  SIGN UP
</button>
 <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link className='font-medium text-primary underline' to='/login'>
            Login
            </Link>
            </p>


          </form>     
          
           </div>
      </AuthLayout>
  )
}

export default Signup