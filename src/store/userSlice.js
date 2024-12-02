// src/store/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tạo action bất đồng bộ để lưu và xóa token
export const saveToken = createAsyncThunk(
  'user/saveToken',
  async (token) => {
    await AsyncStorage.setItem('userToken', token); // Lưu token vào AsyncStorage
    return token; 
  }
);

export const removeToken = createAsyncThunk(
  'user/removeToken',
  async () => {
    await AsyncStorage.removeItem('userToken'); 
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    userAccount: null,
    userRoom: [], // Khai báo userRoom là mảng
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    setAccount(state, action) {
      state.userAccount = action.payload.userAccount;
    },
    setUser(state, action) {
      state.userInfo = action.payload.userInfo; // Lưu thông tin người dùng
      state.token = action.payload.token; // Lưu token
    },
    setLoading(state, action) {
      state.loading = action.payload; // Cập nhật trạng thái loading
    },
    setError(state, action) {
      state.error = action.payload; // Lưu thông báo lỗi
    },
    resetUser(state) {
      state.userInfo = null; // Đặt lại thông tin người dùng
      state.token = null; // Đặt lại token
      state.loading = false; // Đặt lại trạng thái loading
      state.error = null; // Đặt lại thông báo lỗi
      state.userRoom = []; // Đặt lại mảng userRoom
    },
    setUserRoom(state, action) {
      state.userRoom = action.payload; // Update userRoom with payload data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveToken.fulfilled, (state, action) => {
        state.token = action.payload; // Cập nhật state với token vừa lưu
      })
      .addCase(removeToken.fulfilled, (state) => {
        state.token = null; // Đặt lại token khi đã xóa
      });
  },
});

// Xuất các action
export const { setUser, setLoading, setError, resetUser, setAccount, setUserRoom } = userSlice.actions;

// Xuất reducer
export default userSlice.reducer;
