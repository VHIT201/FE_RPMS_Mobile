import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../values/colors";
import { getBillByRoomId, updatePaymentStatus } from "../../../services/invoiceServices";

const WebViewScreen = ({ route, navigation }) => {
  const { url, billId, roomId } = route.params; // Nhận URL từ params
  const [currentUrl, setCurrentUrl] = useState(""); // Lưu URL hiện tại

  const handleNavigationStateChange = (navState) => {
    setCurrentUrl(navState.url); // Cập nhật URL hiện tại
  
    // Tách giá trị của `vnp_TransactionStatus`
    const urlParams = new URLSearchParams(navState.url.split("?")[1]); // Lấy phần query string sau dấu '?'
    const transactionStatus = urlParams.get("vnp_TransactionStatus"); // Lấy giá trị `vnp_TransactionStatus`
  
    // Kiểm tra giá trị và xử lý
    if (transactionStatus === "00") {
      handleSuccess(); // Gọi hàm xử lý thành công
    } else if (transactionStatus === "01") {
      handleFailure(); // Gọi hàm xử lý thất bại
    }
  };
  
  // Hàm xử lý thành công
  const handleSuccess = async () => {
    console.log("Thanh toán thành công!");
    await updatePaymentStatus(billId)
    // await getBillByRoomId(roomId)
    navigation.navigate('Invoice')
  };
  
  // Hàm xử lý thất bại
  const handleFailure = () => {
    console.log("Thanh toán thất bại!");
  };
  

  return (
    <View style={{ flex: 1 }}>
      {/* Thanh header với nút Trở về */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Quay lại trang trước
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={16} color="white" />
          <Text style={styles.backText}>Trở về</Text>
        </TouchableOpacity>
      </View>

      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        onNavigationStateChange={handleNavigationStateChange} // Lắng nghe sự kiện điều hướng
        onError={(error) => {
          console.error("WebView error:", error);
          Alert.alert("Lỗi", "Không thể tải trang. Vui lòng thử lại.");
        }}
      />

      {/* Hiển thị URL hiện tại (chỉ để debug, có thể xóa đi) */}
      <View style={styles.urlDisplay}>
        <Text style={styles.urlText}>{currentUrl}</Text>
      </View>
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: colors.primary_green, // Màu nền header
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "20%", // Chiếm 20% chiều ngang
    height: "100%",
  },
  backText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5, // Khoảng cách giữa icon và text
  },
  urlDisplay: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  urlText: {
    fontSize: 12,
    color: "#333",
  },
});
