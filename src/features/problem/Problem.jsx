import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import Header from "../../components/Header";
import generalStyles from "../../styles/generalStyles";
import colors from "../../values/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { fontFamily } from "../../assets/fonts/useFont";
import ProblemComponent from "./components/ProblemContainer";
import CreateProblemModal from "./components/CreateProblemComponent";
import { useSelector, useDispatch } from "react-redux";
import { getAllRoomByUserId } from "../../services/userServices";
import {
  getAllProblem,
  getProblemByRoomId,
} from "../../services/problemServices";
import { showMessage } from "react-native-flash-message";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

const Problem = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [modalCreateProblem, setModalCreateProblem] = useState(false);
  const userData = useSelector((state) => state.user.userInfo);
  const userRoomList = useSelector((state) => state.user.userRoom);
  const problems = useSelector((state) => state.problems.problems);
  const problemsStatus0 = useSelector(
    (state) => state.problems.problemsStatus0
  );
  const problemsStatus1 = useSelector(
    (state) => state.problems.problemsStatus1
  );
  const problemsStatus2 = useSelector(
    (state) => state.problems.problemsStatus2
  );
  const problemsStatus3 = useSelector(
    (state) => state.problems.problemsStatus3
  );

  useFocusEffect(
    useCallback(() => {
      const fetchInitialData = async () => {
        if (userData) {
          const response = await getAllRoomByUserId(userData.id, dispatch);
          if (response.data) {
            await getProblemByRoomId(response.id, dispatch);
          }
        }
      };

      fetchInitialData();
    }, [userData, dispatch])
  );

  const renderRightActions = () => {
    return (
      <View style={styles.rightActionContainer}>
        <Text style={styles.actionText}>Hủy</Text>
      </View>
    );
  };

  // Màu sắc cho từng trạng thái
  const statusColors = {
    Pending: "orange",
    InProgress: "blue",
    Completed: "green",
    Canceled: "red",
  };

  return (
    <View
      style={[
        generalStyles.container,
        { backgroundColor: colors.white, position: "relative" },
      ]}
    >
      <Header
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={"Sự cố"}
      />
      <View style={{ height: 50, width: "100%", flexDirection: "row" }}>
        {["Pending", "InProgress", "Completed", "Canceled"].map(
          (status, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: "25%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor:
                  selectedStatus === status
                    ? statusColors[status]
                    : colors.lightGray,
              }}
              onPress={() => setSelectedStatus(status)}
            >
              <Text
                style={{
                  color:
                    selectedStatus === status
                      ? statusColors[status]
                      : colors.dark_gray,
                  fontFamily: fontFamily.regular,
                }}
              >
                {status === "Pending" && "Đang yêu cầu"}
                {status === "InProgress" && "Đang xử lý"}
                {status === "Completed" && "Hoàn thành"}
                {status === "Canceled" && "Đã hủy"}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { gap: 15 }]}>
        {["Pending", "InProgress", "Completed", "Canceled"].map(
          (status, index) => {
            const problems =
              status === "Pending"
                ? problemsStatus0
                : status === "InProgress"
                ? problemsStatus1
                : status === "Completed"
                ? problemsStatus2
                : problemsStatus3;

            return (
              selectedStatus === status &&
              (problems?.length > 0 ? (
                problems?.map((problem) => (
                  <ProblemComponent
                    key={problem?.id} // Dùng id của problem để làm key duy nhất
                    roomName={problem?.room_name}
                    status={problem?.status}
                    issue={problem?.problem}
                    description={problem?.decription}
                    userName={userData?.lastName}
                    date="08/11/2024"
                    colors={colors}
                    generalStyles={generalStyles}
                  />
                ))
              ) : (
                <View
                  style={{
                    height: 300,
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                  key={`${status}-empty`} // Dùng chuỗi tĩnh để làm key khi danh sách trống
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: colors.gray59,
                      marginTop: 20,
                    }}
                  >
                    Trống
                  </Text>
                </View>
              ))
            );
          }
        )}

        <View style={{ height: 150 }}></View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setModalCreateProblem(true)}
        style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          position: "absolute",
          bottom: "10%",
          right: "6%",
          backgroundColor: statusColors[selectedStatus] || colors.primary_green, // Màu nền thay đổi theo trạng thái
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 3.5,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "500", color: colors.white }}>
          +
        </Text>
      </TouchableOpacity>

      {/* Render CreateProblemModal */}
      <CreateProblemModal
        userData={userData}
        userRoomList={userRoomList}
        modalVisible={modalCreateProblem}
        onClose={() => setModalCreateProblem(false)}
      />
    </View>
  );
};

export default Problem;

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    padding: 10,
    paddingVertical: 20,
  },
});
