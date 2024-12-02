import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import generalStyles from '../../../../styles/generalStyles'
import InfoSection from '../../../../components/InfoSection'
import colors from '../../../../values/colors'
import homeStyles from '../../../home/homeStyles'
import { Icons } from '../../../../assets/icons'

const HomeGuest = ({navigation}) => {
    const infoData = [
        [
          { label: 'Số tòa nhà', value: '15' },
          { label: 'Số người thuê', value: '400' },
        ],
        [
          { label: 'Số phòng', value: '440' },
          { label: 'Số phòng trống', value: '25' },
        ],
      ];
  return (
    <View style={generalStyles.container}>
        <View style={{height:'18%', width:'100%',position:'absolute', top:0, zIndex:2, backgroundColor: colors.primary_green, borderBottomEndRadius:20, borderBottomStartRadius:20}}>
            <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:"center", width:"90%", alignSelf:"center", marginTop:'4%'}}>
                <View>
                    <Text style={{fontSize:14,color:'white'}}>Xin chào,</Text>
                    <Text style={{fontSize:12,color:'white'}}>Chúc bạn 1 ngày tốt lành</Text>
                </View>
                <View>
                </View>
            </View>
        </View>
      {/* Thông tin chung */}

        <InfoSection style={{position:"absolute", zIndex:10, top:'8%'}} data={infoData} numColumns={2}/>


      <View style={[homeStyles.containerColumn, { gap: 40, position:"absolute", top:'28%', }]}>
        {[
          [
            { icon: Icons.icon_building, label: 'Tòa nhà', navigate: 'GuestBuilding'  },
            { icon: Icons.iconService, label: 'Dịch vụ', navigate: 'Services' },
            { icon: Icons.iconPipe, label: 'Chốt điện nước' },
          ],
          [
            { icon: Icons.iconAlert, label: 'Sự cố', navigate: 'Problem'  },
            { icon: Icons.iconContract, label: 'Hợp đồng' },
            { icon: Icons.iconBill, label: 'Sổ nợ' },
          ],
          [
            {  },
          ],

        ].map((row, rowIndex) => (
          <View key={rowIndex} style={homeStyles.flexRow}>
            {row.map((item, itemIndex) => (
              <TouchableOpacity onPress={()=>navigation.navigate(item.navigate)} key={itemIndex} style={homeStyles.iconButtonContainer}>
                <Image style={{ height: 40, width: 40 }} source={item.icon} />
                <Text style={{fontWeight:"500"}}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

        {/* <Modal
          title={'Thông báo'}
          modalContainerStyle={{height:'100%',borderRadius:0}}
          leftIconHeader={Icons.iconLeftArrow}
          styleIconHeader={{height:20,width:20}}
        /> */}
    </View>
  )
}

export default HomeGuest

const styles = StyleSheet.create({})