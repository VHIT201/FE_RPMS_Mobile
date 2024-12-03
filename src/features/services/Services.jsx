import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../components/Header";
import colors from "../../values/colors";
import { Icons } from "../../assets/icons";
import Icon from "react-native-vector-icons/FontAwesome";
import TextInputComponent from "../../components/TextInput";
import generalStyles from "../../styles/generalStyles";
import { getallService } from "../../services/serviceServices";

const Services = ({ navigation }) => {
  const [listService, setListService] = useState([]); // Danh sách dịch vụ gốc
  const [filteredService, setFilteredService] = useState([]); // Danh sách được lọc
  const [searchKeyword, setSearchKeyword] = useState(""); // Từ khóa tìm kiếm

  useFocusEffect(
    useCallback(() => {
      getInitialData();
      return () => {};
    }, [])
  );

  const getInitialData = async () => {
    try {
      const response = await getallService();
      setListService(response.data.data); // Đảm bảo response có đúng cấu trúc.
      setFilteredService(response.data.data); // Khởi tạo danh sách lọc bằng toàn bộ dịch vụ
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = (text) => {
    setSearchKeyword(text);
    if (text === "") {
      setFilteredService(listService); // Nếu không có từ khóa, hiển thị toàn bộ danh sách
    } else {
      const filtered = listService.filter((item) =>
        item.service_name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredService(filtered);
    }
  };

  // Hàm mở Google Maps
  const openGoogleMaps = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Lỗi", "Không thể mở Google Maps");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View style={[styles.container, { position: "relative" }]}>
      <Header
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={"Dịch vụ"}
      />
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: "white",
          marginTop: 1,
        }}
      >
        <TextInputComponent
          styleAreaInput={{
            height: 40,
            width: "100%",
            alignSelf: "center",
            marginBottom: 20,
            marginTop: 10,
            backgroundColor: colors.lightGray,
          }}
          borderRadius={20}
          borderColor={colors.grey}
          leftIcon={Icons.iconSearchBlackFull}
          placeholder={"Tìm kiếm dịch vụ"}
          value={searchKeyword} // Gán giá trị từ state
          onChangeText={handleSearch} // Gọi hàm xử lý tìm kiếm
          style={{ marginLeft: 5 }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            marginBottom: 20,
          }}
        >
          Dịch vụ có phí
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 20,
            paddingBottom: 20,
          }}
        >
          {filteredService.map((item) => (
            <TouchableOpacity
              key={item.id || item.service_name}
              // onPress={() => openGoogleMaps("03 Sông Thao, Phường 2, Tân Bình, Hồ Chí Minh, Việt Nam")} 
              style={[
                {
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 30,
                  gap: 8,
                  borderRadius: 10,
                },
                generalStyles.boxShadow,
              ]}
            >
              <Image
                style={{ height: 35, width: 35 }}
                source={Icons.iconLight}
              />
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                {item.service_name}
              </Text>
              <Text style={{ fontSize: 12, color: colors.red }}>
                {item.service_cost.toLocaleString("vi-VN")} đ/{item.unitMeasure}
              </Text>
            </TouchableOpacity>
          ))}
          {filteredService.length === 0 && (
            <Text
              style={{
                fontSize: 16,
                color: colors.grey,
                textAlign: "center",
                width: "100%",
              }}
            >
              Không tìm thấy dịch vụ nào
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});
