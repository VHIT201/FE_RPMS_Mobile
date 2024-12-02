// hooks/useFonts.js
import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'OpenSans-Regular': require('./Open_Sans/static/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./Open_Sans/static/OpenSans-Bold.ttf'),
    'OpenSans-Italic': require('./Open_Sans/static/OpenSans-Italic.ttf'),
    'OpenSans-BoldItalic': require('./Open_Sans/static/OpenSans-BoldItalic.ttf'),
    'OpenSans-SemiBold': require('./Open_Sans/static/OpenSans-SemiBold.ttf'),
    'OpenSans-SemiBoldItalic': require('./Open_Sans/static/OpenSans-SemiBoldItalic.ttf'),
    'OpenSans-Light': require('./Open_Sans/static/OpenSans-Light.ttf'),
    'OpenSans-LightItalic': require('./Open_Sans/static/OpenSans-LightItalic.ttf'),
    'OpenSans-ExtraBold': require('./Open_Sans/static/OpenSans-ExtraBold.ttf'),
    'OpenSans-ExtraBoldItalic': require('./Open_Sans/static/OpenSans-ExtraBoldItalic.ttf'),
  });

  return fontsLoaded;
}

// Định nghĩa fontFamily để sử dụng trong toàn bộ ứng dụng
export const fontFamily = {
  regular: 'OpenSans-Regular',
  bold: 'OpenSans-Bold',
  italic: 'OpenSans-Italic',
  boldItalic: 'OpenSans-BoldItalic',
  semiBold: 'OpenSans-SemiBold',
  semiBoldItalic: 'OpenSans-SemiBoldItalic',
  light: 'OpenSans-Light',
  lightItalic: 'OpenSans-LightItalic',
  extraBold: 'OpenSans-ExtraBold',
  extraBoldItalic: 'OpenSans-ExtraBoldItalic',
};
