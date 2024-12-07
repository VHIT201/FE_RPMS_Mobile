import axios from "../config/axiosConfig";
import { setLoading, setError } from "../store/stateSlice";
import { setNotifications, markAsRead } from "../store/notificationSlice";

export const getAllNotification = async (userId, dispatch) => {
    try {
      const response = await axios.get(`/notifications/getbyuserid?id=${userId}`);
      dispatch(setNotifications(response.data.data));
      return response.data;
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message || 'Failed to fetch notifications'));
    }
  };
  

  export const updateIsRead = async ( id, dispatch ) => {
    try {
        const response = await axios.put(`/notifications/updateisread?id=${id}&isread=true`)
        if(response.data.isSuccess){
            dispatch(markAsRead(id));
        }
        return response.data
    } catch (error) {
        console.log(error)
    }
  }