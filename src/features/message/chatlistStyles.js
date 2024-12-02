// chatlistStyles.js
import { StyleSheet } from 'react-native';
import colors from '../../values/colors';
import { fontFamily } from '../../assets/fonts/useFont';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
  },
  leftIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight:"600",
    color: colors.primary_blue,
  },
  content: {
    fontSize: 13,
    color: colors.darkGrey,
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: colors.grey,
  },
  rightIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

export default styles;
