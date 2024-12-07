import React, { useEffect, useCallback, useState } from "react";
import { Text, TouchableOpacity, View, Image } from 'react-native';
import generalStyles from "../../../styles/generalStyles";
import { Icons } from "../../../assets/icons";
import homeStyles from "../homeStyles";
import colors from "../../../values/colors";
import InfoSection from "../../../components/InfoSection/index";
import { getAllRoomByUserId } from "../../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { fetchBuildingById } from "../../../services/buildingServies";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const [userToken, setUserToken] = useState();
  const userData = useSelector((state) => state.user?.userInfo || {});
  const userDataRoom = useSelector((state) => state.user?.userRoom) // Đảm bảo userData không undefine
  const buildingData = useSelector((state) => state.building?.building)

  const fetchInitialData = async () => {
    const token = await AsyncStorage.getItem("userToken"); 
    setUserToken(token);
    const response = await getAllRoomByUserId(userData?.id, dispatch)
    await fetchBuildingById( dispatch,response?.data?.building_Id, token)
  }
  useEffect(() => {
    fetchInitialData()
  }, [])
    
  const infoData = [
    [
      { label: 'Tòa nhà', value: buildingData?.building_name || 0 }, // Hiển thị 0 nếu building_name là null hoặc undefined
      { label: 'Số tầng', value: buildingData?.number_of_floors || 0 }, // Hiển thị 0 nếu number_of_floors là null hoặc undefined
    ],
    [
      { label: 'Tên phòng', value: userDataRoom?.room_name || 0 }, // Hiển thị 0 nếu room_name là null hoặc undefined
      { label: 'Thành phố', value: buildingData?.city || 0 }, // Hiển thị 0 nếu city là null hoặc undefined
    ],
  ];
  

  const menuData = [
    [
      { icon: Icons.iconService, label: 'Dịch vụ', navigate: 'Services' },
      { icon: Icons.icon_building, label: 'Tòa nhà', navigate: 'Building' },
      { icon: Icons.iconInvoice, label: 'Hóa đơn' , navigate: 'Invoice'},
    ],
    [
      { icon: Icons.iconAlert, label: 'Sự cố', navigate: 'Problem' },
      { icon: Icons.iconContract, label: 'Hợp đồng', navigate: 'Contract' },
      { icon: Icons.iconBill, label: 'Sổ nợ' },
    ],
    [
      { },

    ],
  ];

  return (
    <View style={generalStyles.container}>
      {/* Header */}
      <View style={{
        height: '18%', width: '100%', position: 'absolute', top: 0, zIndex: 2,
        backgroundColor: colors.primary_green, borderBottomEndRadius: 20, borderBottomStartRadius: 20
      }}>
        <View style={{
          flexDirection: "row", justifyContent: 'space-between', alignItems: "center",
          width: "90%", alignSelf: "center", marginTop: '4%'
        }}>
          <View>
            <Text style={{ fontSize: 12, color: 'white' }}>Xin chào</Text>
            <Text style={{ color: 'white', fontWeight: "600", fontSize: 16 }}>
              {userData.firstName || ''} {userData.lastName || ''}
            </Text>
          </View>
        </View>
      </View>

      {/* Thông tin chung */}
      <InfoSection style={{ position: "absolute", zIndex: 10, top: '8%' }} data={infoData} numColumns={2} />

      {/* Menu */}
      <View style={[homeStyles.containerColumn, { gap: 40, position: "absolute", top: '28%' }]}>
        {menuData?.map((row, rowIndex) => (
          <View key={rowIndex} style={homeStyles.flexRow}>
            {row?.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                onPress={() => item.navigate && navigation.navigate(item.navigate)}
                style={homeStyles.iconButtonContainer}
              >
                <Image style={{ height: 40, width: 40 }} source={item.icon} />
                <Text style={{ fontWeight: "500" }}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Home;
