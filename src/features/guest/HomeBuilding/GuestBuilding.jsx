import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import generalStyles from "../../../styles/generalStyles";
import BuildingButton from "../../../components/BuildingButton";
import styles from "../../building/buildingStyles";
import colors from "../../../values/colors";
import Header from "../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuildings } from "../../../services/buildingServies";
import { Icons } from "../../../assets/icons";
import Icon from "react-native-vector-icons/FontAwesome";
import LoadingProgress from "../../../components/LoadingProgress";

const GuestBuilding = ({ navigation }) => {
  const dispatch = useDispatch();
  const { listBuilding } = useSelector((state) => state.building);
  const { loading } = useSelector((state) => state.app);

  const [searchText, setSearchText] = useState("");
  const [filteredBuildings, setFilteredBuildings] = useState([]);

  // Fetch danh sách tòa nhà
  useEffect(() => {
    fetchBuildings(dispatch);
  }, [dispatch]);

  // Lọc tòa nhà theo từ khóa tìm kiếm
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredBuildings(listBuilding);
    } else {
      const filtered = listBuilding
        .map((cityData) => {
          const filteredBuildings = cityData.buildings.filter((building) =>
            building.building_name
              .toLowerCase()
              .includes(searchText.toLowerCase())
          );
          return { ...cityData, buildings: filteredBuildings };
        })
        .filter((cityData) => cityData.buildings.length > 0);
      setFilteredBuildings(filtered);
    }
  }, [searchText, listBuilding]);

  // Hàm xử lý khi nhấn vào item
  const handleOnpressBuildingItem = ( building ) => {
    navigation.navigate('GuestDetailBuilding', {
      building : building
    });
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
    {
      loading ? 
      (
        <LoadingProgress/>
      )
      :
      (
        <>
        {/* Khung tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm tòa nhà..."
          placeholderTextColor={colors.light_black}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Danh sách tòa nhà */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ height: 10 }}></View>
        {filteredBuildings.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Không có dữ liệu tòa nhà
          </Text>
        ) : (
          filteredBuildings.map((cityData, index) => (
            <View key={index} style={styles.citySection}>
              {/* Tiêu đề của thành phố */}
              <Text style={styles.cityTitle}>
                {cityData.city} ({cityData.buildings.length})
              </Text>

              {/* Danh sách tòa nhà */}
              <View style={styles.buttonContainer}>
                {cityData.buildings.map((building, id) => (
                  <BuildingButton
                    key={id}
                    containerStyle={{ width: "45%" }}
                    imageSource={Icons.iconCustom}
                    title={building.building_name}
                    address={building.address}
                    onPress={()=>handleOnpressBuildingItem(building)} // Gắn hàm in ra Hello World
                  />
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
        </>
      )
    }
      
    </View>
  );
};

export default GuestBuilding;
