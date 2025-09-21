import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/Context";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) return setError("Please enter a valid name.");
    if (!validateEmail(email))
      return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter the password.");
    setError("");

    try {
      setLoading(true); // start loading

      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("adminInviteToken", adminInviteToken || "");
      if (profilePic) {
        formData.append("image", profilePic);
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
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <AuthLayout>
      <div className="w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full mx-auto">
    <h3 className="text-xl font-semibold text-black">Create An Account</h3>
    <p className="text-xs text-slate-700 mt-[1px] mb-6 sm:mb-3">
      Start your journey with us by entering your details.
    </p>

    <form onSubmit={handleSignUp} className="space-y-4">
      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="Your Name"
          type="text"
        />
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="sam@example.com"
          type="text"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Minimum 8 characters"
          type="password"
        />
        <Input
          value={adminInviteToken}
          onChange={({ target }) => setAdminInviteToken(target.value)}
          label="Admin Invite Token (Optional)"
          placeholder="15 Digit Code"
          type="text"
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full mt-2 bg-gradient-to-r from-indigo-800 to-violet-500 hover:from-violet-600 hover:to-indigo-600
          focus:ring-2 focus:ring-violet-500 focus:outline-none
          text-white py-2.5 rounded-xl font-medium shadow-md transition duration-300 ease-in-out
          ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Signing Up...
          </span>
        ) : (
          "SIGN UP"
        )}
      </button>

      <p className="text-[13px] text-slate-800 text-center">
        Already have an account?{" "}
        <Link className="font-medium text-primary underline" to="/login">
          Login
        </Link>
      </p>
    </form>
  </div>
</div>

    </AuthLayout>
  );
};

export default Signup;
