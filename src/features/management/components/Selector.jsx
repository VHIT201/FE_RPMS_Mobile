import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomModal from "../../../components/Modal/index";
import Profile from "../features/Profile";
import { Icons } from "../../../assets/icons";
import ChangePassword from "../features/ChangePassword";
import { removeToken, resetUser } from "../../../store/userSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const Selector = () => {
  // State để điều khiển việc hiển thị modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false)
  // Hàm để đóng modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleClosePasswordModal = () => {
    setChangePasswordVisible(false);
  };

  const handleLogOut = async () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
  
    try {
      // Xóa token khỏi AsyncStorage và Redux
      dispatch(removeToken()); 
  
      // Hiển thị thông báo đăng xuất thành công
      showMessage({
        message: 'Đăng xuất thành công!',
        type: 'success',
        backgroundColor: '#4CAF50', // Màu xanh lá
      });
  
      // Chuyển hướng đến màn hình đăng nhập
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
      showMessage({
        message: 'Đã xảy ra lỗi, vui lòng thử lại.',
        type: 'danger',
      });
    }
  };

  return (
    <View>
      {/* Phần Cá nhân */}
      <View
        style={{
          padding: 20,
          backgroundColor: "#ffffff",
          borderRadius: 10,
          margin: 10,
          marginTop: 20,
        }}
      >
        {/* Tiêu đề */}
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 15 }}>
          Cá nhân
        </Text>

        {/* Thông tin tài khoản */}
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)} // Mở modal khi nhấn vào
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "95%" }}
          >
            <View style={{ width: "10%" }}>
              <Icon name="user" size={24} color="#4A90E2" />
            </View>
            <View style={{ width: "90%" }}>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Thông tin tài khoản
              </Text>
            </View>
          </View>
          <Icon name="angle-right" size={24} color="#B0B0B0" />
        </TouchableOpacity>
      </View>

      {/* Phần Modal */}
      <CustomModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        fullScreen
        titleHeader={"Thông tin tài khoản"}
        modalBackgroundStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        modalContainerStyle={{
            flex:1,
            width:"100%"
        }}
        headerStyles={{ paddingHorizontal: 10, paddingVertical: 15, justifyContent:"space-between" }}
        leftIconHeader={Icons.iconLeftArrow} 
        rightIconHeader={Icons.IconThreeDots}
        styleIconHeader={{ width: 20, height: 20 }}
        onLeftIconHeaderPress={handleCloseModal}
        children={
            <Profile closeModal={()=>setIsModalVisible(false)}/>
        }
      >
      </CustomModal>


      <CustomModal
        visible={changePasswordVisible}
        onClose={handleClosePasswordModal}
        fullScreen
        titleHeader={"Đổi mật khẩu"}
        modalBackgroundStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        modalContainerStyle={{
            flex:1,
            width:"100%"
        }}
        headerStyles={{ paddingHorizontal: 10, paddingVertical: 15, justifyContent:"space-between" }}
        leftIconHeader={Icons.iconLeftArrow} 
        rightIconHeader={Icons.IconThreeDots}
        styleIconHeader={{ width: 20, height: 20 }}
        onLeftIconHeaderPress={handleClosePasswordModal}
        children={
            <ChangePassword closeModal={()=>setChangePasswordVisible(false)}/>
        }
      >
      </CustomModal>


      {/* Các phần còn lại */}
      {/* Phần Cài đặt */}
      <View
        style={{
          padding: 20,
          backgroundColor: "#ffffff",
          borderRadius: 10,
          margin: 10,
          gap: 20,
        }}
      >
        {/* Tiêu đề */}
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Cài đặt</Text>

        {/* Đổi mật khẩu */}
        <TouchableOpacity
          onPress={()=>setChangePasswordVisible(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "95%" }}
          >
            <View style={{ width: "10%" }}>
              <Icon name="lock" size={24} color="#F5A623" />
            </View>
            <View style={{ width: "90%" }}>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Đổi mật khẩu
              </Text>
            </View>
          </View>
          <Icon name="angle-right" size={24} color="#B0B0B0" />
        </TouchableOpacity>

        {/* Ngôn ngữ */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "95%" }}
          >
            <View style={{ width: "10%" }}>
              <Icon name="globe" size={24} color="#50E3C2" />
            </View>
            <View style={{ width: "90%" }}>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>Ngôn ngữ</Text>
            </View>
          </View>
          <Icon name="angle-right" size={24} color="#B0B0B0" />
        </TouchableOpacity>
      </View>

      {/* Phần Về chúng tôi */}
      <View
        style={{
          padding: 20,
          backgroundColor: "#ffffff",
          borderRadius: 10,
          margin: 10,
          gap: 20,
        }}
      >
        {/* Tiêu đề */}
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Về chúng tôi</Text>

        {/* Điều khoản sử dụng */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "95%" }}
          >
            <View style={{ width: "10%" }}>
              <Icon name="file-text" size={24} color="#7B7D7D" />
            </View>
            <View style={{ width: "90%" }}>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Điều khoản sử dụng
              </Text>
            </View>
          </View>
          <Icon name="angle-right" size={24} color="#B0B0B0" />
        </TouchableOpacity>

        {/* Chính sách bảo mật */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "95%" }}
          >
            <View style={{ width: "10%" }}>
              <Icon name="shield" size={24} color="#BD10E0" />
            </View>
            <View style={{ width: "90%" }}>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Chính sách bảo mật
              </Text>
            </View>
          </View>
          <Icon name="angle-right" size={24} color="#B0B0B0" />
        </TouchableOpacity>

        {/* Hotline Hỗ trợ */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "95%" }}
          >
            <View style={{ width: "10%" }}>
              <Icon name="phone" size={24} color="#D0021B" />
            </View>
            <View style={{ width: "90%" }}>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Hotline Hỗ trợ
              </Text>
            </View>
          </View>
          <Icon name="angle-right" size={24} color="#B0B0B0" />
        </TouchableOpacity>

        {/* Zalo hỗ trợ */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "95%" }}
          >
            <View style={{ width: "10%" }}>
              <Icon name="comments" size={24} color="#F8E71C" />
            </View>
            <View style={{ width: "90%" }}>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Zalo Hỗ trợ
              </Text>
            </View>
          </View>
          <Icon name="angle-right" size={24} color="#B0B0B0" />
        </TouchableOpacity>
      </View>

      {/* Phần Đăng xuất */}
      <View
        style={{
          padding: 20,
          backgroundColor: "#ffffff",
          borderRadius: 10,
          margin: 10,
          marginTop: 20,
        }}
      >
        {/* Đăng xuất */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "95%" }}
          >
            <View style={{ width: "10%" }}>
              <Icon name="sign-out" size={24} color="#D0021B" />
            </View>
            <TouchableOpacity onPress={handleLogOut} style={{ width: "90%" }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#D0021B" }}>
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </View>
          <Icon name="angle-right" size={24} color="#B0B0B0" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Selector;
