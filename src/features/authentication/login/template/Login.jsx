// src/features/authentication/login/template/Login.js

import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import generalStyles from '../../../../styles/generalStyles';
import colors from '../../../../values/colors';
import { CommonImage } from '../../../../assets/images';
import TextInputComponent from '../../../../components/TextInput/index';
import loginStyles from '../loginStyles';
import ButtonComponent from '../../../../components/Button';
import axios from '../../../../config/axiosConfig';
import { useDispatch } from 'react-redux';
import { setAccount, saveToken, removeToken } from '../../../../store/userSlice';
import { showMessage } from "react-native-flash-message";
import Spinner from '../../../../components/Spinner/Spinner';
import { getTokenFromAsyncStorage } from '../../../../utils/asyncStorageHelper';
import { getUserInformation } from '../../../../services/userServices';
import { getAllRoomByUserId } from '../../../../services/userServices';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Trạng thái mật khẩu có hiển thị không
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeToken());
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      showMessage({
        message: "Vui lòng nhập email và mật khẩu.",
        type: "danger",
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post('identityusers/login', {
        username,
        password,
        role: 'USER',
      });
  
      setLoading(false);
  
      if (response.data.isSuccess) {
        const res = await getUserInformation(username, dispatch);
        await getAllRoomByUserId(res.id, dispatch);
        dispatch(setAccount({ userAccount: { username, password } }));
        dispatch(saveToken(response.data.data));
  
        showMessage({
          message: "Đăng nhập thành công!",
          type: "success",
          backgroundColor: colors.primary_green,
        });
  
        // Sử dụng navigation.reset để chuyển tới Home và không thể quay lại màn hình đăng nhập
        navigation.reset({
          index: 0, // Đặt index là 0 để Home là màn hình đầu tiên trong stack
          routes: [{ name: 'Home' }], // Chỉ giữ lại Home trong stack
        });
  
      } else {
        showMessage({
          message: "Đăng nhập thất bại! Vui lòng kiểm tra thông tin của bạn.",
          type: "danger",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      showMessage({
        message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
        type: "danger",
      });
    }
  };
  

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState); // Thay đổi trạng thái hiển thị mật khẩu
  };

  return (
    <SafeAreaView style={[generalStyles.container, { position: 'relative' }]}>
      <View style={[{ alignItems: 'center', marginTop: '30%' }, generalStyles.container]}>
        <View style={{ marginVertical: 30 }}>
          <Image source={CommonImage.LogoDefault} style={{ height: 100, width: 100 }} />
        </View>
        <View style={loginStyles.viewLogin}>
          <TextInputComponent
            styleAreaInput={{
              borderRadius: 5,
              height: 40,
              marginVertical: 10,
            }}
            style={{ color: colors.primary_green }}
            placeholder={'Email'}
            keyboardType={'email-address'}
            borderColor={colors.primary_green}
            value={username}
            onChangeText={setUsername}
          />
          <TextInputComponent
            styleAreaInput={{
              borderRadius: 5,
              height: 40,
            }}
            style={{ color: colors.primary_green }}
            placeholder={'Mật khẩu'}
            secureTextEntry={!isPasswordVisible} // Dựa vào trạng thái isPasswordVisible
            borderColor={colors.primary_green}
            showPassword={true}
            value={password}
            onChangeText={setPassword}
            onPressRightIcon={togglePasswordVisibility} // Sự kiện khi nhấn vào icon mắt
          />
        </View>
        <ButtonComponent
          text={'ĐĂNG NHẬP'}
          onPress={handleLogin}
          style={{
            height: 40,
            width: '90%',
            backgroundColor: colors.primary_green,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          textStyle={{ color: colors.white, fontWeight: '600' }}
        />
        
        <Text style={{ textDecorationLine: 'underline', fontSize: 13, marginTop: 10, color: colors.light_black }}>
          Bạn quên mật khẩu?
        </Text>
        <Text onPress={() => navigation.navigate('GuestBuilding')} style={{ textDecorationLine: 'underline', color: colors.primary_green, fontSize: 13, marginTop: 10 }}>
          Tiếp tục với tư cách khách
        </Text>
        <View
          style={[
            generalStyles.container,
            { width: '100%', paddingHorizontal: 20, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 },
          ]}
        >
          <Text style={{ color: colors.light_black }}>
            Bạn chưa có tài khoản? <Text
              onPress={() => navigation.navigate('SignUp')}
              style={{ color: colors.primary_green }}>Đăng ký ngay!</Text>
          </Text>
        </View>
      </View>
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
