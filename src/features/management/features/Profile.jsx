import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import colors from "../../../values/colors";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  getCustomerByUserId,
  updateCustomer,
} from "../../../services/userServices";
import { showMessage } from "react-native-flash-message";

// Hàm format ngày từ định dạng "YYYY-MM-DD" sang "dd/MM/yyyy"
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Profile = ({ closeModal }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [userData, setUserData] = useState({});
  const [isModified, setIsModified] = useState(false); // State để theo dõi sự thay đổi
  // console.log(userData)
  // State để lưu trữ thông tin chỉnh sửa
  const [name, setName] = useState(userData?.customer_name);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [dob, setDob] = useState(""); // ngày sinh (không thể thay đổi)
  const [cmnd, setCmnd] = useState(""); // CMND/CCCD
  const [address, setAddress] = useState(""); // Địa chỉ chi tiết
  const [dateOfIssue, setDateOfIssue] = useState(""); // Ngày cấp (không thể thay đổi)
  const [placeOfIssue, setPlaceOfIssue] = useState(""); // Nơi cấp

  const fetchInititalData = async () => {
    const response = await getCustomerByUserId(userInfo.id);
    setUserData(response.data);

    // Khởi tạo state từ dữ liệu userData sau khi fetch thành công
    if (response.data) {
      setDob(formatDate(response.data.date_of_birth));
      setCmnd(response.data.cccd);
      setAddress(response.data.address);
      setDateOfIssue(formatDate(response.data.date_of_issue));
      setPlaceOfIssue(response.data.place_of_issue);
      setPhone(response.data.phone_number);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchInititalData();
    }, [])
  );

  // Theo dõi các sự thay đổi để hiện nút "Lưu thay đổi"
  const handleChange = (setFunction, value) => {
    setFunction(value);
    setIsModified(true);
  };

  const handleUpdateData = async () => {
    const updatedData = {
      ...userData, // Giữ lại tất cả dữ liệu gốc
      phone_number: phone,
      cccd: cmnd,
      address: address,
      place_of_issue: placeOfIssue,
    };

    // console.log("Cập nhật dữ liệu:", updatedData);
    const response = await updateCustomer(updatedData.id, updatedData);
    if (response.isSuccess) {
      showMessage({
        message: "Sửa thông tin thành công!",
        type: "success",
        backgroundColor: colors.primary_green,
      });
      closeModal();
    }

    // Bạn có thể gọi API hoặc xử lý lưu dữ liệu tại đây
    setIsModified(false); // Sau khi lưu, không còn thay đổi nữa
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ width: "100%", flex: 1, backgroundColor: "white" }}>
            {/* Thông tin người dùng */}
            <View style={styles.profileContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.avatarContainer}>
                  <Image
                    style={styles.avatarImage}
                    source={{
                      uri:
                        userInfo?.avata && userInfo.avata !== "" // Kiểm tra nếu có avatar
                          ? userInfo.avata
                          : "https://i.ibb.co/CmYyjRt/453178253-471506465671661-2781666950760530985-n.png", // Avatar mặc định
                    }}
                  />
                </View>

                <View style={{ flexDirection: "column", gap: 3 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {userData.customer_name}
                  </Text>
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    {phone}
                  </Text>
                </View>
              </View>
              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.label}>Loại tài khoản</Text>
                <Text style={[styles.value, styles.rightAlign]}>
                  {userInfo.role}
                </Text>
              </View>
            </View>

            {/* Phần thông tin có thể chỉnh sửa */}
            <View style={styles.editContainer}>
              {/* Họ tên */}
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Họ tên</Text>
                <TextInput
                  style={[styles.inputField, styles.rightAlign]}
                  value={userData.customer_name}
                  onChangeText={(text) => {
                    const names = text.split(" ");
                    handleChange(setFirstName, names[0]);
                    handleChange(setLastName, names.slice(1).join(" "));
                  }}
                  placeholder="Nhập họ tên"
                />
              </View>

              {/* Số điện thoại */}
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Số điện thoại</Text>
                <TextInput
                  style={[styles.inputField, styles.rightAlign]}
                  value={phone}
                  onChangeText={(value) => handleChange(setPhone, value)}
                  placeholder="Nhập số điện thoại"
                  keyboardType="phone-pad"
                />
              </View>

              {/* Email */}
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Email</Text>
                <Text
                  style={[
                    styles.inputField,
                    styles.rightAlign,
                    { color: colors.gray59 },
                  ]}
                >
                  {userInfo.email}
                </Text>
              </View>

              {/* Ngày sinh (không thể chỉnh sửa) */}
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Ngày sinh</Text>
                <Text
                  style={[
                    styles.inputField,
                    styles.rightAlign,
                    { color: colors.gray59 },
                  ]}
                >
                  {dob}
                </Text>
              </View>

              {/* CMND/CCCD */}
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>CMND/CCCD</Text>
                <TextInput
                  style={[styles.inputField, styles.rightAlign]}
                  value={cmnd}
                  onChangeText={(value) => handleChange(setCmnd, value)}
                  placeholder="Nhập CMND/CCCD"
                />
              </View>

              {/* Ngày cấp (không thể chỉnh sửa) */}
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Ngày cấp</Text>
                <Text
                  style={[
                    styles.inputField,
                    styles.rightAlign,
                    { color: colors.gray59 },
                  ]}
                >
                  {dateOfIssue}
                </Text>
              </View>

              {/* Nơi cấp */}
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Nơi cấp</Text>
                <TextInput
                  style={[styles.inputField, styles.rightAlign]}
                  value={placeOfIssue}
                  onChangeText={(value) => handleChange(setPlaceOfIssue, value)}
                  placeholder="Nhập nơi cấp"
                />
              </View>

              {/* Địa chỉ chi tiết */}
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Địa chỉ chi tiết</Text>
                <TextInput
                  style={[styles.inputField, styles.rightAlign]}
                  value={address}
                  onChangeText={(value) => handleChange(setAddress, value)}
                  placeholder="Nhập địa chỉ chi tiết"
                />
              </View>
            </View>

            {/* Nút Lưu thay đổi */}
            {isModified && (
              <TouchableOpacity
                onPress={handleUpdateData}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
              </TouchableOpacity>
            )}
            <View style={{ height: 200 }}></View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    paddingVertical: 20,
    width: "100%",
    gap: 20,
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
  },
  avatarContainer: {
    height: 50,
    width: 50,
    overflow: "hidden",
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  divider: {
    height: 0.5,
    width: "100%",
    backgroundColor: colors.grayC4,
  },
  infoRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: colors.gray59,
  },
  value: {
    color: colors.gray59,
    fontWeight: "500",
  },
  editContainer: {
    flexDirection: "column",
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  inputLabel: {
    flex: 1,
    color: colors.gray59,
    fontSize: 14,
  },
  inputField: {
    flex: 2,
    borderBottomWidth: 0.5,
    borderColor: colors.primary_green,
    paddingVertical: 5,
    color: colors.black,
    fontSize: 14,
  },
  rightAlign: {
    textAlign: "right",
  },
  saveButton: {
    backgroundColor: colors.primary_green,
    padding: 15,
    margin: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
