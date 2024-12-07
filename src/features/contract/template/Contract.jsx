import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../../components/Header";
import generalStyles from "../../../styles/generalStyles";
import colors from "../../../values/colors";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  getContractById,
  getContractByUserId,
} from "../../../services/userServices";
import * as Linking from "expo-linking";

const Contract = ({ navigation }) => {
  const [contract, setContract] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);

  const fetchInititalData = async () => {
    const response = await getContractByUserId(userInfo.id);
    if (response?.data) {
      setContract(response?.data); // Set contract data if exists
    } else {
      setContract(null);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchInititalData();
    }, [])
  );

  const handlePress = async () => {
    try {
      const response = await getContractById(contract.id);

      if (response.isSuccess) {
        const downloadUrl = response.data.downloadLink;

        // Mở URL trong trình duyệt web
        Linking.openURL(downloadUrl).catch((err) => {
          console.log("Không thể mở URL: ", err);
          Alert.alert("Lỗi", "Không thể mở URL trong trình duyệt.");
        });
      } else {
        Alert.alert("Lỗi", "Không thể lấy thông tin hợp đồng.");
      }
    } catch (error) {
      console.log("Lỗi khi tải tệp hợp đồng: ", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tải hợp đồng.");
    }
  };

  function convertDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <View style={[generalStyles.container, { backgroundColor: "white" }]}>
      <Header
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
          />
        }
        titleHeader={"Hợp đồng"}
      />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {/* Kiểm tra nếu contract tồn tại thì mới hiển thị card */}
          {contract ? (
            <TouchableOpacity
              onPress={handlePress}
              style={[
                generalStyles.boxShadow,
                {
                  width: "100%",
                  gap: 10,
                  padding: 20,
                  borderRadius: 10,
                  flexDirection: "column",
                  marginTop: 20,
                },
              ]}
            >
              {/* Contract Name */}
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    color: colors.primary_green,
                    fontSize: 15,
                  }}
                >
                  {contract?.contract_name}
                </Text>
              </View>

              {/* Room */}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Icon name="home" color={colors.gray59} size={20} />
                <Text style={{ fontWeight: "500", color: colors.gray59 }}>
                  Phòng: {contract?.room}
                </Text>
              </View>

              {/* Contract Dates */}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Icon name="calendar" color={colors.gray59} size={20} />
                <Text style={{ fontWeight: "500", color: colors.gray59 }}>
                  Thời hạn:{" "}
                  {`${convertDate(contract?.start_day)} đến ${convertDate(
                    contract?.end_day
                  )}`}
                </Text>
              </View>

              {/* Room Fee + Deposit */}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Icon name="money" color={colors.gray59} size={20} />
                <Text style={{ fontWeight: "500", color: colors.gray59 }}>
                  Chi phí: {contract?.room_fee} VNĐ
                </Text>
              </View>

              {/* Payment Term */}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Icon name="credit-card" color={colors.gray59} size={20} />
                <Text style={{ fontWeight: "500", color: colors.gray59 }}>
                  Thanh toán:{" "}
                  {contract?.payment_term === 0 ? "Chuyển khoản" : "Tiền mặt"}
                </Text>
              </View>

              {/* Billing Start Date */}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Icon name="calendar" color={colors.gray59} size={20} />
                <Text style={{ fontWeight: "500", color: colors.gray59 }}>
                  Ngày bắt đầu: {convertDate(contract?.billing_start_date)}
                </Text>
              </View>

              {/* Clause */}
              {contract?.clause && (
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Icon name="file-text" color={colors.gray59} size={20} />
                  <Text style={{ fontWeight: "500", color: colors.gray59 }}>
                    {contract?.clause}
                  </Text>
                </View>
              )}

              {/* Customer Name */}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Icon name="user" color={colors.gray59} size={20} />
                <Text style={{ fontWeight: "500", color: colors.gray59 }}>
                  Khách hàng: {contract?.customerName}
                </Text>
              </View>

              {/* Rental Management */}
              {contract?.rentalManagement && (
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Icon name="building" color={colors.gray59} size={20} />
                  <Text style={{ fontWeight: "500", color: colors.gray59 }}>
                    Quản lý: {contract?.rentalManagement}
                  </Text>
                </View>
              )}

              {/* Action: View Details */}
              <View style={{ width: "100%" }}>
                <Text
                  style={{
                    color: colors.primary_green,
                    fontSize: 12,
                    alignSelf: "flex-end",
                  }}
                >
                  Chọn để xem chi tiết
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={{ height: "40%", justifyContent: "flex-end" }}>
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                Không có hợp đồng nào.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Contract;
