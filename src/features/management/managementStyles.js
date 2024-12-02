import { StyleSheet } from 'react-native';
import colors from '../../values/colors';
import { fontFamily } from '../../assets/fonts/useFont';

const managementStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  avatarContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: colors.grey,
  },
  actionButton: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  actionButtonIconContainer: {
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: fontFamily.semiBold,
  },
  profileSectionContainer: {
    paddingVertical: 20,
    marginTop: 20,
    position: "relative",
  },
  profileInfoContainer: {
    width: "90%",
    gap: 20,
    marginTop: 10,
    paddingVertical: 10,
  },
  iconContainer: {
    position: "absolute",
    top: '16%',
    right: '4%',
  },
  modalProfilePicContainer: {
    height: 100,
    width: 100,
    marginVertical: 40,
    borderRadius: 50,
    backgroundColor: colors.greyF3,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  modalProfileIconContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: '1%',
    right: '1%',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayC4,
    marginBottom: 20,
  },
  modalText: {
    fontFamily: fontFamily.semiBold,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  modalButton: {
    width: "96%",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default managementStyles;
