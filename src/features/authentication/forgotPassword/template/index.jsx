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
import { forgotPassword } from "../../../../services/userServices";
import { showMessage } from "react-native-flash-message";

const ForgotPasswordScreen = ({ navigation }) => {
  // State to manage email input
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Function to handle password reset
  const handleResetPassword = async () => {
    // Simple email validation regex
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

    setIsLoading(true); // Start loading

    try {
      const response = await forgotPassword(email);
      if (response.isSuccess) {
        showMessage({
          message: "Vui lòng check Email của bạn!",
          type: "success",
          backgroundColor: colors.primary_green,
        });
        // Optionally navigate to another screen
        // navigation.navigate('LoginScreen');
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
      setIsLoading(false); // End loading
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      {step === 1 ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleResetPassword}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View>
            
        </View>
      )}
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
    fontFamily: fontFamily.regular, // Ensure fontFamily is correctly imported
  },
  button: {
    backgroundColor: colors.primary_green,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: colors.primary_green + "AA", // Semi-transparent to indicate disabled state
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
  },
});
