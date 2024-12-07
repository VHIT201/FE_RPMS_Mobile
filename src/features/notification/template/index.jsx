import React, { useCallback } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import generalStyles from "../../../styles/generalStyles";
import colors from "../../../values/colors";
import Header from "../../../components/Header";
import NotificationItem from "../components/NotificationItem";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllNotification, updateIsRead } from "../../../services/notificationService";

const NotificationMainView = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userInfo);
  const notificationList = useSelector((state) => state.notification.notifications);
  useFocusEffect(
    useCallback(() => {
      const fetchInitialData = async () => {
        if (userData) {
          await getAllNotification(userData.id, dispatch);
        }
      };

      fetchInitialData();
    }, [userData, dispatch])
  );

  const handleIsRead = async (id) => {
    await updateIsRead(id, dispatch)
  }

  return (
    <View style={[generalStyles.container, { backgroundColor: colors.white }]}>
      <Header titleHeader={"Thông báo"} />
      {
        (!notificationList || notificationList.length === 0) ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có thông báo</Text>
          </View>
        ) : (
          <FlatList
            style={{ marginTop: 5 }}
            data={notificationList}
            renderItem={({ item }) => (
              <NotificationItem
                notification={item}
                onPress={()=>handleIsRead(item.id)}
              />
            )}
            inverted
            keyExtractor={(item) => item.id}
          />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray59, // Adjust the color as needed
    textAlign: 'center',
  },
});

export default NotificationMainView;
