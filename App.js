import React from "react";
import { Image } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import store from "./src/redux/store";
import { images } from "./src/images";
import Chats from "./src/screens/Chats/Chats";
import Chat from "./src/screens/Chats/Stacks/Chat/Chat";
import People from "./src/screens/People/People";
import Discover from "./src/screens/Discover/Discover";
import Profile from "./src/screens/Profile/Profile";
import EditProfile from "./src/screens/Profile/EditProfile/EditProfile";
import Camera from "./src/screens/Camera/Camera";
import ConversationSettings from "./src/screens/Chats/Stacks/Convesation/ConversationSettings";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let icon = false;

          if (route.name === "Chats") {
            iconName = focused ? images.chat_active : images.chat_inactive;
          } else if (route.name === "People") {
            iconName = focused ? images.people_active : images.people_inactive;
          } else if (route.name === "Discover") {
            iconName = focused
              ? images.discover_active
              : images.discover_inactive;
          } else if (route.name === "Profile") {
            icon = true;
            iconName = focused ? "user-circle" : "user-circle-o";
          }

          // You can return any component that you like here!
          return icon ? (
            <FontAwesome name={iconName} style={{ fontSize: 24 }} />
          ) : (
            <Image source={iconName} />
          );
        },
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="People" component={People} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ConversationSettings"
            component={ConversationSettings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Camera"
            component={Camera}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
