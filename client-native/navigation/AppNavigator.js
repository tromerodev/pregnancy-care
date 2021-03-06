import React from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignIn from "../screens/SignInScreen";
import Home from "../screens/HomeScreen";

import Profile from "../screens/ProfileScreen";
import CalendarScreen from "../screens/CalendarScreen";
import { Image } from "react-native-elements";
import Progress from "../screens/ProgressScreen";
import Information from "../screens/InformationScreen";

import { LogoutBtn } from "../components/LogoutBtn";

const headerStyle = {
  backgroundColor: "#01395c",
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const navigationOption = {
  headerTitle: (
    <Image
      source={require("../assets/images/logo.png")}
      style={{
        width: Dimensions.get("screen").width * 0.5,
        resizeMode: "contain"
      }}
    />
  ),
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "300",
    fontSize: 30,
    color: "hsl(0, 0%, 96%)",
    paddingBottom: 5
  },
  headerRight: <LogoutBtn />,
  headerStyle: headerStyle
};

export const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => navigationOption
  },
  Progress: {
    screen: Progress,
    navigationOptions: () => ({
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 15,
        color: "black"
      },
      headerStyle: headerStyle
    })
  },
  Information: {
    screen: Information,
    navigationOptions: () => ({
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 15,
        color: "black"
      },
      headerStyle: headerStyle
    })
  }
});

export const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: () => navigationOption
  }
});

export const CalendarNavigator = createStackNavigator({
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: () => navigationOption
  }
});

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  }
});

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    Calendar: {
      screen: CalendarNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="calendar" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#7c96c8",
      inactiveTintColor: "white",
      showLabel:false,
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
        backgroundColor: "#01395c"
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
