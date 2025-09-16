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

// console.log(response)

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  // ✅ Proper way to see what's inside FormData
  for (let pair of formData.entries()) {
    console.log("🧾 FormData entry:", pair[0], pair[1]);
  }

  const response = await axiosInstance.post(
    API_PATHS.IMAGE.UPLOAD_IMAGE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return {
    imageUrl: `http://localhost:5000${response.data.filePath}`,
  };
};

  // Handle Sign Up Form Submission
 const handleSignUp = async (e) => {
  e.preventDefault();

  if (!fullName) return setError("Please enter a valid name.");
  if (!validateEmail(email)) return setError("Please enter a valid email address.");
  if (!password) return setError("Please enter the password.");
  setError("");

  try {
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("adminInviteToken", adminInviteToken || "");
    if (profilePic) {
      formData.append("image", profilePic); // ✅ directly send file
    }

    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { token, role } = response.data;

    if (token) {
      localStorage.setItem("token", token);

      const profileRes = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      updateUser({ ...profileRes.data, token });

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  } catch (error) {
    console.error(error);
    setError("Signup failed. Please try again.");
  }
};


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