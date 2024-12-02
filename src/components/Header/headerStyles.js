import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import colors from '../../values/colors';

const headerStyles = StyleSheet.create({
  headerView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 5,
    height: 60,
    alignItems: 'center',
  },
});

export default headerStyles;
