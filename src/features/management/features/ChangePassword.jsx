import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Animated
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../values/colors";
import { changePassword } from "../../../services/userServices";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from "react-native-flash-message"; // Import showMessage
import { FlashMessage } from "react-native-flash-message";


const ChangePassword = ({closeModal}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(""); // Thêm trạng thái lỗi
  const userInfo = useSelector((state) => state.user.userInfo);

  const clearData = () =>{
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }
  // Animated values for input fields and button
  const currentY = new Animated.Value(50); 
  const newY = new Animated.Value(50);
  const confirmY = new Animated.Value(50);
  const buttonY = new Animated.Value(50);

  // Function to handle form submission
  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và mật khẩu nhập lại không khớp.");
    } else {
      setError("");
      const reponse = await changePassword(userInfo.username, currentPassword, newPassword);
      if(reponse.isSuccess){
          clearData()
      }
      closeModal()
      showMessage({
        message: "Đổi mật khẩu thành công!",
        type: "success",
        backgroundColor: colors.primary_green,
      });
    }
  };

  // Animation effect
  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(currentY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(newY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(confirmY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(buttonY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }} resetScrollToCoords={{ x: 0, y: 0 }}>
      <TouchableWithoutFeedback style={{ flex:1 }} onPress={Keyboard.dismiss}>
        <View style={[styles.container, { paddingTop: "20%", height:"100%", paddingBottom:'20%' }]}>
          {/* Current Password */}
          <Animated.View style={[styles.inputContainer, { transform: [{ translateY: currentY }] }]}>
            <Text style={styles.label}>Mật khẩu hiện tại *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputField}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
                placeholder="Mật khẩu hiện tại"
                placeholderTextColor={colors.grayC4}
              />
              <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Ionicons
                  name={showCurrentPassword ? "eye-off" : "eye"}
                  size={24}
                  color={colors.gray59}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* New Password */}
          <Animated.View style={[styles.inputContainer, { transform: [{ translateY: newY }] }]}>
            <Text style={styles.label}>Mật khẩu mới *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputField}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                placeholder="Mật khẩu mới"
                placeholderTextColor={colors.grayC4}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Ionicons
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={24}
                  color={colors.gray59}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Confirm Password */}
          <Animated.View style={[styles.inputContainer, { transform: [{ translateY: confirmY }] }]}>
            <Text style={styles.label}>Nhập lại mật khẩu mới *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputField}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholder="Nhập lại mật khẩu mới"
                placeholderTextColor={colors.grayC4}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color={colors.gray59}
                />
              </TouchableOpacity>
            </View>
            {/* Hiển thị lỗi nếu có */}
            {error && <Text style={styles.errorText}>{error}</Text>}
          </Animated.View>

          {/* Submit Button */}
          <Animated.View style={{ transform: [{ translateY: buttonY }] }}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: colors.gray59,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grayC4,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  inputField: {
    flex: 1,
    paddingVertical: 10,
    color: colors.black,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: colors.primary_green,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});
