import axios from '../config/axiosConfig'

export const getallService = async () => {
  try {
    const response = await axios.get(`/service/serviceall`)
    return response
  } catch(error) {
    console.log("Failed to get all service:", error);
  }
}