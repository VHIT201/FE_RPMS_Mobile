import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { fontFamily } from '../../../assets/fonts/useFont'
import colors from '../../../values/colors'
import TextInputComponent from '../../../components/TextInput'
import { Icons } from '../../../assets/icons'
import generalStyles from '../../../styles/generalStyles'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createService } from '../../../services/serviceServices'
import { useDispatch } from 'react-redux'
import { showMessage } from "react-native-flash-message"; // Import showMessage


const ServicesComponent = ({navigation}) => {

  const dispatch = useDispatch()

  // Tạo biến khởi tạo lưu trữ thông tin dịch vụ
  const [service, setService] = useState({
    service_name: "",
    collect_fees: "",
    unitMeasure: "",
    service_cost: 0,
    image: "string",
    note: ""
  });

  // Hàm xử lý thay đổi dữ liệu của form
  const handleInputChange = (field, value) => {
    setService(prev => ({
      ...prev,
      [field]: value
    }));
  };

  
  const handleCreateService = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error('Token không tồn tại');
        return;
      }
      
      const response = await createService(dispatch, service, token);
      if (response.status === 200 || response.status === 201) {
        showMessage({ message: "Tạo dịch vụ thành công!", type: "success" });
      }
      console.log(response.status);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Tên dịch vụ <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInputComponent
          noBorder={true}
          styleAreaInput={{
            borderBottomWidth: 1,
            marginTop: 10,
            paddingHorizontal: 0,
          }}
          placeholder={"Điện, nước, thang máy, bảo vệ, ..."}
          borderColor={colors.grayC4}
          value={service.service_name}
          onChangeText={(text) => handleInputChange("service_name", text)}
          styleLabel={{ fontFamily: fontFamily.regular }}
        />
      </View>

      <View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Thu phí dựa trên <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInputComponent
          noBorder={true}
          styleAreaInput={{
            borderBottomWidth: 1,
            marginTop: 10,
            paddingHorizontal: 0,
          }}
          placeholder={"Lũy tiến theo chỉ số, phòng, người, số lần, ..."}
          borderColor={colors.grayC4}
          value={service.collect_fees}
          onChangeText={(text) => handleInputChange("collect_fees", text)}
          styleLabel={{ fontFamily: fontFamily.regular }}
        />
      </View>

      <View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Đơn vị đo <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInputComponent
          noBorder={true}
          styleAreaInput={{
            borderBottomWidth: 1,
            marginTop: 10,
            paddingHorizontal: 0,
          }}
          placeholder={"Kwh, m3,..."}
          borderColor={colors.grayC4}
          value={service.unitMeasure}
          onChangeText={(text) => handleInputChange("unitMeasure", text)}
          styleLabel={{ fontFamily: fontFamily.regular }}
        />
      </View>

      <View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Phí dịch vụ
        </Text>
        <TextInputComponent
          noBorder={true}
          styleAreaInput={{
            borderBottomWidth: 1,
            marginTop: 10,
            paddingHorizontal: 0,
          }}
          placeholder={"0đ"}
          borderColor={colors.grayC4}
          value={service.service_cost.toString()}
          onChangeText={(text) => handleInputChange("service_cost", Number(text))}
          styleLabel={{ fontFamily: fontFamily.regular }}
        />
      </View>

      <View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Ảnh đại diện
        </Text>
        <TouchableOpacity style={{ height: 40, width: '100%', justifyContent: "center", alignItems: "flex-end", borderBottomWidth: 1, borderColor: colors.grayC4 }}>
          <Image style={{ height: 20, width: 20 }} source={Icons.iconRightArrowFull} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{ fontFamily: fontFamily.regular }}>
          Ghi chú
        </Text>
        <View style={[generalStyles.boxShadow, styles.textInputContainer]}>
          <AutoGrowingTextInput
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
            placeholder={"Chưa có ghi chú"}
            value={service.note}
            onChangeText={(text) => handleInputChange("note", text)}
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleCreateService} style={{ height: 50, width: "100%", borderRadius: 10, alignSelf: "center", backgroundColor: colors.primary_green, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: fontFamily.bold, color: colors.white }}>Thêm dịch vụ</Text>
      </TouchableOpacity>

      <View style={{ height: 100 }}></View>
    </View>
  );
}

export default ServicesComponent

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 10,
    gap: 20
  },
  textInputContainer: {
    paddingVertical: 10,
    minHeight: 80,
    marginTop: 10,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: "flex-start"
  },
});
