import axios from "../config/axiosConfig";
import { setLoading, setError } from "../store/stateSlice";
import { setListBuilding, setListRoom, setRoom } from "../store/buildingSlice";
import { setBuilding } from "../store/buildingSlice";

const groupBuildingsByCity = (buildings) => {
  const cityMap = buildings.reduce((acc, building) => {
    const city = building.city;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(building);
    return acc;
  }, {});

  const uniqueCities = Object.keys(cityMap);
  const groupedBuildings = uniqueCities.map((city) => ({
    city,
    buildings: cityMap[city],
  }));

  return groupedBuildings;
};

export const fetchBuildings = async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("/building/buildingall");
    dispatch(
      setListBuilding({
        listBuilding: groupBuildingsByCity(response.data.data),
      })
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError("Failed to fetch buildings"));
    dispatch(setLoading(false));
  }
};

export const fetchBuildingById = async ( dispatch,id, token) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`/building/getbuildingbyid?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setBuilding({ building: response.data.data }));
    
  } catch (error) {
    dispatch(setError("Failed to fetch building by id"));
    dispatch(setLoading(false));
  }
};


export const fetchRoomsByBuildingId = async (dispatch, token, id) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`/room/getallroombybuildingid?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setListRoom({ listRoom: response.data.data }));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError("Failed to fetch rooms"));
    dispatch(setLoading(false));
  }
};


export const fetchRoomById = async (dispatch, token, id) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`/room/getroombyid?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setRoom({ room: response.data.data }));
    dispatch(setLoading(false));
  } catch (error) {
    console.log("Error fetching room :", error);
    dispatch(setError("Failed to fetch room"));
    dispatch(setLoading(false));
  }
};


export const deleteRoomById = async (dispatch, token, id) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.delete(`/room/delete?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setRoom({ room: response.data.data }));
    dispatch(setLoading(false));
  } catch (error) {
    console.log("Error fetching room :", error);
    dispatch(setError("Failed to fetch room"));
    dispatch(setLoading(false));
  }
};


