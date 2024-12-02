import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import generalStyles from "../../../styles/generalStyles";
import Header from "../../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../values/colors";
import RoomInfoComponent from "../../building/detailRoom/components/RoomInfo";
import { fetchRoomById } from "../../../services/guestService";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { formatNumber } from "../../../config/interfaceConfig";

const GuestDetailRoom = ({ navigation }) => {
  const { room } = useSelector((state) => state.guest);
  const route = useRoute();
  const dispatch = useDispatch();
  const roomId = route.params.roomId;
  const fetchInitialData = async (roomId) => {
    await fetchRoomById(dispatch, roomId);
  };
  const handleBooking = () => {
    navigation.navigate("CreateBooking", {
      room: room,
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchInitialData(roomId);
      return () => {
        // navigation.goBack()
      };
    }, [])
  );
  return (
    <View
      style={[
        generalStyles.container,
        { backgroundColor: colors.white, position: "relative" },
      ]}
    >
      <Header
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={room.room_name || "Thông tin phòng"}
      />

      <View
        style={[
          generalStyles.container,
          { marginTop: 1, backgroundColor: colors.white, position: "relative" },
        ]}
      >
        <ScrollView style={{ width: "100%" }}>
          <RoomInfoComponent
            navigation={navigation}
            isUserViewing={false}
            room={room}
          />
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "7%",
            backgroundColor: "white",
            width: "100%",
            shadowColor: "#000", 
            shadowOffset: { width: 0, height: -2 }, 
            shadowOpacity: 0.1, // Độ mờ của bóng (từ 0 đến 1)
            shadowRadius: 4, // Độ rộng của bóng
            elevation: 5,
            zIndex:10
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.primary_green,
              marginLeft: 20,
            }}
          >
            {formatNumber(room.room_price)} đ
          </Text>
          <TouchableOpacity
            onPress={handleBooking}
            style={{
              height: "100%",
              borderWidth: 1,
              width: "30%",
              backgroundColor: colors.primary_green,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "white",
              }}
            >
              Đặt lịch
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GuestDetailRoom;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.white,
    position: "relative",
  },
});
