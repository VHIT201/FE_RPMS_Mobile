import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTokenFromAsyncStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken'); // Lấy token từ AsyncStorage
    if (token !== null) {
      return token; // Trả về token nếu tìm thấy
    }
    return null; // Trả về null nếu không có token
  } catch (error) {
    console.log('Error getting token from AsyncStorage', error);
    return null; // Trả về null nếu có lỗi
  }
};
