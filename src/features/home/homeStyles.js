// homeStyles.js
import { StyleSheet } from 'react-native';
import colors from '../../values/colors';

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const containerBase = {
  width: "90%",
  alignSelf: "center",
  backgroundColor: colors.white,
  marginTop: 20,
  borderRadius: 10,
  alignItems: "center",
  ...shadowStyle,
};

const homeStyles = StyleSheet.create({
  container: {
    ...containerBase,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerColumn: {
    ...containerBase,
    paddingTop: 40,
    paddingBottom: 40,
  },
  columnContainer: {
    width: "50%",
    gap: 10,
  },
  centeredTextContainer: {
    alignItems: 'center',
    gap:5
  },
  iconButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
    paddingTop:10,
    paddingBottom:10,
    gap:4
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default homeStyles;
