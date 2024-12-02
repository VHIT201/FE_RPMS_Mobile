// AddRoom.js
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import colors from "../../../values/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import TextInputComponent from "../../../components/TextInput";
import { fontFamily } from "../../../assets/fonts/useFont";
import generalStyles from "../../../styles/generalStyles";
import { Icons } from "../../../assets/icons";
import { getTokenFromAsyncStorage } from "../../../utils/asyncStorageHelper";
import { showMessage } from "react-native-flash-message"; // Import showMessage
import axios from "../../../config/axiosConfig";
import { useRoute } from "@react-navigation/native";
const AddRoom = ({ navigation }) => {
  const route = useRoute();
  const { buildingId } = route.params; // Lấy buildingId từ params
  // Lấy kích thước màn hình
  const { width, height } = Dimensions.get("window");

  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getTokenFromAsyncStorage(); // Gọi hàm để lấy token
      setToken(storedToken); // Cập nhật state với token lấy được
      //   console.log('Token :',storedToken);
    };

    fetchToken();
  }, []);
  // Hàm trả về biểu tượng quay lại
  const leftIcon = (
    <Ionicons
      onPress={() => navigation.goBack()}
      name="chevron-back-outline"
      size={30}
      color={colors.black}
    />
  );

  // Hàm kiểm tra token
  const checkToken = () => {
    if (!token) {
      showMessage({
        message: "Bạn chưa đăng nhập. Vui lòng đăng nhập lại.",
        type: "warning",
      });
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
      return false; // Trả về false nếu không có token
    }
    return true; // Trả về true nếu có token
  };

  const [roomInfo, setroomInfo] = useState({
    room_name: "",
    room_price: 0,
    floor: 0,
    number_of_bedrooms: 0,
    number_of_living_rooms: 0,
    acreage: 0,
    limited_occupancy: 0,
    deposit: 0, //tiền cọc
    renter: 0, //số ng thuê
    service: "",
    image: "",
    utilities: "",
    interior: "",
    describe: "",
    note: "",
    building_Id: "",
    status: 0,
    building_Id: buildingId
  });

  const handleInputChange = (field, value) => {
    setroomInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleCreateRoom = async () => {
    // Kiểm tra token hợp lệ
    if (!checkToken()) {
      showMessage({
        message: "Vui lòng đăng nhập để thực hiện thao tác này.",
        type: "danger",
      });
      return; // Thoát nếu không có token
    }

    // Kiểm tra thông tin Phòng có đầy đủ không
    const requiredFields = [
        "room_name",
        "room_price",
        "floor",
        "number_of_bedrooms",
        "number_of_living_rooms",
        "acreage",
        "limited_occupancy",
        "deposit", 
    ];

    const missingFields = requiredFields.filter((field) => !roomInfo[field]);

    if (missingFields.length > 0) {
      showMessage({
        message: "Vui lòng cung cấp đầy đủ thông tin Phòng.",
        type: "danger",
      });
      return; // Thoát nếu thiếu trường
    }

    try {
      const response = await axios.post("/room/create", roomInfo, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });

      // Kiểm tra phản hồi từ server
      if (response.data.isSuccess) {
        showMessage({
          message: "Phòng đã được thêm thành công!",
          type: "success",
        });
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        showMessage({
          message: "Có lỗi xảy ra. Vui lòng thử lại.",
          type: "danger",
        });
      }
    } catch (error) {
      // Nếu mã lỗi là 403, chuyển hướng về trang Login
      if (error.response && error.response.status === 403) {
        showMessage({
          message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
          type: "danger",
        });
        setTimeout(() => {
          navigation.navigate("Login"); // Điều hướng về trang Login
        }, 2000);
      } else {
        console.error(error);
        showMessage({
          message: "Có lỗi xảy ra. Vui lòng thử lại.",
          type: "danger",
        });
      }
    }
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <Header leftIcon={leftIcon} titleHeader={"Thêm Phòng"} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
        <View style={{ height: 20 }}></View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Tên Phòng <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInputComponent
          noBorder={true}
          styleAreaInput={{
            borderBottomWidth: 1,
            marginTop: 10,
            paddingHorizontal: 0,
          }}
          placeholder={"Nhập tên phòng"}
          borderColor={colors.grayC4}
          styleLabel={{ fontFamily: fontFamily.regular }}
          onChangeText={(text) => handleInputChange("room_name", text)}
        />

        <View style={{ height: 20 }}></View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Giá phòng dự kiến <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInputComponent
          mode
          noBorder={true}
          styleAreaInput={{
            borderBottomWidth: 1,
            marginTop: 10,
            paddingHorizontal: 0,
          }}
          placeholder={"Nhập giá phòng"}
          keyboardType={"number-pad"}
          borderColor={colors.grayC4}
          styleLabel={{ fontFamily: fontFamily.regular }}
          onChangeText={(text) => handleInputChange("room_price", text)}
        />

        <View style={{ height: 20 }}></View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Số tầng <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInputComponent
          noBorder={true}
          styleAreaInput={{
            borderBottomWidth: 1,
            marginTop: 10,
            paddingHorizontal: 0,
          }}
          keyboardType={"number-pad"}
          placeholder={"Nhập số tầng"}
          borderColor={colors.grayC4}
          styleLabel={{ fontFamily: fontFamily.regular }}
          onChangeText={(text) => handleInputChange("floor", text)}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View style={{ width: "48%" }}>
            <Text style={{ fontFamily: fontFamily.regular }}>
              Số phòng ngủ <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInputComponent
              noBorder={true}
              styleAreaInput={{
                borderBottomWidth: 1,
                marginTop: 10,
                paddingHorizontal: 0,
              }}
              keyboardType={"number-pad"}
              placeholder={"Số phòng ngủ"}
              borderColor={colors.grayC4}
              styleLabel={{ fontFamily: fontFamily.regular }}
              onChangeText={(text) =>
                handleInputChange("number_of_bedrooms", text)
              }
            />
          </View>
          <View style={{ width: "48%" }}>
            <Text style={{ fontFamily: fontFamily.regular }}>
              Số phòng khách <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInputComponent
              noBorder={true}
              keyboardType={"number-pad"}
              styleAreaInput={{
                borderBottomWidth: 1,
                marginTop: 10,
                paddingHorizontal: 0,
              }}
              placeholder={"Số phòng khách"}
              borderColor={colors.grayC4}
              styleLabel={{ fontFamily: fontFamily.regular }}
              onChangeText={(text) =>
                handleInputChange("number_of_living_rooms", text)
              }
            />
          </View>
        </View>

        <View style={{ height: 20 }}></View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Diện tích (m²) <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInputComponent
          keyboardType={"number-pad"}
          noBorder={true}
          styleAreaInput={{
            borderBottomWidth: 1,
            marginTop: 10,
            paddingHorizontal: 0,
          }}
          placeholder={"Nhập diện tích của phòng"}
          borderColor={colors.grayC4}
          styleLabel={{ fontFamily: fontFamily.regular }}
          onChangeText={(text) => handleInputChange("acreage", text)}
        />

        <View style={{ height: 20 }}></View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Giới hạn số người thuê <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInputComponent
          noBorder={true}
          styleAreaInput={{
            borderBottomWidth: 1,
            marginTop: 10,
            paddingHorizontal: 0,
          }}
          keyboardType={"number-pad"}
          placeholder={"Giới hạn số người thuê"}
          borderColor={colors.grayC4}
          styleLabel={{ fontFamily: fontFamily.regular }}
          onChangeText={(text) => handleInputChange("limited_occupancy", text)}
        />

        <View style={{ height: 20 }}></View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Tiền cọc <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInputComponent
          noBorder={true}
          styleAreaInput={{
            borderBottomWidth: 1,
            marginTop: 10,
            paddingHorizontal: 0,
          }}
          keyboardType={"number-pad"}
          placeholder={"Tiền cọc"}
          borderColor={colors.grayC4}
          styleLabel={{ fontFamily: fontFamily.regular }}
          onChangeText={(text) => handleInputChange("deposit", text)}
        />
        

        {/* renter */}
        <View style={{ height: 30 }}></View>
        <View style={{ gap: 20 }}>
          <Text style={{ fontFamily: fontFamily.bold }}>Người thuê nhà</Text>
          <Text>Ngô Văn Hậu</Text>
        </View>

        <View style={{ marginTop: 30, gap: 10 }}>
          <Text style={{ fontFamily: fontFamily.bold }}>Dịch vụ có phí</Text>
          <View style={[{ height: 100, justifyContent:"center", alignItems:"center" }]}>
            <Text style={{color:colors.gray59}}>Trống</Text>
          </View>
        </View>

        <View style={{ marginTop: 30, gap: 10 }}>
          <Text style={{ fontFamily: fontFamily.bold }}>Ảnh Phòng</Text>
          <View
            style={[
              {
                height: 150,
                width: 120,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              },
              generalStyles.boxShadow,
            ]}
          >
            <Image
              style={{ height: 50, width: 50, marginBottom: 10 }}
              resizeMode={"cover"}
              source={Icons.iconUserGrayC4Full}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: fontFamily.semiBold,
                marginBottom: 4,
              }}
            >
              Phạm Văn Hoàng
            </Text>
            <Text style={{ fontSize: 12, color: colors.primary_green }}>
              0382823789
            </Text>
          </View>
        </View>

        <View style={{ width: "100%", gap: 40, marginTop: 30 }}>
          <Text style={{ fontFamily: fontFamily.bold }}>Tiện ích phòng</Text>
          <TextInputComponent
            style={[
              {
                height: 100,
                width: "100%",
                borderRadius: 10,
                color: colors.black,
                paddingHorizontal: 10,
              },
              generalStyles.boxShadow,
            ]}
            noBorder
            numberOfLines={4}
            multiline
            placeholder={"Nhập tiện ích của Phòng"}
            placeholderTextColor={colors.gray59}
            onChangeText={(text) => handleInputChange("utilities", text)}
          />
        </View>
        
        <View style={{ width: "100%", gap: 40, marginTop: 60 }}>
          <Text style={{ fontFamily: fontFamily.bold }}>Nội thất phòng</Text>
          <TextInputComponent
            style={[
              {
                height: 100,
                width: "100%",
                borderRadius: 10,
                color: colors.black,
                paddingHorizontal: 10,
              },
              generalStyles.boxShadow,
            ]}
            noBorder
            numberOfLines={4}
            multiline
            placeholder={"Nhập nội thất của Phòng"}
            placeholderTextColor={colors.gray59}
            onChangeText={(text) => handleInputChange("interior", text)}
          />
        </View>

        <View style={{ width: "100%", gap: 40, marginTop: 60 }}>
          <Text style={{ fontFamily: fontFamily.bold }}>Mô tả phòng</Text>
          <TextInputComponent
            style={[
              {
                height: 100,
                width: "100%",
                borderRadius: 10,
                color: colors.black,
                paddingHorizontal: 10,
              },
              generalStyles.boxShadow,
            ]}
            noBorder
            numberOfLines={4}
            multiline
            placeholder={"Nhập mô tả của Phòng"}
            placeholderTextColor={colors.gray59}
            onChangeText={(text) => handleInputChange("describe", text)}
          />
        </View>

        <View style={{  gap: 10, marginTop:60 }}>
          <Text style={{ fontFamily: fontFamily.bold, marginBottom:10 }}>Quản lý Phòng</Text>
          <View
            style={[
              {
                height: 150,
                width: 120,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              },
              generalStyles.boxShadow,
            ]}
          >
            <Image
              style={{ height: 50, width: 50, marginBottom: 10 }}
              resizeMode={"cover"}
              source={Icons.iconUserGrayC4Full}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: fontFamily.semiBold,
                marginBottom: 4,
              }}
            >
              Phạm Văn Hoàng
            </Text>
            <Text style={{ fontSize: 12, color: colors.primary_green }}>
              0382823789
            </Text>
          </View>
        </View>

        <View style={{ width: "100%", gap: 40, marginTop: 20 }}>
          <Text style={{ fontFamily: fontFamily.bold }}>Lưu ý của Phòng</Text>
          <TextInputComponent
            style={[
              {
                height: 100,
                width: "100%",
                borderRadius: 10,
                color: colors.black,
                paddingHorizontal: 10,
              },
              generalStyles.boxShadow,
            ]}
            noBorder
            numberOfLines={4}
            multiline
            placeholder={"Nhập lưu ý của Phòng"}
            placeholderTextColor={colors.gray59}
            onChangeText={(text) => handleInputChange("note", text)}
          />
        </View>
        <TouchableOpacity
          onPress={handleCreateRoom}
          style={{
            height: 50,
            width: "100%",
            backgroundColor: colors.primary_green,
            marginTop: 80,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.bold,
              color: colors.white,
              fontSize: 15,
            }}
          >
            Thêm Phòng
          </Text>
        </TouchableOpacity>

        <View style={{ height: 300 }}></View>
      </ScrollView>
    </View>
  );
};

export default AddRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
