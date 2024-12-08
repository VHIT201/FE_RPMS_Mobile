import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import generalStyles from "../../../styles/generalStyles";
import { Icons } from "../../../assets/icons";
import { fontFamily } from "../../../assets/fonts/useFont";
import managementStyles from "../managementStyles";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
import { uploadImage } from "../../../services/imageService";
import * as ImagePicker from "expo-image-picker";
import { updateAvata } from "../../../services/userServices";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../values/colors";
import Selector from "../components/Selector";
import CustomModal from "../../../components/Modal/index";

const Management = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const userInfo = useSelector((state) => state.user?.userInfo || {});

  // Hàm mở ảnh từ thư viện
  const pickImageFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Quyền truy cập bị từ chối",
        "Ứng dụng cần quyền truy cập thư viện ảnh."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri); // Cập nhật URI ảnh
      const response = await uploadImage(selectedImageUri); // Gọi hàm upload ảnh
      setImageUri(response.data);
      await updateAvata(userInfo.id, response.data);
    } else {
      Alert.alert("Lỗi", "Không có ảnh nào được chọn.");
    }
  };

  // Hàm chụp ảnh mới
  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Quyền truy cập bị từ chối",
        "Ứng dụng cần quyền truy cập máy ảnh."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri); // Cập nhật URI ảnh
      const response = await uploadImage(selectedImageUri); // Gọi hàm upload ảnh
      setImageUri(response.data);
      await updateAvata(userInfo.id, response.data);
    } else {
      Alert.alert("Lỗi", "Không có ảnh nào được chụp.");
    }
  };

  // Hàm để hiển thị lựa chọn giữa thư viện ảnh hoặc chụp ảnh
  const showImagePickerOptions = () => {
    Alert.alert(
      "Chọn cách thay đổi avatar",
      "Bạn muốn chọn ảnh từ thư viện hay chụp ảnh mới?",
      [
        { text: "Chụp ảnh", onPress: pickImageFromCamera },
        { text: "Chọn ảnh từ thư viện", onPress: pickImageFromLibrary },
        { text: "Hủy", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[managementStyles.container, { flex: 1, width: "100%" }]}>
      <ScrollView
        contentContainerStyle={{ flex: 1, backgroundColor: colors.lightGray }}
      >
        <View
          style={{
            height: "18%",
            width: "100%",
            backgroundColor: colors.primary_green,
            paddingBottom: "10%",
          }}
        >
          <View
            style={[
              generalStyles.centerView,
              managementStyles.profileSectionContainer,
            ]}
          >
            <View style={managementStyles.avatarContainer}>
              <TouchableOpacity onPress={showImagePickerOptions}>
                <View style={managementStyles.avatarCircle}>
                  {imageUri || userInfo?.avata ? (
                    <Image
                      source={{ uri: imageUri || userInfo?.avata }}
                      style={managementStyles.avatarContainer}
                    />
                  ) : (
                    <Image
                      source={{uri:"https://i.ibb.co/CmYyjRt/453178253-471506465671661-2781666950760530985-n.png"}} // Thay bằng đường dẫn ảnh giữ chỗ
                      style={managementStyles.avatarContainer}
                    />
                  )}
                </View>
                {/* Icon máy ảnh */}
                <TouchableOpacity
                  onPress={showImagePickerOptions}
                  style={{
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    backgroundColor: colors.primary_green,
                    borderRadius: 20,
                    padding: 5,
                  }}
                >
                  <Icon name="camera" size={14} color="white" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            <Text
              style={[
                { fontFamily: fontFamily.bold, fontSize: 14 },
                { marginTop: 10, color: "white" },
              ]}
            >
              {userInfo.firstName} {userInfo.lastName}
            </Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 10 }}>
          <Selector />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Management;
