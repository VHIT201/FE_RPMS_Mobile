// components/FontProvider.js
import React, { useEffect, useCallback } from 'react';
import { View } from 'react-native';
import useCustomFonts from '../../assets/fonts/useFont';
import * as SplashScreen from 'expo-splash-screen';

const FontProvider = ({ children }) => {
  const fontsLoaded = useCustomFonts();

  useEffect(() => {
    // Giữ màn hình splash cho đến khi các font chữ được tải xong
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    } else {
      SplashScreen.preventAutoHideAsync();
    }
  }, [fontsLoaded]);

  // Trả về null khi chưa tải xong font để không hiển thị gì cả
  if (!fontsLoaded) {
    return null;
  }

  return <View style={{ flex: 1 }}>{children}</View>;
};

export default FontProvider;
