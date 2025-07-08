import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    // Skip token for login/register
    const isAuthRoute =
      config.url.includes("/auth/login") || config.url.includes("/auth/register");

    if (accessToken && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) =>{
        if(error.response) {
            if(error.response.status === 401){
            //Redirect to Login page
           window.location.href = "/login";
        } else if (error.response.status === 500){
            console.error("Server error. Please try again later.");
        }
    } else if (error.code === 'ECONNABORTED') {
        console.error("Request timeout. PLease try again")
    }
    return Promise.reject(error)
}
)
export default axiosInstance;

