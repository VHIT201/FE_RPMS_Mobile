import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const TermsOfUse = () => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.text}>
          Việc bạn sử dụng hệ thống RPMS này đồng nghĩa với việc bạn đồng ý với những thỏa
          thuận dưới đây. Nếu bạn không đồng ý, xin vui lòng không sử dụng hệ thống RPMS.
        </Text>

        <Text style={styles.subHeader}>1. Trách nhiệm của người sử dụng:</Text>
        <Text style={styles.text}>
          Khi truy cập sử dụng RPMS, bạn đồng ý chấp nhận mọi rủi ro. RPMS và các bên đối tác
          khác không chịu trách nhiệm về bất kỳ tổn thất nào do những hậu quả trực tiếp, tình
          cờ hay gián tiếp; những thất thoát, chi phí (bao gồm chi phí pháp lý, chi phí tư vấn
          hoặc các khoản chi tiêu khác) có thể phát sinh trực tiếp hoặc gián tiếp do việc truy
          cập hoặc khi tải dữ liệu về máy; những tổn hại gặp phải do virus, hành động phá hoại
          trực tiếp hay gián tiếp của hệ thống máy tính khác, đường dây điện thoại, phần cứng,
          phần mềm, lỗi chương trình, hoặc bất kì các lỗi nào khác; đường truyền dẫn của máy
          tính hoặc nối kết mạng bị chậm…
        </Text>

        <Text style={styles.subHeader}>2. Về nội dung trên trang web:</Text>
        <Text style={styles.text}>
          Tất cả những thông tin ở đây được cung cấp cho bạn một cách trung thực như bản thân
          sự việc. RPMS và các bên liên quan không bảo đảm, hay có bất kỳ tuyên bố nào liên
          quan đến tính chính xác, tin cậy của việc sử dụng hay kết quả của việc sử dụng nội dung
          trên hệ thống. Nội dung trên hệ thống được cung cấp vì lợi ích của cộng đồng và có tính
          phi thương mại...
        </Text>

        <Text style={styles.subHeader}>3. Về bản quyền:</Text>
        <Text style={styles.text}>
          RPMS là chủ bản quyền của trang web này. Việc chỉnh sửa trang, nội dung, và sắp xếp thuộc
          về thẩm quyền của RPMS. Sự chỉnh sửa, thay đổi, phân phối hoặc tái sử dụng những nội dung
          trong trang này vì bất kì mục đích nào khác được xem như vi phạm quyền lợi hợp pháp của RPMS.
        </Text>

        <View style={{height:100}}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: "#555",
    textAlign: "justify",
  },
});

export default TermsOfUse;
