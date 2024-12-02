import { StyleSheet } from 'react-native';
import colors from '../../values/colors';

const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    paddingTop: 10,
    paddingBottom: 30,
    width: "100%",
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    overflow:"hidden"
  },
  header: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    flexDirection:"row",
    borderBottomColor: colors.grey,
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  handleBar: {
    height: 4,
    width: '10%',
    backgroundColor: colors.grey,
    marginBottom: 10,
    borderRadius: 10,
  },
  scrollView: {
    width: '100%',
    flex:1,
  },
  scrollViewContent: {
    alignItems:"center",
    paddingTop:10
  },
  button: {
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: colors.dark_blue,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
  },
});

export default modalStyles;
