import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    console.log("Form Data being sent:", formData); // Debugging form data

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Image upload response:", response.data); // Debugging response
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default uploadImage;
