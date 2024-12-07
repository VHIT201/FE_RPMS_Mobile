
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Đường dẫn đến userSlice
import buildingReducer from './buildingSlice'
import appReducer from './stateSlice'
import serviceReducer from './serviceSlice'
import problemReducer from './problemSlice'
import guestReducer from './guestSlice'
import thunk from 'redux-thunk';
import invoiceReducer from './invoiceSlice'
import notificationReducer from './notificationSlice'
export const store = configureStore({
  reducer: {
    user: userReducer, // Kết hợp user reducer vào store
    building: buildingReducer,
    app: appReducer,
    service: serviceReducer,
    problems: problemReducer,
    guest: guestReducer,
    invoice: invoiceReducer,
    notification : notificationReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
