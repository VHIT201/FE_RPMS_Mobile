import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import generalStyles from "../../../styles/generalStyles";
import colors from "../../../values/colors";
import CashFlowContainer from "../../../components/CashFlowContainer";
import Header from "../../../components/Header";

const CashFlow = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("Đồng Nai"); // Mặc định khu vực
  const flatListRef = useRef(null);

  // Tạo danh sách các tháng từ "1-2023" đến tháng hiện tại của năm 2024, cộng thêm vài tháng
  const months = useMemo(() => {
    const startDate = new Date(2023, 0); // January 2023
    const endDate = new Date(); // Current date
    endDate.setMonth(endDate.getMonth() + 10); // Add 10 extra months
    endDate.setDate(1); // Set to the first day of the month
    const dates = [];

    while (startDate <= endDate) {
      const month = startDate.getMonth() + 1;
      const year = startDate.getFullYear();
      dates.push(`${month}-${year}`);
      startDate.setMonth(startDate.getMonth() + 1);
    }

    return dates;
  }, []);

  useEffect(() => {
    if (months.length > 0) {
      const currentMonth = `${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
      setSelectedMonth(currentMonth);
    }
  }, [months]);

  // Hàm cuộn đến tháng đã chọn
  const scrollToSelectedMonth = useCallback(() => {
    if (flatListRef.current && selectedMonth) {
      const index = months.indexOf(selectedMonth);
      if (index !== -1) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  }, [selectedMonth, months]);

  // Cuộn đến tháng hiện tại khi danh sách được render lần đầu
  useEffect(() => {
    scrollToSelectedMonth();
  }, [scrollToSelectedMonth]);

  // Xử lý khi nhấn vào tháng
  const handleMonthPress = useCallback((month) => {
    setSelectedMonth(month);
  }, []);

  // Render mỗi nút tháng
  const renderMonthButton = useCallback(({ item }) => (
    <TouchableOpacity
      onPress={() => handleMonthPress(item)}
      style={{
        paddingVertical: 5,
        margin: 5,
        borderRadius: 5,
        width: 80,
        borderBottomWidth: 2,
        alignItems: "center",
        borderBottomColor: item === selectedMonth ? colors.primary_green : 'transparent',
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  ), [selectedMonth, handleMonthPress]);

  // Tính toán kích thước của mỗi mục
  const getItemLayout = (data, index) => ({
    length: 80, // Adjust this value based on the actual height of each item
    offset: 80 * index, // Adjust this value based on the actual height of each item
    index,
  });

  // Cấu hình để tối ưu hóa hiệu suất
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // Thêm khoảng trắng trước danh sách
  const ListHeader = () => <View style={{ width: 20 }} />;

  const transactionsData = [
    {
      date: "04-09-2024",
      totalAmount: "800.000",
      transactions: [
        {
          id: "1",
          title: "Tiền hóa đơn phòng",
          subtitle: "Phạm Văn Hi - 203 - Khu Kios",
          amount: "500.000",
        },
        {
          id: "2",
          title: "Tiền điện",
          subtitle: "Phạm Văn Hi - 203 - Khu Kios",
          amount: "300.000",
        },
      ],
    },
    {
      date: "05-09-2024",
      totalAmount: "200.000",
      transactions: [
        {
          id: "3",
          title: "Tiền nước",
          subtitle: "Phạm Văn Hi - 203 - Khu Kios",
          amount: "200.000",
        },
      ],
    },
    {
      date: "06-09-2024",
      totalAmount: "550.000",
      transactions: [
        {
          id: "4",
          title: "Tiền hóa đơn phòng",
          subtitle: "Nguyễn Văn A - 101 - Khu Kios",
          amount: "550.000",
        },
      ],
    },
  ];

  const renderTransaction = ({ item }) => {
    return (
      <CashFlowContainer
        date={item.date}
        transactionsData={item.transactions}
        totalAmount={item.totalAmount}
      />
    );
  };

  return (
    <View style={[generalStyles.container, { backgroundColor: colors.white, position: "relative" }]}>
      <Header titleHeader={'Thu chi'}/>
      {/* Thanh điều hướng chọn tháng */}
      <View style={generalStyles.flexRow}>
        <View style={[generalStyles.flexRow, { height: 40, width: '100%' }]}>
          <FlatList
            ref={flatListRef}
            data={months}
            renderItem={renderMonthButton}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            viewabilityConfig={viewabilityConfig}
            ListHeaderComponent={ListHeader}
            onScrollToIndexFailed={(info) => {
              const { index } = info;
              flatListRef.current.scrollToIndex({ index, animated: true });
            }}
          />
        </View>
      </View>

      {/* FlatList để hiển thị các giao dịch */}
      <FlatList
        data={transactionsData}
        renderItem={renderTransaction}
        keyExtractor={item => item.date}
        style={{ paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Nút thêm giao dịch */}
      <TouchableOpacity style={{ height: 60, width: 60, borderRadius: 30, backgroundColor: colors.primary_green, position: 'absolute', justifyContent: 'center', alignItems: 'center', bottom: '8%', right: '6%' }}>
        <Text style={{ color: colors.white, fontSize: 40 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CashFlow;
