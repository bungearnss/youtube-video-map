import { StatusBar } from "expo-status-bar";
import React from "react";
import { LiveScreen, MapScreen, VideoScreen } from "./src/screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, LogBox } from "react-native";

LogBox.ignoreAllLogs()

const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Video"
      activeColor="#000099"
      inactiveColor="#3e2465"
      barStyle={styles.barStyle}
    >
      <Tab.Screen
        name="Video"
        component={VideoScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign
                style={[{ color: "#000099" }]}
                size={23}
                name="youtube"
              />
            ) : (
              <AntDesign style={[{ color: "gray" }]} size={23} name="youtube" />
            ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={LiveScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo
                style={[{ color: "#000099" }]}
                size={23}
                name="video-camera"
              />
            ) : (
              <Entypo
                style={[{ color: "gray" }]}
                size={23}
                name="video-camera"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5
                style={[{ color: "#000099" }]}
                size={23}
                name="map-marked-alt"
              />
            ) : (
              <FontAwesome5
                style={[{ color: "gray" }]}
                size={23}
                name="map-marked-alt"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeApp" style={styles.container}>
        <Stack.Screen
          name="HomeApp"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  barStyle: {
    backgroundColor: "#FFF",
    height: "9.5%",
    justifyContent: "center",
    width: "100%",
  },
  activeLabel: {
    fontSize: 18,
    color: "#000099",
  },
  unactiveLabel: {
    fontSize: 18,
    color: "gray",
  },
});
