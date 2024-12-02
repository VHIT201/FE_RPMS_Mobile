import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import generalStyles from '../../styles/generalStyles';
import { Icons } from '../../assets/icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5'
import colors from '../../values/colors';
import { fontFamily } from '../../assets/fonts/useFont';
import { formatNumber } from '../../config/interfaceConfig';
// RoomItem Component
const RoomItem = ({ roomName, price, userCount, acreage, warningCount, iconSource, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[generalStyles.boxShadow, {paddingVertical:20, gap:10, flexDirection:"column", alignItems:"center", width:'46%', borderRadius:10, marginTop:20}]}>
        <Image style={{height:80}} resizeMode='contain' source={iconSource ? iconSource : Icons.iconHome}/>
        <Text style={{color:colors.primary_green, fontFamily:fontFamily.semiBold}}>{roomName}</Text>
        <Text>{formatNumber(price)} đ</Text>
        <View style={{flexDirection:"row", justifyContent:"space-evenly", width:"100%", alignItems:"center"}}>
          <View style={{flexDirection:"row", gap:5}}>
            <Icon name='user' size={18} color={colors.gray59}/>
            <Text style={{fontSize:14}}>{userCount}</Text>
          </View>
          <View style={{flexDirection:"row", gap:5}}>
            <Text style={{fontSize:14}}>{acreage} m²</Text>
          </View>
          <View style={{flexDirection:"row", gap:5}}>
            <Icon name='warning' size={18} color={colors.gray59}/>
            <Text style={{fontSize:14}}>{warningCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
};

export default RoomItem;

const styles = StyleSheet.create({})
