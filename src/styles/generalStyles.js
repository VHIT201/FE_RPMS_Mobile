import {Dimensions, StyleSheet} from 'react-native';
import colors from '../values/colors';
const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyF3,
  },
  imgAvatarSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  flexRow: {
    flexDirection: 'row',
  },
  smallIcon: {
    width: 20,
    height: 20,
  },
  avatarIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  centerView: {justifyContent: 'center', alignItems: 'center', borderRadius:10},
  boldTxt: {fontWeight: '700'},
  subTxt: {fontSize: 10, color: colors.grayC4},
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    backgroundColor: colors.white,
  },
  mediumLogo: {
    width: 40,
    height: 40,
  },
  primaryTxt: {
    color: colors.dark_blue,
  },
});

export default generalStyles;
