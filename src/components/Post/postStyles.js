import { StyleSheet } from "react-native";
import colors from "../../values/colors";
import generalStyles from "../../styles/generalStyles";

const PostComponentStyle = StyleSheet.create({
    postContainer: {
        backgroundColor: colors.white, 
        borderRadius: 20, 
        borderWidth: 1, 
        width: "96%", 
        alignSelf: "center", 
        borderColor: colors.grayC4, 
        paddingTop: 10, 
        paddingBottom: 10,
        overflow: "hidden",
        marginBottom: 10,
        position: "relative",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    postHeaderContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
    },
    alignCenter: {
        alignItems: "center",
    },
    postAvatar: {
        marginRight: 10, 
        marginLeft: 10, 
        height: 40, 
        width: 40, 
        borderRadius: 40, 
        overflow: 'hidden',
    },
    userNameText: {
        fontSize: 15,
        ...generalStyles.boldTxt,
    },
    threeDotsIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    contentContainer: {
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        marginBottom: 5,
    },
    contentImageContainer: {
        width: '100%',
        height: 'auto',
    },
    contentImage: {
        width: '100%',
        height: 300,
    },
    horizontalLine: {
        ...generalStyles.flexRow, 
        height: 1, 
        backgroundColor: colors.grayC4, 
        width: "94%", 
        alignSelf: "center",
        marginTop: 5,
    },
    centerContent: {
        justifyContent: "center",
    },
    postButton: {
        height: 30,
        width: "30%",
        alignItems: "center",
        flexDirection: "row", 
        justifyContent: "center",
        marginTop: 10,
    },
    buttonText: {
        marginLeft: 10,
    },
    modal: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        position: "absolute",
        borderTopRightRadius: 0,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.grayC4,
        borderRadius: 10,
        right: 40,
        top: 40,
        alignItems: "flex-start",
        justifyContent: 'center',
        minWidth: 150,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalButton: {
        height: 30,
        width: "100%", 
        justifyContent: 'flex-start',
        alignItems: "center",
        flexDirection: "row",
    },
    modalButtonText: {
        marginLeft: 10,
    },
    modalArrow: {
        position: "absolute",
        top: -20,
        right: 0,
        height: 20,
        width: 20,
    },
    modalArrowImage: {
        height: 20,
        width: 20,
    },
});

export default PostComponentStyle;
