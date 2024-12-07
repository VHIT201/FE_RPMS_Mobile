import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import generalStyles from "../../../styles/generalStyles";
import colors from "../../../values/colors";
import Header from "../../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  getAllRoomByUserId,
  getBillByRoomId,
} from "../../../services/invoiceServices";
import CustomModal from "../../../components/Modal/index";
import { Icons } from "../../../assets/icons";
import { createPayment } from "../../../services/invoiceServices";
import { WebView } from "react-native-webview";

const Invoice = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("unpaid"); // Mặc định là chưa thanh toán
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [selectedInvoice, setSelectedInvoice] = useState(null); // Hóa đơn được chọn để hiển thị
  const [roomId, setRoomId] = useState(null);
  const now = new Date();
  const userInfo = useSelector((state) => state.user.userInfo);
  const invoiceList = useSelector((state) => state.invoice.listInvoices);
  const [webViewVisible, setWebViewVisible] = useState(false); // Trạng thái hiển thị WebView
  const [paymentUrl, setPaymentUrl] = useState(""); // URL cho WebView

  // Fetch dữ liệu ban đầu
  const fetchInitialData = async () => {
    const response = await getAllRoomByUserId(userInfo?.id);
    if(response?.data?.id){
      setRoomId(response?.data.id);
      await getBillByRoomId(dispatch, response.data.id);
    }
    else {
      return null;
    }
  };

  // useEffect(() => {
  //   fetchInitialData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      fetchInitialData();

      return () => {
        //  thêm logic cleanup khi màn hình mất focus
        // console.log("Cleaning up on screen unfocus...");
      };
    }, []) // Không có dependency, chỉ chạy khi màn hình focus/unfocus
  );

  const handlePayment = async () => {
    const response = await createPayment(selectedInvoice.id);

    if (response.isSuccess) {
      navigation.navigate("WebViewScreen", {
        url: response.data,
        billId: selectedInvoice.id,
        roomId: roomId,
      });
    } else {
      alert("Thanh toán không thành công!");
    }
  };
  function calculateDates() {
    const now = new Date(); // Ngày hiện tại
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // Lưu ý: getMonth trả giá trị từ 0 đến 11

    // Tháng trước
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear =
      currentMonth === 0 ? currentYear - 1 : currentYear;

    // Tạo khoảng thời gian từ ngày 5 tháng trước đến ngày 5 tháng hiện tại
    const startDateRoom = new Date(previousMonthYear, previousMonth, 5);
    const endDateRoom = new Date(currentYear, currentMonth, 5);

    // Hạn thanh toán từ mùng 5 tháng này đến mùng 10 tháng này
    const startDueDate = new Date(currentYear, currentMonth, 5);
    const endDueDate = new Date(currentYear, currentMonth, 10);

    // Định dạng ngày thành DD-MM-YYYY
    const formatDate = (date) =>
      `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${date.getFullYear()}`;

    return {
      startDateRoom: formatDate(startDateRoom),
      endDateRoom: formatDate(endDateRoom),
      startDueDate: formatDate(startDueDate),
      endDueDate: formatDate(endDueDate),
    };
  }

  // Ví dụ gọi hàm
  const dates = calculateDates();
  // Output: {startDateRoom: "05-11-2024", endDateRoom: "05-12-2024", startDueDate: "05-12-2024", endDueDate: "10-12-2024"}

  // Lọc danh sách hóa đơn dựa trên trạng thái
  const filteredInvoices = invoiceList.filter((invoice) => {
    if (selectedStatus === "unpaid") return invoice.status_payment === 0;
    if (selectedStatus === "paid") return invoice.status_payment === 1;
    if (selectedStatus === "overdue") return invoice.status_payment === 2;
    return true;
  });

  // Xử lý khi bấm vào một item
  const handleInvoicePress = (invoice) => {
    setSelectedInvoice(invoice); // Lưu hóa đơn được chọn
    setModalVisible(true); // Hiển thị modal
  };

  return (
    <View style={[generalStyles.container, { position: "relative" }]}>
      <Header
        titleHeader={"Hóa đơn"}
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
      />
      <View
        style={[
          generalStyles.container,
          {
            backgroundColor: "white",
            borderTopWidth: 0.5,
            borderColor: colors.grayC4,
          },
        ]}
      >
        <View style={[generalStyles.flexRow, { height: 60, width: "100%" }]}>
          {/* Chưa thanh toán */}
          <TouchableOpacity
            onPress={() => setSelectedStatus("unpaid")}
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 2,
              borderBottomColor:
                selectedStatus === "unpaid" ? "green" : "white",
            }}
          >
            <Text
              style={{
                color: "green",
                fontWeight: selectedStatus === "unpaid" ? "bold" : "normal",
              }}
            >
              Chưa thanh toán
            </Text>
            <Text style={{ color: "green" }}>
              {
                invoiceList.filter((invoice) => invoice.status_payment === 0)
                  .length
              }
            </Text>
          </TouchableOpacity>

          {/* Đã thanh toán */}
          <TouchableOpacity
            onPress={() => setSelectedStatus("paid")}
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 2,
              borderBottomColor:
                selectedStatus === "paid" ? colors.primary_green : "white",
            }}
          >
            <Text
              style={{
                color: colors.primary_green,
                fontWeight: selectedStatus === "paid" ? "bold" : "normal",
              }}
            >
              Đã thanh toán
            </Text>
            <Text style={{ color: colors.primary_green }}>
              {
                invoiceList.filter((invoice) => invoice.status_payment === 1)
                  .length
              }
            </Text>
          </TouchableOpacity>

          {/* Đã quá hạn */}
          <TouchableOpacity
            onPress={() => setSelectedStatus("overdue")}
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 2,
              borderBottomColor: selectedStatus === "overdue" ? "red" : "white",
            }}
          >
            <Text
              style={{
                color: "red",
                fontWeight: selectedStatus === "overdue" ? "bold" : "normal",
              }}
            >
              Đã quá hạn
            </Text>
            <Text style={{ color: "red" }}>
              {invoiceList.filter((invoice) => invoice.status === 2).length}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}
        >
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice) => (
              <TouchableOpacity
                key={invoice.id}
                onPress={() => handleInvoicePress(invoice)} // Gọi hàm xử lý khi bấm
                style={[
                  generalStyles.boxShadow,
                  {
                    paddingVertical: 20,
                    borderWidth: 0.5,
                    borderColor: colors.primary_green,
                    paddingHorizontal: 20,
                    gap: 10,
                    flexDirection: "column",
                    borderRadius: 10,
                    marginBottom: 10,
                  },
                ]}
              >
                <View
                  style={[
                    generalStyles.flexRow,
                    { justifyContent: "flex-start", gap: 10 },
                  ]}
                >
                  <Icon name="home" size={18} color={colors.primary_green} />
                  <Text
                    style={{ color: colors.primary_green, fontWeight: "600" }}
                  >
                    {invoice.roomname}
                  </Text>
                </View>
                <View
                  style={[
                    generalStyles.flexRow,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Text>Tiền phòng</Text>
                  <Text
                    style={{ color: colors.primary_green, fontWeight: "600" }}
                  >
                    {invoice.cost_room.toLocaleString()} đ
                  </Text>
                </View>
                <View
                  style={[
                    generalStyles.flexRow,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Text>Tiền dịch vụ</Text>
                  <Text
                    style={{ color: colors.primary_green, fontWeight: "600" }}
                  >
                    {invoice.cost_service.toLocaleString()} đ
                  </Text>
                </View>
                <View
                  style={[
                    generalStyles.flexRow,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Text>Tổng</Text>
                  <Text style={{ color: "red", fontWeight: "600" }}>
                    {invoice.final_amount.toLocaleString()} đ
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                height: 300,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: colors.grayC4,
                  marginTop: 20,
                }}
              >
                Không có dữ liệu
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Modal hiển thị thông tin hóa đơn */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        titleHeader={`${selectedInvoice?.bill_name || "Chi tiết hóa đơn"}`}
        leftIconHeader={Icons.iconLeftArrow}
        styleIconHeader={{ height: 20, width: 20 }}
        headerStyles={{ justifyContent: "space-between" }}
        rightIconHeader={Icons.IconThreeDots}
        fullScreen
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 10,
            position: "relative",
          }}
        >
          {/* Tiêu đề */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>#Hóa đơn</Text>
            <Text style={{ fontSize: 14, color: colors.grayC4 }}>
              {`${now.getMonth() + 1}-${now.getFullYear()}`}
            </Text>
          </View>

          {/* Thông tin phòng */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Icon name="home" size={20} color={colors.primary_green} />
            <Text style={{ marginLeft: 10, fontWeight: "600", fontSize: 16 }}>
              {selectedInvoice?.roomname || "Tên phòng"}
            </Text>
          </View>

          {/* Thông tin chi tiết */}
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Icon name="pencil" size={14} color={colors.grayC4} />
              <Text
                style={{ marginLeft: 10, color: colors.grayC4, fontSize: 13 }}
              >
                Tiền phòng từ {dates.startDateRoom} đến {dates.endDateRoom}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Icon name="pencil" size={14} color={colors.grayC4} />
              <Text
                style={{ marginLeft: 10, color: colors.grayC4, fontSize: 13 }}
              >
                Tiền dịch vụ từ {dates.startDateRoom} đến {dates.endDateRoom}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Icon name="pencil" size={14} color={colors.grayC4} />
              <Text
                style={{ marginLeft: 10, color: colors.grayC4, fontSize: 13 }}
              >
                Hạn thanh toán từ {dates.startDueDate} đến {dates.endDueDate}
              </Text>
            </View>
          </View>
          {/* Tiền chi tiết */}
          <View style={{ marginBottom: 20, gap: 10, marginTop: 30 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                Tiền phòng
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: colors.primary_green,
                }}
              >
                {selectedInvoice?.cost_room.toLocaleString() || 0} đ
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                Tiền dịch vụ
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: colors.primary_green,
                }}
              >
                {selectedInvoice?.cost_service.toLocaleString() || 0} đ
              </Text>
            </View>
            <View style={{ width: "100%", height: 1, alignItems: "flex-end" }}>
              <View
                style={{ height: 1, width: "30%", backgroundColor: "gray" }}
              ></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "600" }}>Tổng</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "red",
                }}
              >
                {selectedInvoice?.final_amount.toLocaleString() || 0} đ
              </Text>
            </View>
          </View>
          {selectedInvoice?.status_payment === 0 && (
            <TouchableOpacity
              onPress={handlePayment}
              style={{
                height: 40,
                width: "90%",
                marginTop: 40,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: colors.primary_green,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Thanh toán
              </Text>
            </TouchableOpacity>
          )}
          {
            selectedInvoice?.status_payment === 1 ? (
              <View
              style={{
                height: 40,
                width: "90%",
                marginTop: 40,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: colors.gray59,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Đã thanh toán
              </Text>
            </View>
            )
            :
            (
              <View
              style={{
                height: 40,
                width: "90%",
                marginTop: 40,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: colors.gray59,
              }}
            >
              <Text style={{ color: "red", fontWeight: "600" }}>
                Quá hạn
              </Text>
            </View>
            )
          }
        </View>
      </CustomModal>
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({});
