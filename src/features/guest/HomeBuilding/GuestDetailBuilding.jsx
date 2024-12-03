import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,  // Import ActivityIndicator for loading spinner
} from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import Header from "../../../components/Header";
import colors from "../../../values/colors";
import TextInputComponent from "../../../components/TextInput";
import { Icons } from "../../../assets/icons";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAweSome5 from "react-native-vector-icons/FontAwesome5";
import generalStyles from "../../../styles/generalStyles";
import { fontFamily } from "../../../assets/fonts/useFont";
import RoomItem from "../../../components/RoomItem/RoomItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRoomsByBuildingId } from "../../../services/guestService";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setLoading } from "../../../store/stateSlice";  // Import setLoading
import { fetchRoomById } from "../../../services/guestService";
import { listRoom } from "../../../store/guestSlice";
import { showMessage } from "react-native-flash-message";
import { resetListRoom } from "../../../store/guestSlice";
import Modal from "../../../components/Modal";
import { FontAwesome5 } from "@expo/vector-icons";
import LoadingProgress from "../../../components/LoadingProgress";

const GuestDetailBuilding = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { building } = route.params;
  const { listRoom } = useSelector((state) => state.guest);
  const loading = useSelector((state) => state.app.loading);  // Access loading state from Redux

  const getRooms = async () => {
    try {
      dispatch(setLoading(true));  // Set loading to true when starting to fetch data
      await fetchRoomsByBuildingId(dispatch, building.id);
      dispatch(setLoading(false));  // Set loading to false once data is fetched
    } catch (error) {
      dispatch(setLoading(false));  // Set loading to false in case of error
      console.error("Error fetching rooms:", error);
    }
  };

  const handlePressRoomItem = async (id) => {
    try {
      navigation.navigate('GuestDetailRoom',{
        roomId : id
      })
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const openInGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    Linking.canOpenURL(googleMapsUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(googleMapsUrl);
        } else {
          console.error("Google Maps is not supported");
        }
      })
      .catch((err) => {
        console.error("Error opening Google Maps:", err);
      });
  };

  useEffect(() => {
    dispatch(clearError());
    dispatch(resetListRoom());
    getRooms();
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      getRooms();
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() =>
        openInGoogleMaps(`${building.address}, ${building.district}, ${building.city}`)
      } style={{
        height: 60, width: 60, borderRadius: 60, zIndex: 10, backgroundColor: colors.tertiary_blue, position: "absolute", bottom: '10%', right: "6%", justifyContent: "center", alignItems: "center"
      }}>
        <FontAwesome5 name="map-marker-alt" size={22} color="white" />
      </TouchableOpacity>
      <Header
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={building.building_name}
      />
      <ScrollView style={{ width: "100%", flex: 1 }}>
        {loading ? (  // Show loading spinner if the data is still loading
          <ActivityIndicator size="large" color={colors.tertiary_blue} style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: '60%' }} />
        ) : (
          <>
            <View
              style={{
                backgroundColor: colors.tertiary_blue,
                marginBottom: 16,
                borderRadius: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "90%",
                alignSelf: "center",
                padding: 10,
                marginTop: 20,
              }}
            >
              {/* Diện tích */}
              <View
                style={{
                  width: "50%",
                  alignItems: "center",
                  padding: 8,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
                  Địa chỉ
                </Text>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {building.district}
                </Text>
              </View>

              {/* Tầng */}
              <View
                style={{
                  width: "50%",
                  alignItems: "center",
                  padding: 8,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
                  Tầng
                </Text>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {building.number_of_floors}
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  alignItems: "center",
                  padding: 8,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
                  Tỉnh/Thành
                </Text>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {building.city}
                </Text>
              </View>

              {/* Phòng khách */}
              <View
                style={{
                  width: "50%",
                  alignItems: "center",
                  padding: 8,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
                  Tình trạng
                </Text>
                <Text style={{ color: "white", fontSize: 14 }}>Đang hoạt động</Text>
              </View>
            </View>
            {listRoom && listRoom.length == 0 ? (
              <View
                style={{
                  height: 250,
                  width: "100%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: colors.gray59 }}>
                  Không có dữ liệu phòng!
                </Text>
              </View>
            ) : (
              <>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    paddingHorizontal: "4%",
                    paddingVertical: 10,
                  }}
                >
                  {listRoom?.rooms.map((item) => (
                    <RoomItem
                      onPress={() => handlePressRoomItem(item.id)}
                      key={item.id}
                      roomName={item.room_name}
                      price={item.room_price}
                      userCount={2}
                      acreage={item.acreage}
                      warningCount={0}
                    />
                  ))}
                </View>
                <View style={{ height: 200 }}></View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default GuestDetailBuilding;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    position: "relative",
  },
});
