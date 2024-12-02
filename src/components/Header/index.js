import React from 'react';
import {Image, SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import {Icons} from '../../assets/icons';
import generalStyles from '../../styles/generalStyles';
import headerStyles from './headerStyles';
import colors from '../../values/colors';
import { fontFamily } from '../../assets/fonts/useFont';
const Header = ({titleHeader, leftIcon, rightIcon}) => {  // Thêm props titleHeader
  const onNavigateTo = path => {
    RootNavigation.navigate(path);
  };
  
  return (
    <SafeAreaView>
      <View style={[generalStyles.flexRow, headerStyles.headerView]}>
        <View style={{...generalStyles.flexRow, flex: 1, paddingLeft:10}}>
          {leftIcon}
        </View>
        <View style={{...generalStyles.centerView, flex: 5}}>
            <Text style={{fontWeight:'600', color:colors.black, fontFamily:fontFamily.bold, fontSize:16}}>{titleHeader}</Text>
        </View>
        <View style={{...generalStyles.flexRow, flex: 1, alignItems:"flex-end", justifyContent:"flex-end", paddingRight:10 }}>
          {rightIcon}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
