import {Dimensions, StyleSheet} from 'react-native';
import dimension from '../../../values/dimension';
import colors from '../../../values/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const loginStyles = StyleSheet.create({
    main: {
        flex: 1,
    },
    viewLogin: {
        padding: 20
    }
})

export default loginStyles;