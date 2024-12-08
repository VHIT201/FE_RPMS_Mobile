import React, { useCallback, useEffect } from "react";
import { Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { BottomBarIcons } from "./src/assets/icons";
import * as SplashScreen from "expo-splash-screen";
import Intro from "./src/features/authentication/intro/template/Intro";
import Login from "./src/features/authentication/login/template/Login";
import SignUp from "./src/features/authentication/signup/template/SignUp";
import AddBuidling from "./src/features/building/addBuilding/AddBuidling";
import colors from "./src/values/colors";
import Home from "./src/features/home/template/Home";
import Building from "./src/features/building/template/Building";
import Message from "./src/features/message/template/Message";
import CashFlow from "./src/features/cashflow/template/CashFlow";
import Management from "./src/features/management/template/Management";
import AddRoom from "./src/features/building/addRoom/AddRoom";
import DetailRoom from "./src/features/building/detailRoom/DetailRoom";
import Services from "./src/features/services/Services";
import Problem from "./src/features/problem/Problem";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeGuest from "./src/features/guest/home/template/HomeGuest";
import GuestBuilding from "./src/features/guest/HomeBuilding/GuestBuilding";
import GuestDetailRoom from "./src/features/guest/room/guestDetailRoom";
import Contract from "./src/features/contract/template/Contract";

import useCustomFonts from "./src/assets/fonts/useFont";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message"; // Import FlashMessage
import DetailBuilding from "./src/features/building/detailBuilding/template/DetailBuilding";
import GuestDetailBuilding from "./src/features/guest/HomeBuilding/GuestDetailBuilding";
import CreateBooking from "./src/features/guest/room/createBooking";
import Invoice from "./src/features/avoice/template";
import WebViewScreen from "./src/features/avoice/components/WebViewScreen";
import NotificationMainView from "./src/features/notification/template";
import ForgotPasswordScreen from "./src/features/authentication/forgotPassword/template";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync(); // Ngăn SplashScreen biến mất cho đến khi font được tải

const BottomTabs = () => {
  const fontsLoaded = useCustomFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); // Ẩn SplashScreen khi font đã được tải
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Giữ màn hình splash cho đến khi font tải xong
  }

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case "HomeScreen":
              return focused ? (
                <Image
                  source={BottomBarIcons.HomeActive}
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <Image
                  source={BottomBarIcons.HomeActive}
                  style={{ width: 30, height: 30 }}
                />
              );
            case "Building":
              return focused ? (
                <Image
                  source={BottomBarIcons.BuildingActive}
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <Image
                  source={BottomBarIcons.BuildingNonActive}
                  style={{ width: 30, height: 30 }}
                />
              );
            case "Notification":
              return focused ? (
                <Image
                  source={BottomBarIcons.NotificationAct}
                  style={{ width: 20, height: 20 }}
                />
              ) : (
                <Image
                  source={BottomBarIcons.NotificationNoAct}
                  style={{ width: 20, height: 20 }}
                />
              );
            case "CashFlow":
              return focused ? (
                <Image
                  source={BottomBarIcons.WalletActive}
                  style={{ width: 20, height: 20 }}
                />
              ) : (
                <Image
                  source={BottomBarIcons.WalletNoActive}
                  style={{ width: 20, height: 20 }}
                />
              );
            case "Management":
              return focused ? (
                <Image
                  source={BottomBarIcons.ManagementNoAct}
                  style={{ width: 20, height: 20 }}
                />
              ) : (
                <Image
                  source={BottomBarIcons.ManagementAct}
                  style={{ width: 20, height: 20 }}
                />
              );
          }
        },
        tabBarActiveTintColor: colors.primary_green,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: { height: 60, paddingBottom: 5 }, // Tăng chiều cao của BottomTab
        tabBarLabelStyle: { fontSize: 13 },
        headerShown: false,
      })}
    >
      {/* <Tab.Screen
        name="Building"
        component={Home}
        options={{ tabBarLabel: "Tòa nhà" }}
      /> */}
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{ tabBarLabel: "Trang chủ" }}
      />

      <Tab.Screen
        name="Notification"
        component={NotificationMainView}
        options={{ tabBarLabel: "Thông báo" }}
      />
      {/* <Tab.Screen
        name="CashFlow"
        component={CashFlow}
        options={{ tabBarLabel: "Thu chi" }}
      /> */}
      <Tab.Screen
        name="Management"
        component={Management}
        options={{ tabBarLabel: "Người dùng" }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const fontsLoaded = useCustomFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1, width: "100%" }}>
        <NavigationContainer>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.primary_green}
          />
          <Stack.Navigator
            initialRouteName="Intro"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="AddBuilding" component={AddBuidling} />
            <Stack.Screen name="AddRoom" component={AddRoom} />
            <Stack.Screen name="Home" component={BottomTabs} />
            <Stack.Screen name="DetailBuilding" component={DetailBuilding} />
            <Stack.Screen name="DetailRoom" component={DetailRoom} />
            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="Problem" component={Problem} />
            <Stack.Screen name="Building" component={Building} />
            <Stack.Screen name="HomeGuest" component={HomeGuest} />
            <Stack.Screen name="GuestBuilding" component={GuestBuilding} />
            <Stack.Screen
              name="GuestDetailBuilding"
              component={GuestDetailBuilding}
            />
            <Stack.Screen name="GuestDetailRoom" component={GuestDetailRoom} />
            <Stack.Screen name="CreateBooking" component={CreateBooking} />
            <Stack.Screen name="Invoice" component={Invoice} />
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
            <Stack.Screen name="Contract" component={Contract} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            
          </Stack.Navigator>
          <FlashMessage position="top" />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
