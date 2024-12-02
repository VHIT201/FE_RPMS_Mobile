import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../../../../values/colors";
import { fontFamily } from "../../../../assets/fonts/useFont";
import InfoSection from "../../../../components/InfoSection";
import generalStyles from "../../../../styles/generalStyles";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import ImageViewing from "react-native-image-viewing"; // Đảm bảo đã cài đặt thư viện này
import { FontAwesome } from '@expo/vector-icons'; // Sử dụng FontAwesome để thêm icon


const RoomInfoComponent = ({ room, isUserViewing = true, navigation }) => {
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false); // Trạng thái mở/đóng modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Chỉ số của ảnh đang xem

  const infoData1 = [
    [
      { label: "Diện tích", value: room.acreage + " m2" },
      { label: "Phòng ngủ", value: room.number_of_bedrooms },
    ],
    [
      { label: "Tầng", value: room.floor },
      { label: "Phòng khách", value: room.number_of_living_rooms },
    ],
  ];

  const handleBooking = () => {
    navigation.navigate("CreateBooking", {
      room: room,
    });
  };

  const openImageViewer = (index) => {
    setCurrentImageIndex(index); // Cập nhật chỉ số ảnh hiện tại
    setIsImageViewerVisible(true); // Mở modal xem ảnh
  };

  return (
    <ScrollView style={{ flex: 1, position: "relative" }}>
      <InfoSection
        styleValue={{ color: "white", fontFamily: fontFamily.bold }}
        styleLabel={{ color: colors.white, fontFamily: fontFamily.semiBold }}
        style={{ backgroundColor: colors.primary_green }}
        data={infoData1}
        numColumns={3}
      />

      <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
        <Text style={styles.label}>Hình ảnh phòng</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {room.imageUrls && room.imageUrls.length > 0 ? (
            room.imageUrls.map((imageUrl, index) => (
              <TouchableOpacity
                key={index}
                style={{ width: "48%", marginBottom: 10 }}
                onPress={() => openImageViewer(index)} // Mở modal khi bấm vào ảnh
              >
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width: "100%", height: 150, borderRadius: 10 }}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text
              style={{
                color: colors.gray59,
                textAlign: "center",
                width: "100%",
              }}
            >
              Không có ảnh
            </Text>
          )}
        </View>
      </View>

      {/* Modal Image Viewing */}
      <ImageViewing
        images={
          room.imageUrls ? room.imageUrls.map((url) => ({ uri: url })) : []
        }
        imageIndex={currentImageIndex}
        visible={isImageViewerVisible}
        onRequestClose={() => setIsImageViewerVisible(false)} // Đóng modal khi người dùng thoát
      />

      <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
        <Text style={styles.label}>Dịch vụ</Text>
        <View style={styles.serviceListContainer}>
        {room.roomservice && room.roomservice.length > 0 ? (
          room.roomservice.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <FontAwesome name="check-circle" size={20} color={colors.primary_green} style={styles.serviceIcon} />
              <Text style={styles.serviceText}>{service.serviceName}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noServiceText}>Không có dịch vụ</Text>
        )}
      </View>

        <Text style={styles.label}>Tiện ích phòng</Text>
        <View
          style={{
            width: "100%",
            paddingVertical: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.gray59 }}>Dữ liệu trống</Text>
        </View>

        <Text style={styles.label}>Nội thất</Text>
        <View
          style={{
            width: "100%",
            paddingVertical: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.gray59 }}>Dữ liệu trống</Text>
        </View>

        <Text style={styles.label}>Mô tả phòng</Text>
        <View style={[generalStyles.boxShadow, styles.textInputContainer]}>
          <AutoGrowingTextInput
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
            placeholder={"Chưa có mô tả"}
            editable={isUserViewing} // Điều kiện chỉnh sửa
          />
        </View>

        <Text style={styles.label}>Lưu ý cho người thuê phòng</Text>
        <View style={[generalStyles.boxShadow, styles.textInputContainer]}>
          <AutoGrowingTextInput
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
            placeholder={"Chưa có lưu ý"}
            editable={isUserViewing} 
          />
        </View>

        {isUserViewing ? (
          <TouchableOpacity
            style={{
              height: 50,
              marginTop: 20,
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: fontFamily.bold, color: colors.white }}>
              Xóa phòng
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

export default RoomInfoComponent;

const styles = StyleSheet.create({
  label: {
    fontFamily: fontFamily.bold,
    marginBottom: 10,
  },
  textInputContainer: {
    paddingVertical: 10,
    minHeight: 70,
    marginTop: 10,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  serviceCard: {
    flexDirection:"row",
    marginBottom:10,
    gap:5
  }
});
