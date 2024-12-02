import { StyleSheet } from 'react-native';
import colors from '../../values/colors';
import { fontFamily } from '../../assets/fonts/useFont';

export default StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal:20, // Đã tối ưu lại từ 15 xuống 10 để giữ nguyên layout
        borderRadius: 10, // Đã điều chỉnh từ 12 xuống 10 để giữ nguyên layout ban đầu
        borderColor: colors.grey,
        backgroundColor: colors.white,
        marginTop: 10, // Đã giữ nguyên giá trị margin
        marginBottom: 10, // Đã giữ nguyên giá trị margin
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        height: 40, // Đã giữ nguyên giá trị height ban đầu
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 10, // Đã giữ nguyên giá trị gap ban đầu
    },
    dayText: {
        fontFamily: fontFamily.bold,
        fontSize: 20, // Đã giữ nguyên fontSize ban đầu
        color: colors.orange,
    },
    dateText: {
        fontFamily: fontFamily.regular,
    },
    monthText: {
        fontFamily: fontFamily.regular,
    },
    amountText: {
        fontFamily: fontFamily.bold,
        color: colors.black,
    },
    divider: {
        height: 1,
        width: '98%',
        backgroundColor: colors.grey,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    transactionContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    transactionDetails: {
        gap: 2,
    },
    transactionTitle: {
        fontFamily: fontFamily.semiBold,
    },
    transactionSubtitle: {
        fontFamily: fontFamily.regular,
        fontSize: 12,
        color: colors.gray59,
    },
    transactionAmount: {
        fontFamily: fontFamily.bold,
    },
});
