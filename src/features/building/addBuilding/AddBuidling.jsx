// AddBuilding.js
import { StyleSheet, View, Dimensions, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/Header';
import colors from '../../../values/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import TextInputComponent from '../../../components/TextInput';
import { fontFamily } from '../../../assets/fonts/useFont';
import generalStyles from '../../../styles/generalStyles';
import { Icons } from '../../../assets/icons';
import { getTokenFromAsyncStorage } from '../../../utils/asyncStorageHelper';
import { showMessage } from "react-native-flash-message"; // Import showMessage
import axios from '../../../config/axiosConfig'
const AddBuilding = ({navigation}) => {
  // Lấy kích thước màn hình
  const { width, height } = Dimensions.get('window');

  const [token, setToken] = useState(null)

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getTokenFromAsyncStorage(); // Gọi hàm để lấy token
      setToken(storedToken); // Cập nhật state với token lấy được
      console.log('Token :',storedToken);
    };

    fetchToken();
  }, []);
  // Hàm trả về biểu tượng quay lại
  const leftIcon = (
    <Ionicons onPress={()=> navigation.goBack()}  name="chevron-back-outline" size={30} color={colors.black} />
  );

    // Hàm kiểm tra token
    const checkToken = () => {
        if (!token) {
            showMessage({
                message: "Bạn chưa đăng nhập. Vui lòng đăng nhập lại.",
                type: "warning",
            });
            setTimeout(() => {
                navigation.navigate('Login');
            }, 2000);
            return false; // Trả về false nếu không có token
        }
        return true; // Trả về true nếu có token
    };


  const [buildingInfo, setBuildingInfo] = useState({
    building_name: '',
    number_of_floors: '',
    rental_costs: '',
    description: '',
    address: '',
    city: '',
    district: '',
    payment_date: 1,
    advance_notice: 15,
    payment_time: 1,
    payment_timeout: 5,
    management: '',
    fee_based_service: '',
    free_service: '',
    utilities: '',
    building_note: '',
  });

  const handleInputChange = (field, value) => {
    setBuildingInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleCreateBuilding = async () => {
    // Kiểm tra token hợp lệ
    if (!checkToken()) {
      showMessage({
        message: "Vui lòng đăng nhập để thực hiện thao tác này.",
        type: "danger",
      });
      return; // Thoát nếu không có token
    }
  
    // Kiểm tra thông tin tòa nhà có đầy đủ không
    const requiredFields = ["building_name", "number_of_floors", "description", "address", "city", "district", "payment_date", "advance_notice", "payment_time", "payment_timeout"];
    
    const missingFields = requiredFields.filter((field) => !buildingInfo[field]);
  
    if (missingFields.length > 0) {
      showMessage({
        message: "Vui lòng cung cấp đầy đủ thông tin tòa nhà.",
        type: "danger",
      });
      return; // Thoát nếu thiếu trường
    }
  
    try {
      const response = await axios.post('/building/create', buildingInfo, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
  
      // Kiểm tra phản hồi từ server
      if (response.data.isSuccess) {
        showMessage({
          message: "Tòa nhà đã được thêm thành công!",
          type: "success",
        });
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        showMessage({
          message: "Có lỗi xảy ra. Vui lòng thử lại.",
          type: "danger",
        });
      }
    } catch (error) {
      // Nếu mã lỗi là 403, chuyển hướng về trang Login
      if (error.response && error.response.status === 403) {
        showMessage({
          message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
          type: "danger",
        });
        setTimeout(() => {
          navigation.navigate('Login'); // Điều hướng về trang Login
        }, 2000);
      } else {
        console.error(error);
        showMessage({
          message: "Có lỗi xảy ra. Vui lòng thử lại.",
          type: "danger",
        });
      }
    }
  };
  
  
  return (
    <View style={[styles.container, { width, height }]}>
      <Header leftIcon={leftIcon} titleHeader={'Thêm tòa nhà'} />
      <ScrollView contentContainerStyle={{paddingHorizontal:10}}>
        <View style={{height:20}}></View>
        <Text style={{fontFamily: fontFamily.regular}}>Tên tòa nhà <Text style={{color:'red'}}>*</Text></Text>
        <TextInputComponent 
            noBorder={true} 
            styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
            placeholder={'Nhập tên tòa nhà'}
            borderColor={colors.grayC4}
            styleLabel={{fontFamily:fontFamily.regular}}
            onChangeText={(text) => handleInputChange("building_name", text)}
            />
        <View style={{height:20}}></View>
        <Text style={{fontFamily: fontFamily.regular}}>Số tầng <Text style={{color:'red'}}>*</Text></Text>
        <TextInputComponent 
            noBorder={true} 
            styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
            placeholder={'Nhập số tầng'}
            borderColor={colors.grayC4}
            styleLabel={{fontFamily:fontFamily.regular}}
            onChangeText={(text) => handleInputChange("number_of_floors", text)}
            />
        <View style={{height:20}}></View>
        <Text style={{fontFamily: fontFamily.regular}}>Chi phí thuê nhà</Text>
        <TextInputComponent 
            noBorder={true} 
            styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
            placeholder={'Nhập chi phí thuê nhà'}
            borderColor={colors.grayC4}
            styleLabel={{fontFamily:fontFamily.regular}}
            onChangeText={(text) => handleInputChange("rental_costs", text)}
            />
        <View style={{height:20}}></View>
        <Text style={{fontFamily: fontFamily.regular}}>Mô tả <Text style={{color:'red'}}>*</Text></Text>
        <TextInputComponent 
            noBorder={true} 
            styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
            placeholder={'Nhập mô tả'}
            borderColor={colors.grayC4}
            styleLabel={{fontFamily:fontFamily.regular}}
            onChangeText={(text) => handleInputChange("description", text)}
            />
        <View style={{height:20}}></View>
        <Text style={{fontFamily: fontFamily.regular}}>Địa chỉ <Text style={{color:'red'}}>*</Text></Text>
        <TextInputComponent 
            noBorder={true} 
            styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
            placeholder={'Nhập địa chỉ'}
            borderColor={colors.grayC4}
            styleLabel={{fontFamily:fontFamily.regular}}
            onChangeText={(text) => handleInputChange("address", text)}
            />
        <View style={{flexDirection:'row', justifyContent:"space-between", marginTop:20}}>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Tỉnh/Thành phố <Text style={{color:'red'}}>*</Text></Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Nhập Tỉnh/Thành phố'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    onChangeText={(text) => handleInputChange("city", text)}
                    />
            </View>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Quận/Huyện <Text style={{color:'red'}}>*</Text></Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Nhập Quận/Huyện'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    onChangeText={(text) => handleInputChange("district", text)}
                    />
            </View>
        </View>

        <View style={{flexDirection:'row', justifyContent:"space-between", marginTop:20}}>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Ngày chốt tiền <Text style={{color:'red'}}>*</Text></Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Chọn ngày chốt'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    onChangeText={(text) => handleInputChange("payment_date", text)}
                    />
            </View>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Chuyển báo trước <Text style={{color:'red'}}>*</Text> </Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Số ngày báo trước'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    onChangeText={(text) => handleInputChange("advance_notice", text)}
                    />
            </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-between", marginTop:20}}>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Thời gian nộp tiền phòng <Text style={{color:'red'}}>*</Text></Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Ngày bắt đầu'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    onChangeText={(text) => handleInputChange("payment_time", text)}
                    />
            </View>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}></Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Ngày kết thúc'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    onChangeText={(text) => handleInputChange("payment_timeout", text)}
                    />
            </View>
        </View>
        <View style={{marginTop:30,gap:10}}>
            <Text style={{fontFamily:fontFamily.bold}}>Quản lý tòa nhà</Text>
            <View style={[{height:150, width:120, borderRadius:10, alignItems:"center", justifyContent:"center"}, generalStyles.boxShadow]}>
                <Image style={{height:50,width:50, marginBottom:10}} resizeMode={'cover'} source={Icons.iconUserGrayC4Full}/>
                <Text style={{fontSize:12, fontFamily:fontFamily.semiBold, marginBottom:4}}>Phạm Văn Hoàng</Text>
                <Text style={{fontSize:12, color:colors.primary_green}}>0382823789</Text>
            </View>
        </View>

        <View style={{marginTop:30,gap:10}}>
            <Text style={{fontFamily:fontFamily.bold}}>Dịch vụ có phí</Text>
            <View style={[{height:150}]}>
               
            </View>
        </View>

        <View style={{width:"100%",gap:40}}>
            <Text style={{fontFamily:fontFamily.bold}}>Lưu ý của tòa nhà</Text>
            <TextInputComponent
                style={[{height:100,width:"100%", borderRadius:10, color:colors.black, paddingHorizontal:10}, generalStyles.boxShadow]}
                noBorder
                numberOfLines={4}
                multiline
                placeholder={'Nhập lưu ý của tòa nhà'}
                placeholderTextColor={colors.gray59}
                onChangeText={(text) => handleInputChange("building_note", text)}
            />
        </View>
        <TouchableOpacity
            onPress={handleCreateBuilding}
            style={{height:50, width:"100%", backgroundColor:colors.primary_green, marginTop:80, borderRadius:10, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontFamily:fontFamily.bold, color:colors.white, fontSize:15}}>Thêm tòa nhà</Text>
        </TouchableOpacity>


        <View style={{height:300}}></View>


      </ScrollView>
    </View>
  );
};

export default AddBuilding;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.white,
  },
});
