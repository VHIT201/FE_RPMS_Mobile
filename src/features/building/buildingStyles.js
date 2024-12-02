import { StyleSheet } from 'react-native';
import colors from '../../values/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  citySection: {
    marginBottom: 20,
  },
  cityTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Đẩy tiêu đề và biểu tượng về hai phía
    marginBottom: 10,
  },
  cityTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: colors.black,
  },
  toggleIcon: {
    fontSize: 18,
    color: colors.primary_blue,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    width: "100%",
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: colors.primary_green,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    fontFamily: 'OpenSans-Regular',
    borderRadius:20,
    fontSize:13,
  },
});

export default styles;
