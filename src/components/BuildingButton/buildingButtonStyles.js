import { StyleSheet } from 'react-native';
import colors from '../../values/colors';
import { fontFamily } from '../../assets/fonts/useFont';

const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: '42%',
        backgroundColor: colors.white,
        borderRadius: 12, // Tăng borderRadius cho góc mềm mại hơn
        shadowColor: colors.black2,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        margin: 8, // Tăng khoảng cách giữa các button
    },
    iconContainer: {
        backgroundColor: colors.lightGray,
        borderRadius: 60,
        padding: 10,
        marginBottom: 10,
        overflow: "hidden",
        borderWidth: 2, // Thêm border cho icon container
        borderColor: colors.grayE9,
    },
    icon: {
        height: 60,
        width: 60,
    },
    title: {
        fontFamily: fontFamily.semiBold,
        color: colors.primary_green,
        fontSize: 16,
        textAlign: 'center', // Căn giữa tiêu đề
    },
    address: {
        textAlign: 'center',
        fontFamily: fontFamily.regular,
        fontSize: 12,
        color: colors.gray59, // Chọn màu chữ phù hợp
    },
    imageContainer: {
        height: 80,
        width: 80,
        overflow:"hidden",
        borderRadius: 40,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.grayE9,
    }
});

export default styles;
