import { createSlice } from '@reduxjs/toolkit';

// Initial state for notifications
const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

// Create a slice for notifications
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Add a new notification
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    // Mark a notification as read
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (notif) => notif.id === action.payload
      );
      if (notification) {
        notification.isRead = true;
      }
    },
    // Remove a notification
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
    },
    // Remove all notifications
    removeAllNotifications: (state) => {
      state.notifications = [];
    },
    // Set all notifications
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});


// Export the actions
export const { 
  addNotification, 
  markAsRead, 
  removeNotification, 
  removeAllNotifications, 
  setNotifications, 
  setLoading,
  setError
} = notificationSlice.actions;

// Export the reducer
export default notificationSlice.reducer;
