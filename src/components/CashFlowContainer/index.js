import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./cachflowContainerStyles";

// Hàm để chuyển đổi ngày thành thứ
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  return daysOfWeek[date.getDay()];
};

// Hàm để định dạng ngày tháng năm (dd-mm-yyyy)
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');  // Đảm bảo ngày có 2 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Tháng bắt đầu từ 0, nên cần +1
  const year = date.getFullYear();
  return { day, month, year };
};

const CashFlowContainer = ({ transactionsData, date, totalAmount }) => {
  const dayOfWeek = getDayOfWeek(date); // Lấy thứ từ ngày
  const { day, month, year } = formatDate(date); // Định dạng ngày, tháng, năm

  return (
    <View style={styles.container}>
      {/* Hiển thị ngày và tổng tiền */}
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Text style={styles.dayText}>{day}</Text> 
          <View>
            <Text style={styles.dateText}>{dayOfWeek}</Text> 
            <Text style={styles.monthText}>tháng {month}-{year}</Text> 
          </View>
        </View>
        <Text style={styles.amountText}>{totalAmount.toString()}</Text>
      </View>
      <View style={styles.divider}></View>
      {transactionsData.map((transaction) => (
        <TouchableOpacity key={transaction.id} style={styles.transactionContainer}>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>{transaction.title}</Text>
            <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>
          </View>
          <Text style={styles.transactionAmount}>{transaction.amount}</Text> 
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CashFlowContainer;
