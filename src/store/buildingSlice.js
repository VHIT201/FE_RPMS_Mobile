import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const buildingSlice = createSlice({
  name: 'building',
  initialState: {
    listBuilding: [],
    listRoom: [],
    building: [],
    room: [],
    loading: false,
    error: null,
  },
  reducers: {
    setListBuilding(state, action) {
      state.listBuilding = action.payload.listBuilding;
    },
    setListRoom(state, action) {
      state.listRoom = action.payload.listRoom;
    },
    setBuilding(state, action) {
      state.building = action.payload.building;
    },
    setRoom(state, action) {
      state.room = action.payload.room;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetListBuilding(state) {
      state.listBuilding = [];
    },
    resetListRoom(state) {
      state.listRoom = [];
    },
    resetRoom(state) {
      state.room = [];
    },
    removeBuilding(state, action) {
      state.listBuilding = state.listBuilding.filter(
        (building) => building.id !== action.payload.id
      );
    },
    removeRoom(state, action) {
      state.listRoom = state.listRoom.filter(
        (room) => room.id !== action.payload.id
      );
    },
    // Thêm reducer để xóa một phòng cụ thể từ state room
    deleteRoom(state, action) {
      state.room = state.room.filter(
        (room) => room.id !== action.payload.id
      );
    },
    // Thêm reducer để cập nhật thông tin phòng
    updateRoom(state, action) {
      const index = state.listRoom.findIndex((room) => room.id === action.payload.id);
      if (index !== -1) {
        state.listRoom[index] = {
          ...state.listRoom[index],
          ...action.payload.data,
        };
      }
    },
  },
});

export const { 
  setListBuilding, 
  setBuilding, 
  setRoom, 
  listBuilding, 
  listRoom, 
  setListRoom, 
  setLoading, 
  setError, 
  resetListBuilding, 
  resetListRoom, 
  resetRoom, 
  removeBuilding, 
  removeRoom, 
  deleteRoom, 
  updateRoom 
} = buildingSlice.actions;

export default buildingSlice.reducer;
