// src/components/Spinner.js

import React from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import colors from '../../values/colors';

const { width, height } = Dimensions.get('window'); // Lấy kích thước màn hình

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary_green} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    zIndex: 1,
    top: 0,
    left: 0,
    width: width, // Chiều rộng bằng kích thước màn hình
    height: height, // Chiều cao bằng kích thước màn hình
    justifyContent: 'center', // Đặt vòng xoay ở giữa theo chiều dọc
    alignItems: 'center', // Đặt vòng xoay ở giữa theo chiều ngang
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Màu nền tối hơn với độ trong suốt
  },
});

export default Spinner;
