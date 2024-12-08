import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
  } from "react-native";
  import React, { useState } from "react";
  import Header from "../../../../components/Header";
  import generalStyles from "../../../../styles/generalStyles";
  import Icon from "react-native-vector-icons/FontAwesome";
  import colors from "../../../../values/colors";
  import TextInputComponent from "../../../../components/TextInput";
  import { fontFamily } from "../../../../assets/fonts/useFont";
  import { forgotPassword, updatePasswordForget, verifyOtp } from "../../../../services/userServices";
  import { showMessage } from "react-native-flash-message";
  import { OtpInput } from "react-native-otp-entry";
  
  const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [otp, setOtp] = useState(""); // State lưu giá trị OTP
    const [otpError, setOtpError] = useState(""); // State lưu lỗi OTP
    const [newPassword, setNewPassword] = useState(""); // State lưu mật khẩu mới
    const [newPasswordError, setNewPasswordError] = useState(""); // State lưu lỗi mật khẩu mới
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);  // Bước 1 là nhập email, bước 2 là nhập OTP, bước 3 là nhập mật khẩu mới
  
    // Xử lý yêu cầu reset mật khẩu
    const handleResetPassword = async () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!email) {
        setEmailError("Email không được để trống.");
        return;
      } else if (!emailRegex.test(email)) {
        setEmailError("Vui lòng nhập một email hợp lệ.");
        return;
      } else {
        setEmailError("");
      }
  
      setIsLoading(true);
  
      try {
        const response = await forgotPassword(email);
        if (response.isSuccess) {
          showMessage({
            message: "Vui lòng kiểm tra Email của bạn!",
            type: "success",
            backgroundColor: colors.primary_green,
          });
          // Chuyển sang bước 2 để nhập OTP
          setStep(2);
        } else {
          showMessage({
            message: response.data.message || "Có lỗi xảy ra. Vui lòng thử lại.",
            type: "danger",
          });
        }
      } catch (error) {
        console.error("Forgot Password Error:", error);
        showMessage({
          message: "Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại.",
          type: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    // Xử lý xác minh OTP
    const handleVerifyOtp = async () => {
      if (!otp || otp.length !== 6) {
        setOtpError("Vui lòng nhập OTP hợp lệ.");
        return;
      } else {
        setOtpError("");
      }
      setIsLoading(true);
      try {
        const response = await verifyOtp(email, otp);
        if (response.isSuccess) {
          showMessage({
            message: "Xác minh OTP thành công!",
            type: "success",
            backgroundColor: colors.primary_green,
          });
          // Chuyển sang bước 3 để nhập mật khẩu mới
          setStep(3);
        } else {
          showMessage({
            message: response.data.message || "OTP không hợp lệ. Vui lòng thử lại.",
            type: "danger",
          });
        }
      } catch (error) {
        console.log("OTP Verification Error:", error);
        showMessage({
          message: "Có lỗi xảy ra trong quá trình xác minh OTP. Vui lòng thử lại.",
          type: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    // Xử lý xác minh mật khẩu mới
    const handleSubmitNewPassword = async () => {
      if (!newPassword) {
        setNewPasswordError("Mật khẩu mới không được để trống.");
        return;
      } else {
        setNewPasswordError("");
      }
      const response = await updatePasswordForget(email, otp, newPassword)
      if (response.isSuccess) {
        showMessage({
          message: "Xác minh OTP thành công!",
          type: "success",
          backgroundColor: colors.primary_green,
        });
        navigation.navigate('Login')
      } else {
        showMessage({
          message: response.data.message || "Password không hợp lệ. Vui lòng thử lại.",
          type: "danger",
        });
      }
    };
  
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={generalStyles.container}>
          <Header
            leftIcon={
              <Icon
                onPress={() => navigation.goBack()}
                name="chevron-left"
                size={20}
                color={colors.light_black}
              />
            }
            titleHeader={"Quên mật khẩu"}
          />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {step === 1 ? (
              <View style={styles.contentContainer}>
                <TextInputComponent
                  styleAreaInput={{
                    borderRadius: 10,
                    height: 50,
                    marginBottom: 10,
                    fontSize: 15,
                  }}
                  label="Email"
                  placeholder="Nhập Email của bạn"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  errors={emailError}
                  require={true}
                  styleLabel={styles.label}
                />
                <TouchableOpacity
                  style={[styles.button, isLoading && styles.buttonDisabled]}
                  onPress={handleResetPassword}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : step === 2 ? (
              <View style={styles.contentContainer}>
                <OtpInput
                  value={otp}
                  length={6}
                  errorMessage={otpError}
                  autoFocus
                  focusColor={colors.primary_green}
                  style={{ marginBottom: 40 }}
                  onTextChange={(text) => setOtp(text)}
                />
                <TouchableOpacity
                  style={[styles.button, isLoading && styles.buttonDisabled]}
                  onPress={handleVerifyOtp}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.buttonText}>Xác minh OTP</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStep(1)}>
                  <Text
                    style={{
                      color: "black",
                      alignSelf: "center",
                      marginTop: 20,
                      fontSize: 16,
                      fontWeight: "500",
                      textDecorationLine: "underline",
                    }}
                  >
                    Quay lại
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.contentContainer}>
                <TextInputComponent
                  styleAreaInput={{
                    borderRadius: 10,
                    height: 50,
                    marginBottom: 10,
                    fontSize: 15,
                  }}
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới"
                  secureTextEntry
                  onChangeText={(text) => setNewPassword(text)}
                  value={newPassword}
                  errors={newPasswordError}
                  require={true}
                  styleLabel={styles.label}
                />
                <TouchableOpacity
                  style={[styles.button, isLoading && styles.buttonDisabled]}
                  onPress={handleSubmitNewPassword}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.buttonText}>Xác nhận mật khẩu mới</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default ForgotPasswordScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: "white",
      marginTop: 2,
      padding: 16,
      paddingTop: "50%",
    },
    label: {
      marginBottom: 5,
      fontSize: 16,
      fontFamily: fontFamily.regular,
    },
    button: {
      backgroundColor: colors.primary_green,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 20,
    },
    buttonDisabled: {
      backgroundColor: colors.primary_green + "AA",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontFamily: fontFamily.semiBold,
    },
  });
  