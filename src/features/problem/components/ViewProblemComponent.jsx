import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../../components/Header";
import TextInputAutoHeight from "../../../components/TextInputAutoHeight";
import colors from "../../../values/colors";
import { createProblem } from "../../../services/problemServices";
import { useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { getAllProblem } from "../../../services/problemServices";
import { uploadImage } from "../../../services/imageService";

const CreateProblemModal = ({
  modalVisible,
  onClose,
  userData,
  userRoomList,
}) => {
  const dispatch = useDispatch();

  // Khởi tạo trạng thái ban đầu
  const initialFormState = {
    id: userData.id,
    room_name: userRoomList.room_name,
    problem: "",
    decription: "",
    image: [], // Lưu nhiều ảnh
    fatal_level: 0,
    status: 0,
    roomid: userRoomList.id,
  };
  const [formState, setFormState] = useState(initialFormState);
  const [selectedLevel, setSelectedLevel] = useState(0);

  // Các mức độ nghiêm trọng
  const levels = [
    { label: "Thấp", color: "green" },
    { label: "Trung bình", color: "orange" },
    { label: "Cao", color: "red" },
  ];

  // Hàm cập nhật trạng thái form
  const handleChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  // Mở thư viện ảnh
  const pickImage = async () => {
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
      setFormState((prevState) => ({
        ...prevState,
        images: [...prevState.images, result.assets[0].uri], // Thêm URI vào danh sách
      }));
    }
  };

  // Chụp ảnh bằng camera
  const takePhoto = async () => {
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
      setFormState((prevState) => ({
        ...prevState,
        images: [...prevState.images, result.assets[0].uri], // Thêm URI vào danh sách
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Hiển thị trạng thái loading
      showMessage({
        message: "Đang xử lý...",
        description: "Hệ thống đang upload ảnh và gửi dữ liệu.",
        type: "info",
        backgroundColor: colors.primary_green,
        color: colors.white,
      });
  
      // Upload từng ảnh và nhận danh sách URL
      const uploadedImageUrls = await Promise.all(
        formState?.image?.map(async (imageUri) => {
          const response = await uploadImage(imageUri); // Gọi hàm uploadImage
          return response.data; // URL trả về từ API
        })
      );
  
      // Cập nhật URL ảnh trong formState
      setFormState((prevState) => ({
        ...prevState,
        images: uploadedImageUrls, // Ghi đè danh sách URL ảnh
      }));
  
      // Tạo dữ liệu để gửi
      const data = {
        id: formState.id,
        room_name: formState.room_name,
        problem: formState.problem,
        decription: formState.decription,
        fatal_level: selectedLevel,
        status: formState.status,
        roomid: formState.roomid,
        image: uploadedImageUrls, // Gửi danh sách URL ảnh
      };
      console.log(data)
      // Gửi API
      await createProblem(data, dispatch);
  
      // Thông báo thành công
      showMessage({
        message: "Thành công",
        description: "Đã gửi thông báo!",
        type: "success",
        backgroundColor: colors.green,
        color: colors.white,
      });
  
      // Lấy danh sách sự cố mới
      await getAllProblem(dispatch);
  
      // Đóng modal
      onClose();
    } catch (error) {
      // Hiển thị lỗi
      showMessage({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi tạo thông báo hoặc upload ảnh.",
        type: "danger",
        backgroundColor: "red",
        color: colors.white,
      });
      console.error("Lỗi trong handleSubmit:", error);
    }
  };
  
  

  return (
    <Modal visible={modalVisible} animationType="slide">
      <Header
        leftIcon={
          <Icon
            onPress={onClose}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={"Tạo sự cố"}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { gap: 20, padding: 20 },
        ]}
      >
        <View style={styles.problemRoomContainer}>
          <Text style={styles.sectionTitle}>
            Phòng gặp sự cố <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.roomInputContainer}>
            <Text style={styles.roomText}>{formState.room_name}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>
            Sự cố <Text style={styles.required}>*</Text>
          </Text>
          <TextInputAutoHeight
            placeholder={"Nhập sự cố"}
            onChangeText={(text) => handleChange("problem", text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>
            Mô tả sự cố <Text style={styles.required}>*</Text>
          </Text>
          <TextInputAutoHeight
            placeholder={"Nhập mô tả sự cố"}
            onChangeText={(text) => handleChange("decription", text)}
          />
        </View>

        <View style={styles.levelContainer}>
          <Text style={styles.sectionTitle}>
            Mức độ nghiêm trọng <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.levelButtonContainer}>
            {levels?.map((level, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedLevel(index)}
                style={[
                  styles.levelButton,
                  {
                    backgroundColor:
                      selectedLevel === index ? level.color : "#ffffff",
                    borderWidth: selectedLevel === index ? 0 : 1,
                  },
                ]}
              >
                <Text
                  style={{
                    color: selectedLevel === index ? "white" : level.color,
                    fontWeight: "500",
                  }}
                >
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>Hình ảnh</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>Chọn ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <Text style={styles.imageButtonText}>Chụp ảnh</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal style={styles.imagePreviewScroll}>
            {formState.image.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.imagePreview} />
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Thêm sự cố</Text>
        </TouchableOpacity>
        <View style={styles.bottomSpacer}></View>
      </ScrollView>
    </Modal>
  );
};

export default CreateProblemModal;

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    padding: 10,
  },
  problemRoomContainer: {
    paddingVertical: 5,
    width: "100%",
    gap: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  roomInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary_green,
    width: "100%",
    paddingBottom: 5,
  },
  roomText: {
    fontSize: 15,
  },
  inputContainer: {
    paddingVertical: 5,
    width: "100%",
    gap: 10,
  },
  levelContainer: {
    paddingVertical: 5,
    width: "100%",
    gap: 15,
  },
  levelButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  levelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 8,
    borderColor: colors.primary_green,
    marginHorizontal: 5,
  },
  submitButton: {
    height: 50,
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_green,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  bottomSpacer: {
    height: 200,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  imagePreviewScroll: {
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
});
