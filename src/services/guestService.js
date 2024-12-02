import axios from "../config/axiosConfig";
import { setLoading, setError } from "../store/stateSlice";
import { setListBuilding, setListRoom, setRoom } from "../store/guestSlice";

export const fetchRoomsByBuildingId = async (dispatch, id) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`/room/getallroombybuildingid?id=${id}`, {
      });
      dispatch(setListRoom({ listRoom: response.data.data }));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError("Failed to fetch rooms"));
      dispatch(setLoading(false));
    }
  };


  export const fetchRoomById = async (dispatch,id) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`/room/getroombyid?id=${id}`, {
      });
      dispatch(setRoom({ room: response.data.data }));
      dispatch(setLoading(false));
    } catch (error) {
      console.log("Error fetching room :", error);
      dispatch(setError("Failed to fetch room"));
      dispatch(setLoading(false));
    }
  };

  export const createBooking = async (dispatch, data) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`/booking/create`, data);
      console.log(response.data)
      dispatch(setLoading(false));
    } catch (error) {
      console.log("Error fetching room :", error);
      dispatch(setError("Failed to fetch room"));
      dispatch(setLoading(false));
    }
  }