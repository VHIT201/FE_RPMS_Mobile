import axios from '../config/axiosConfig';
import { setLoading } from '../store/stateSlice';
import { setProblems } from '../store/problemSlice';

export const createProblem = async (problemData, dispatch) => {
  try { // Kiểm tra dữ liệu
    dispatch(setLoading(true)); // Bật trạng thái loading
    await axios.post('/problem/create', problemData); // Gửi dữ liệu
    dispatch(setLoading(false)); // Tắt trạng thái loading
  } catch (error) {
    console.error("Lỗi khi tạo sự cố:", error);
    dispatch(setLoading(false)); // Tắt trạng thái loading nếu lỗi
    throw error;
  }
};


export const getAllProblem = async (dispatch) => {
    try {
      const response = await axios.get('/problem/problemall');
      const data = response.data.data;
      dispatch(setProblems(data));
    } catch (error) {
      console.log(error);
    }
  };
  

export const getProblemByRoomId = async (roomId, dispatch) => {
  try {
    const response = await axios.get(`/problem/getproblembyroomid?id=${roomId}`)
    if(response.data.data) {
      dispatch(setProblems(data));
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}

