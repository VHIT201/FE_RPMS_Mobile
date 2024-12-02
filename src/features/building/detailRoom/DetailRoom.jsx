import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import generalStyles from "../../../styles/generalStyles";
import Header from "../../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../values/colors";
import { fontFamily } from "../../../assets/fonts/useFont";
import InfoSection from "../../../components/InfoSection";
import RoomInfoComponent from "./components/RoomInfo";
import { formatNumber } from "../../../config/interfaceConfig";

const DetailRoom = ({ navigation }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(0);
  const { room } = useSelector((state) => state.building);

  return (
    <View style={[generalStyles.container, { backgroundColor: colors.white }]}>
      <Header
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={room.room_name}
        rightIcon={
          <Icon
            name="edit"
            size={24}
            // onPress={() => setIsOpenEditBuildingModal(true)}
            color={colors.orange}
          />
        }
      />
      <View
        style={[
          generalStyles.container,
          { marginTop: 1, backgroundColor: colors.white },
        ]}
      >


        <View
          style={[generalStyles.container, { backgroundColor: colors.white, position:"relative" }]}>

          <RoomInfoComponent room={room} />
          <View style={{position:"absolute", bottom:0, paddingVertical:20, backgroundColor: colors.primary_green, width:"100%", paddingHorizontal:20}}>
            <Text style={{fontSize:16, fontWeight:"600", color:"white", alignSelf:'flex-end'}}>{formatNumber(room.room_price)} đ</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailRoom;

const styles = StyleSheet.create({
  active: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary_green,
    backgroundColor: "white",
    width: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nonActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.greyF3,
    backgroundColor: "white",
    width: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
