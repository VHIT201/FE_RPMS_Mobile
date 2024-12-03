import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PrivacyPolicy = () => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <View style={styles.innerContainer}>

        <Text style={styles.subHeader}>1. Mục đích và phạm vi thu thập thông tin</Text>
        <Text style={styles.text}>
          1.1 – Việc thu thập thông tin cá nhân được thực hiện trên cơ sở khách hàng tự khai báo
          để đăng ký thành viên RPMS tại website hoặc trên ứng dụng di động của
          RPMS, tùy từng thời điểm, thông tin thu thập sẽ bao gồm nhưng không giới hạn ở:
          {"\n\n"}
          - Thông tin cá nhân như: họ tên, giới tính, ngày sinh, số CMND.
          {"\n"}
          - Thông tin liên lạc như: địa chỉ, số điện thoại di động, email/fax.
          {"\n"}
          - Các thông tin khác phục vụ cho chương trình khách hàng thân thiết (nếu có).
        </Text>

        <Text style={styles.subHeader}>1.2 – Mục đích thu thập thông tin khách hàng bao gồm:</Text>
        <Text style={styles.text}>
          - Cung cấp các dịch vụ, sản phẩm theo nhu cầu của khách hàng;
          {"\n"}
          - Liên hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ, xác lập giao dịch;
          {"\n"}
          - Thực hiện việc quản lý, gửi thông tin cập nhật, các chương trình khuyến mại, ưu đãi/tri ân tới khách hàng;
          {"\n"}
          - Bảo đảm quyền lợi của khách hàng khi phát hiện các hành động giả mạo, phá hoại tài khoản, lừa đảo khách hàng;
          {"\n"}
          - Liên lạc, hỗ trợ, giải quyết với khách hàng trong các trường hợp đặc biệt.
        </Text>

        <Text style={styles.subHeader}>1.3 – Để tránh nghi ngờ, trong quá trình giao dịch thanh toán, RPMS chỉ lưu giữ thông tin chi tiết về đơn hàng đã thanh toán của khách hàng, các thông tin về tài khoản ngân hàng của khách hàng sẽ không được lưu giữ.</Text>

        <Text style={styles.subHeader}>2. Phạm vi sử dụng thông tin</Text>
        <Text style={styles.text}>
          2.1 – RPMS chỉ sử dụng thông tin cá nhân của khách hàng cho các mục đích quy định tại Mục 1 hoặc mục đích khác (nếu có) với điều kiện đã thông báo và được sự đồng ý của khách hàng.
          {"\n\n"}
          2.2 – Khách hàng hiểu và đồng ý rằng RPMS có nghĩa vụ phải cung cấp thông tin khách hàng theo yêu cầu/quyết định của Cơ quan nhà nước có thẩm quyền và/hoặc quy định pháp luật. RPMS sẽ được miễn trừ mọi trách nhiệm liên quan đến bảo mật thông tin trong trường hợp này.
        </Text>

        <Text style={styles.subHeader}>3. Thời gian lưu trữ thông tin</Text>
        <Text style={styles.text}>
          Dữ liệu cá nhân cơ bản của khách hàng đăng ký thành viên RPMS sẽ được lưu trữ cho đến khi có yêu cầu đóng tài khoản. Đối với các tài khoản đã đóng chúng tôi vẫn lưu trữ thông tin cá nhân và truy cập của khách hàng để phục vụ cho mục đích phòng chống gian lận, điều tra, giải đáp thắc mắc … Các thông tin này sẽ được lưu trữ trong hệ thống máy chủ tối đa mười hai (12) tháng. Hết thời hạn này, RPMS sẽ tiến hành xóa vĩnh viễn thông tin cá nhân của khách hàng.
        </Text>

        <Text style={styles.subHeader}>4. Cách thức chỉnh sửa dữ liệu cá nhân</Text>
        <Text style={styles.text}>
          Để chỉnh sửa dữ liệu cá nhân của mình trên hệ thống của RPMS, khách hàng có thể tự đăng nhập và chỉnh sửa thông tin, dữ liệu cá nhân, ngoại trừ các thông tin về Họ tên, Giới tính, Ngày sinh và Chứng minh nhân dân.
        </Text>

        <Text style={styles.subHeader}>5. RPMS cam kết</Text>
        <Text style={styles.text}>
          5.1 – Mọi thông tin cá nhân của khách hàng thu thập từ hệ thống RPMS sẽ được lưu giữ an toàn; chỉ có khách hàng mới có thể truy cập vào tài khoản cá nhân của mình bằng tên đăng nhập và mật khẩu do khách hàng chọn.
          {"\n\n"}
          5.2 – RPMS cam kết bảo mật thông tin, không chia sẻ, tiết lộ, chuyển giao thông tin cá nhân của khách hàng, thông tin giao dịch trực tuyến cho bất kỳ bên thứ ba nào khi chưa được sự đồng ý của khách hàng, trừ trường hợp phải thực hiện theo yêu cầu của các cơ quan Nhà nước có thẩm quyền, hoặc theo quy định của pháp luật hoặc việc cung cấp thông tin đó là cần thiết để RPMS cung cấp dịch vụ/ tiện ích cho khách hàng.
          {"\n\n"}
          5.3 – RPMS, bằng nỗ lực tốt nhất của mình, sẽ áp dụng các giải pháp công nghệ để ngăn chặn các hành vi đánh cắp hoặc tiếp cận thông tin trái phép; sử dụng, thay đổi hoặc phá hủy thông tin trái phép. Tuy nhiên, RPMS không thể cam kết sẽ ngăn chặn được tất cả các hành vi xâm phạm, sử dụng thông tin cá nhân trái phép nằm ngoài khả năng kiểm soát của RPMS. RPMS sẽ không chịu trách nhiệm dưới bất kỳ hình thức nào đối với bất kỳ khiếu nại, tranh chấp hoặc thiệt hại nào phát sinh từ hoặc liên quan đến việc truy cập, xâm nhập, sử dụng thông tin trái phép như vậy.
          {"\n\n"}
          5.4 – Trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân, gây ảnh hưởng xấu đến khách hàng, RPMS sẽ ngay lập tức thông báo cho khách hàng và trình vụ việc cho cơ quan chức năng điều tra xử lý.
          {"\n\n"}
          5.5 – Đối với các giao dịch trực tuyến được thực hiện thông qua RPMS, RPMS không lưu trữ thông tin thẻ thanh toán của khách hàng. Thông tin tài khoản, thẻ thanh toán của khách hàng sẽ được các đối tác cổng thanh toán của RPMS bảo vệ theo tiêu chuẩn quốc tế.
          {"\n\n"}
          5.6 – Khách hàng có nghĩa vụ bảo mật tên đăng ký, mật khẩu và hộp thư điện tử của mình. RPMS sẽ không chịu trách nhiệm dưới bất kỳ hình thức nào đối với các thiệt hại, tổn thất (nếu có) do khách hàng không tuân thủ quy định bảo mật này.
          {"\n\n"}
          5.7 – Khách hàng tuyệt đối không được có các hành vi sử dụng công cụ, chương trình để can thiệp trái phép vào hệ thống hay làm thay đổi dữ liệu của RPMS. Trong trường hợp RPMS phát hiện khách hàng có hành vi cố tình giả mạo, gian lận, phát tán thông tin cá nhân trái phép … RPMS có quyền chuyển thông tin cá nhân của khách hàng cho các cơ quan có thẩm quyền để xử lý theo quy định của pháp luật.
        </Text>
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

export default PrivacyPolicy;
