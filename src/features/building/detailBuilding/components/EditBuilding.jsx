import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { fontFamily } from "../../../../assets/fonts/useFont";
import TextInputComponent from "../../../../components/TextInput";
import colors from "../../../../values/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import generalStyles from "../../../../styles/generalStyles";
import { Icons } from "../../../../assets/icons";
import { getTokenFromAsyncStorage } from "../../../../utils/asyncStorageHelper";
import { showMessage } from "react-native-flash-message"; // Import showMessage
import axios from "../../../../config/axiosConfig";
import { useDispatch } from "react-redux";
const EditBuilding = ({ building , handleEditBuildingInModal }) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    building_name: "",
    number_of_floors: "",
    rental_costs: "",
    description: "",
    address: "",
    city: "",
    district: "",
    payment_date: "",
    advance_notice: "",
    payment_time: "",
    payment_timeout: "",
    building_note: "",
  });

  useEffect(() => {
    if (building) {
      setForm({
        building_name: building.building_name || "",
        number_of_floors: building.number_of_floors?.toString() || "",
        rental_costs: building.rental_costs?.toString() || "",
        description: building.description || "",
        address: building.address || "",
        city: building.city || "",
        district: building.district || "",
        payment_date: building.payment_date?.toString() || "",
        advance_notice: building.advance_notice?.toString() || "",
        payment_time: building.payment_time?.toString() || "",
        payment_timeout: building.payment_timeout?.toString() || "",
        building_note: building.building_note || "",
      });
    }
  }, [building]);

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };




  const handleUpdateBuilding = async () => {
    try {
      const token = await getTokenFromAsyncStorage();
      const response = await axios.put(
        `/building/update?id=${building.id}`,
        {
          building_name: form.building_name,
          number_of_floors: form.number_of_floors,
          rental_costs: form.rental_costs,
          description: form.description,
          address: form.address,
          city: form.city,
          district: form.district,
          payment_date: form.payment_date, // Chuyển đổi về kiểu số
          advance_notice: form.advance_notice,
          payment_time: form.payment_time,
          payment_timeout: form.payment_timeout,
          building_note: form.building_note,
          management: "string", // Tùy thuộc vào dữ liệu quản lý
          fee_based_service: "string", // Dịch vụ có phí
          free_service: "string", // Dịch vụ miễn phí
          utilities: "string", // Tiện ích
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.isSuccess);
      if(response.data.isSuccess)
      {
        handleEditBuildingInModal(response.data.isSuccess)
        console.log('aaa');
        
      }
    } catch (error) {
      // console.error("Lỗi khi cập nhật tòa nhà:", error);
      // showMessage({ message: "Cập nhật tòa nhà thất bại!", type: "danger" });
    }
  };

  return (
    <View style={{ height: "100%", width: "100%", paddingHorizontal: 10 }}>
      <Text style={{ fontFamily: fontFamily.regular }}>
        Tên tòa nhà <Text style={{ color: "red" }}>*</Text>
      </Text>
      <TextInputComponent
        noBorder={true}
        styleAreaInput={{
          borderBottomWidth: 1,
          marginTop: 10,
          paddingHorizontal: 0,
        }}
        placeholder={"Nhập tên tòa nhà"}
        borderColor={colors.grayC4}
        value={form.building_name}
        styleLabel={{ fontFamily: fontFamily.regular }}
        onChangeText={(text) => handleInputChange("building_name", text)}
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
        placeholder={"Nhập số tầng"}
        borderColor={colors.grayC4}
        styleLabel={{ fontFamily: fontFamily.regular }}
        value={form.number_of_floors}
        onChangeText={(text) => handleInputChange("number_of_floors", text)}
      />
      <View style={{ height: 20 }}></View>
      <Text style={{ fontFamily: fontFamily.regular }}>Chi phí thuê nhà</Text>
      <TextInputComponent
        noBorder={true}
        styleAreaInput={{
          borderBottomWidth: 1,
          marginTop: 10,
          paddingHorizontal: 0,
        }}
        placeholder={"Nhập chi phí thuê nhà"}
        borderColor={colors.grayC4}
        styleLabel={{ fontFamily: fontFamily.regular }}
        value={form.rental_costs}
        onChangeText={(text) => handleInputChange("rental_costs", text)}
      />
      <View style={{ height: 20 }}></View>
      <Text style={{ fontFamily: fontFamily.regular }}>
        Mô tả <Text style={{ color: "red" }}>*</Text>
      </Text>
      <TextInputComponent
        noBorder={true}
        styleAreaInput={{
          borderBottomWidth: 1,
          marginTop: 10,
          paddingHorizontal: 0,
        }}
        placeholder={"Nhập mô tả"}
        borderColor={colors.grayC4}
        styleLabel={{ fontFamily: fontFamily.regular }}
        value={form.description}
        onChangeText={(text) => handleInputChange("description", text)}
      />
      <View style={{ height: 20 }}></View>
      <Text style={{ fontFamily: fontFamily.regular }}>
        Địa chỉ <Text style={{ color: "red" }}>*</Text>
      </Text>
      <TextInputComponent
        noBorder={true}
        styleAreaInput={{
          borderBottomWidth: 1,
          marginTop: 10,
          paddingHorizontal: 0,
        }}
        placeholder={"Nhập địa chỉ"}
        borderColor={colors.grayC4}
        styleLabel={{ fontFamily: fontFamily.regular }}
        value={form.address}
        onChangeText={(text) => handleInputChange("address", text)}
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
            Tỉnh/Thành phố <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInputComponent
            noBorder={true}
            styleAreaInput={{
              borderBottomWidth: 1,
              marginTop: 10,
              paddingHorizontal: 0,
            }}
            placeholder={"Nhập Tỉnh/Thành phố"}
            borderColor={colors.grayC4}
            styleLabel={{ fontFamily: fontFamily.regular }}
            value={form.city}
            onChangeText={(text) => handleInputChange("city", text)}
          />
        </View>
        <View style={{ width: "48%" }}>
          <Text style={{ fontFamily: fontFamily.regular }}>
            Quận/Huyện <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInputComponent
            noBorder={true}
            styleAreaInput={{
              borderBottomWidth: 1,
              marginTop: 10,
              paddingHorizontal: 0,
            }}
            placeholder={"Nhập Quận/Huyện"}
            borderColor={colors.grayC4}
            styleLabel={{ fontFamily: fontFamily.regular }}
            value={form.district}
            onChangeText={(text) => handleInputChange("district", text)}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ width: "48%" }}>
          <Text style={{ fontFamily: fontFamily.regular }}>
            Ngày chốt tiền <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInputComponent
            noBorder={true}
            styleAreaInput={{
              borderBottomWidth: 1,
              marginTop: 10,
              paddingHorizontal: 0,
            }}
            placeholder={"Chọn ngày chốt"}
            borderColor={colors.grayC4}
            styleLabel={{ fontFamily: fontFamily.regular }}
            value={form.payment_date}
            onChangeText={(text) => handleInputChange("payment_date", text)}
          />
        </View>

        <View style={{ width: "48%" }}>
          <Text style={{ fontFamily: fontFamily.regular }}>
            Chuyển báo trước <Text style={{ color: "red" }}>*</Text>{" "}
          </Text>
          <TextInputComponent
            noBorder={true}
            styleAreaInput={{
              borderBottomWidth: 1,
              marginTop: 10,
              paddingHorizontal: 0,
            }}
            placeholder={"Số ngày báo trước"}
            borderColor={colors.grayC4}
            styleLabel={{ fontFamily: fontFamily.regular }}
            value={form.advance_notice}
            onChangeText={(text) => handleInputChange("advance_notice", text)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ width: "48%" }}>
          <Text style={{ fontFamily: fontFamily.regular }}>
            Thời gian nộp tiền phòng <Text style={{ color: "red" }}>*</Text>
          </Text>
          <TextInputComponent
            noBorder={true}
            styleAreaInput={{
              borderBottomWidth: 1,
              marginTop: 10,
              paddingHorizontal: 0,
            }}
            placeholder={"Ngày bắt đầu"}
            borderColor={colors.grayC4}
            styleLabel={{ fontFamily: fontFamily.regular }}
            value={form.payment_time}
            onChangeText={(text) => handleInputChange("payment_time", text)}
          />
        </View>
        <View style={{ width: "48%" }}>
          <Text style={{ fontFamily: fontFamily.regular }}></Text>
          <TextInputComponent
            noBorder={true}
            styleAreaInput={{
              borderBottomWidth: 1,
              marginTop: 10,
              paddingHorizontal: 0,
            }}
            placeholder={"Ngày kết thúc"}
            borderColor={colors.grayC4}
            styleLabel={{ fontFamily: fontFamily.regular }}
            value={form.payment_timeout}
            onChangeText={(text) => handleInputChange("payment_timeout", text)}
          />
        </View>
      </View>
      <View style={{ marginTop: 30, gap: 10 }}>
        <Text style={{ fontFamily: fontFamily.bold }}>Quản lý tòa nhà</Text>
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

      <View style={{ marginTop: 30, gap: 10 }}>
        <Text style={{ fontFamily: fontFamily.bold }}>Dịch vụ có phí</Text>
        <View style={[{ height: 150 }]}></View>
      </View>

      <View style={{ width: "100%", gap: 40 }}>
        <Text style={{ fontFamily: fontFamily.bold }}>Lưu ý của tòa nhà</Text>
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
          placeholder={"Nhập lưu ý của tòa nhà"}
          placeholderTextColor={colors.gray59}
          value={form.building_note}
          onChangeText={(text) => handleInputChange("building_note", text)}
        />
      </View>
      <TouchableOpacity
        onPress={handleUpdateBuilding}
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
          Sửa tòa nhà
        </Text>
      </TouchableOpacity>

      <View style={{ height: 300 }}></View>
    </View>
  );
};

export default EditBuilding;

const styles = StyleSheet.create({});
