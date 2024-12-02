import axios from "../config/axiosConfig";
import { setLoading, setError } from "../store/stateSlice";

export const uploadImage = async (imageUri) => {
  try {
    // Chuẩn bị FormData
    const formData = new FormData();
    formData.append("imageFile", {
      uri: imageUri,
      type: "image/jpeg", // MIME type của ảnh
      name: "upload.jpg", // Tên file
    });

    // Gửi request lên API upload
    const response = await axios.post("upload/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Định dạng multipart/form-data
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Lỗi upload ảnh:", error);
    throw error;
  }
};
