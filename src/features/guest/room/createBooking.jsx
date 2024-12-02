import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Header from "../../../components/Header";
import colors from "../../../values/colors";
import generalStyles from "../../../styles/generalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import TextInputComponent from "../../../components/TextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createBooking } from "../../../services/guestService";
import { useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";

const CreateBooking = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { room } = route.params; // Retrieve room data passed via navigation
const dispatch = useDispatch()
  // State for form fields
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null); // Default as null for initial state
  const [note, setNote] = useState("");

  // State for date picker visibility
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Function to handle form submission
  const handleBooking = async () => {
    if (!customerName || !phone || !email || !date) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const bookingData = {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      roomid: room.id,
      customername: customerName,
      phone: phone,
      email: email,
      date: date.toISOString(), // Convert to ISO format
      status: 0, // Default status
      note: note,
    };

    await createBooking(dispatch ,bookingData)
    showMessage({
        message: "Đã đặt lịch thành công, vui lòng kiểm tra email",
        type: "success",
        duration:5000,
        backgroundColor:colors.primary_green
      });
    navigation.goBack();
  };

  return (
    <View style={[generalStyles.container, { backgroundColor: colors.white }]}>
      <Header
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={"Tạo lịch hẹn"}
      />

      <ScrollView style={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInputComponent
          placeholder="Nhập tên khách hàng"
          value={customerName}
          onChangeText={setCustomerName}
          borderColor={colors.primary_green}
        />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInputComponent
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          borderColor={colors.primary_green}
        />

        <Text style={styles.label}>Email</Text>
        <TextInputComponent
          placeholder="Nhập email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          borderColor={colors.primary_green}
        />

        <Text style={styles.label}>Ngày và Giờ đặt lịch</Text>
        <TouchableOpacity
          onPress={() => setDatePickerVisible(true)}
          style={[styles.datePicker, { borderColor: colors.primary_green }]}
        >
          <Text style={styles.dateText}>
            {date
              ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
              : "Chọn ngày và giờ"}
          </Text>
          <Icon name="calendar" size={20} color={colors.primary_green} />
        </TouchableOpacity>

        {/* Date-Time Picker */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime" // Allows date and time selection
          onConfirm={(selectedDate) => {
            setDate(selectedDate);
            setDatePickerVisible(false);
          }}
          onCancel={() => setDatePickerVisible(false)}
        />

        <Text style={styles.label}>Ghi chú</Text>
        <TextInputComponent
          placeholder="Nhập ghi chú"
          value={note}
          onChangeText={setNote}
          multiline={true}
          numberOfLines={3}
          styleAreaInput={{ height: 100 }}
          borderColor={colors.primary_green}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleBooking}>
          <Text style={styles.submitButtonText}>Xác nhận đặt lịch</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateBooking;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
    color: colors.light_black,
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: colors.light_black,
  },
  submitButton: {
    backgroundColor: colors.primary_green,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // For shadow on Android
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
