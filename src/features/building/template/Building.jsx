import React, { useState, useEffect, useCallback } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import generalStyles from "../../../styles/generalStyles";
import BuildingButton from "../../../components/BuildingButton";
import styles from "../buildingStyles";
import colors from "../../../values/colors";
import Header from "../../../components/Header";
import axios from "../../../config/axiosConfig";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuildings } from "../../../services/buildingServies";
import { Icons } from "../../../assets/icons";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAweSome5 from "react-native-vector-icons/FontAwesome5";
import { setBuilding } from "../../../store/buildingSlice";

const Building = ({ navigation }) => {
  const dispatch = useDispatch();
  const { listBuilding } = useSelector((state) => state.building);
  const { loading, error } = useSelector((state) => state.app);
  const [expandedCities, setExpandedCities] = useState(new Set());

  const handleCityPress = (cityName) => {
    setExpandedCities((prev) => {
      const newExpandedCities = new Set(prev);
      if (newExpandedCities.has(cityName)) {
        newExpandedCities.delete(cityName);
      } else {
        newExpandedCities.add(cityName);
      }
      return newExpandedCities;
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBuildings(dispatch); // Gọi hàm fetchBuildings để lấy dữ liệu
    }, [dispatch])
  );

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  // if (error)
  //   return (
  //     <View>
  //       <Text>Error: {error}</Text>
  //     </View>
  //   );

  const handleOnpressBuildingItem = (building) => {
    dispatch(setBuilding({"building" : building}))
    navigation.navigate("DetailBuilding");
  };

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
        titleHeader={"Tòa nhà"}
        
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ height: 10 }}></View>
        {listBuilding.length == 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Không có dữ liệu tòa nhà
          </Text>
        ) : (
          listBuilding.map((cityData, index) => (
            <View key={index} style={styles.citySection}>
              {/* Tiêu đề của thành phố */}
              <TouchableOpacity
                onPress={() => handleCityPress(cityData.city)}
                style={styles.cityTitleContainer}
              >
                <Text style={styles.cityTitle}>
                  {cityData.city} ({cityData.buildings.length})
                </Text>
              </TouchableOpacity>

              {/* Danh sách tòa nhà nếu thành phố được mở rộng */}
              {expandedCities.has(cityData.city) && (
                <View style={styles.buttonContainer}>
                  {cityData.buildings.map((building, id) => (
                    <BuildingButton
                      key={id}
                      containerStyle={{ width: "46%" }}
                      imageSource={Icons.iconCustom} // Hoặc nguồn ảnh khác nếu có
                      title={building.building_name} // Sử dụng building_name
                      address={building.address} // Địa chỉ tòa nhà
                      onPress={() => handleOnpressBuildingItem(building)}
                    />
                  ))}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>

    </View>
  );
};

export default Building;
