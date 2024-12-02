import React, { useCallback, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import ButtonComponent from "../../../../components/Button";
import TextInputComponent from "../../../../components/TextInput";
import generalStyles from "../../../../styles/generalStyles";
import colors from "../../../../values/colors";
import { CommonImage } from "../../../../assets/images";
import { Icons } from "../../../../assets/icons";
import styles from "../signUpStyles";
import axios from '../../../../config/axiosConfig'; // Nhập Axios từ cấu hình
import { showMessage } from "react-native-flash-message"; // Import showMessage
import { useDispatch } from "react-redux";
import { setAccount } from "../../../../store/userSlice"; // Sử dụng setAccount từ slice

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();

  // Bước 1: Tạo state để lưu trữ thông tin đăng ký
  const [account, setAccountState] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email:"",
    role: "user", // Mặc định là "user"
  });

  const [showPass, setShowPass] = useState(false); // Thêm state cho hiện/ẩn mật khẩu

  // Bước 2: Xử lý sự kiện khi người dùng nhập thông tin
  const handleInputChange = (field, value) => {
    setAccountState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Hàm toggle để hiện/ẩn mật khẩu
  const toggleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  // Bước 3: Xử lý khi người dùng nhấn nút "ĐĂNG KÝ"
  const onSubmitSignUp = useCallback(async () => {
    // Kiểm tra email có đúng định dạng hay không
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Kiểm tra các trường thông tin
    if (!account.firstName || !account.lastName || !account.username || !account.password || !account.email) {
      // Hiển thị thông báo khi có trường bị bỏ trống
      showMessage({
        message: "Vui lòng điền đầy đủ thông tin!",
        type: "danger",
      });
      return;
    }

    if (!isValidEmail(account.email)) {
      // Hiển thị thông báo khi email không đúng định dạng
      showMessage({
        message: "Email không đúng định dạng!",
        type: "danger",
      });
      return;
    }

    try {
      // Gửi yêu cầu đăng ký đến API
      const response = await axios.post('/identityusers/register', account);
      console.log(response.data.isSuccess);

      if (response.data.isSuccess) {
        // Gọi thông báo thành công
        showMessage({
          message: "Đăng ký thành công!",
          type: "success",
          backgroundColor: colors.primary_green
        });

        // Chuyển hướng đến trang Đăng Nhập
        navigation.navigate("Login");
      } else {
        // Hiển thị thông báo nếu không thành công
        showMessage({
          message: response.data.message || "Đăng ký không thành công.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error.response ? error.response.data : error.message);
      // Hiển thị lỗi nếu có
      showMessage({
        message: "Lỗi đăng ký, vui lòng thử lại!",
        type: "danger",
      });
    }
  }, [account, dispatch, navigation]);

  const navigateToLogin = useCallback(() => {
    navigation.navigate("Login");
  }, [navigation]);

  return (
    <SafeAreaView style={generalStyles.container}>
      <View style={[generalStyles.centerView, styles.topContainer]}>
        <Image source={CommonImage.LogoDefault} style={styles.logo} />
        <View style={styles.inputContainer}>
        <TextInputComponent
            style={{ color: colors.primary_green }}
            styleAreaInput={styles.input}
            placeholder={"Họ"}
            onChangeText={(text) => handleInputChange("firstName", text)}
            borderColor={colors.primary_green}
          />
          <TextInputComponent
            style={{ color: colors.primary_green }}
            styleAreaInput={styles.input}
            placeholder={"Tên"}
            onChangeText={(text) => handleInputChange("lastName", text)}
            borderColor={colors.primary_green}
          />
        <TextInputComponent
            style={{ color: colors.primary_green }}
            styleAreaInput={styles.input}
            placeholder={"Username"}
            keyboardType="email-address"
            onChangeText={(text) => handleInputChange("username", text)}
            borderColor={colors.primary_green}
          />
          <TextInputComponent
            style={{ color: colors.primary_green }}
            styleAreaInput={styles.input}
            placeholder={"Nhập email của bạn"}
            keyboardType="email-address"
            onChangeText={(text) => handleInputChange("email", text)}
            borderColor={colors.primary_green}
          />
                    <TextInputComponent
            style={{ color: colors.primary_green }}
            styleAreaInput={styles.input}
            placeholder={"Mật khẩu"}
            rightIcon={
              showPass ? Icons.iconShowPassword : Icons.iconHidePassword
            }
            onPressRightIcon={toggleShowPass} // Gọi hàm toggle khi nhấn vào biểu tượng
            secureTextEntry={!showPass} // Thay đổi giá trị secureTextEntry
            onChangeText={(text) => handleInputChange("password", text)}
            borderColor={colors.primary_green}
          />



        </View>
        <ButtonComponent
          style={styles.btnContinue}
          text={"ĐĂNG KÝ"}
          textStyle={styles.btnText}
          onPress={onSubmitSignUp} // Gọi hàm đăng ký khi nhấn nút
          backgroundColor={colors.white}
        />
        <View style={generalStyles.flexRow}>
          <Text style={styles.haveAccountText}>{"Đã có tài khoản?"} </Text>
          <Text onPress={navigateToLogin} style={styles.loginText}> 
            {"Đăng Nhập"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
