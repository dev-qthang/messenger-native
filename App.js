import React from "react";
import { Image } from "react-native";

import Chats from "./src/screens/Chats/Chats";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import People from "./src/screens/People/People";
import Discover from "./src/screens/Discover/Discover";
import { images } from "./src/images";
import Profile from "./src/screens/Profile/Profile";
import EditProfile from "./src/screens/Profile/EditProfile/EditProfile";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Chats") {
                iconName = focused ? images.chat_active : images.chat_inactive;
              } else if (route.name === "People") {
                iconName = focused
                  ? images.people_active
                  : images.people_inactive;
              } else if (route.name === "Discover") {
                iconName = focused
                  ? images.discover_active
                  : images.discover_inactive;
              } else if (route.name === "EditProfile") {
                iconName = focused ? images.add_contact : images.add_contact;
              }

              // You can return any component that you like here!
              return <Image source={iconName} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
            showLabel: false,
          }}
        >
          <Tab.Screen name="Chats" component={Chats} />
          <Tab.Screen name="People" component={People} />
          <Tab.Screen name="Discover" component={Profile} />
          <Tab.Screen name="EditProfile" component={EditProfile} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
