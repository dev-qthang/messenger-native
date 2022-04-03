import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../images";
import { editTheme } from "../../redux/themeSlice";
import { styles } from "./Header.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { logout } from "../../redux/authSlice";

const Header = ({ heading, icon1, icon2 }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  // const theme = useSelector((state) => state.theme);
  // const [themeMode, setThemeMode] = useState(false);
  // useEffect(() => {
  //   const storeData = async () => {
  //     try {
  //       await AsyncStorage.setItem("theme", themeMode);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   storeData();
  // }, [themeMode]);

  // const handleTheme = () => {
  //   setThemeMode(!themeMode);
  //   dispatch(editTheme(!theme.isDark));
  // };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity>
          <Image style={styles.avatar} source={user.avatar} />
        </TouchableOpacity>
        <Text style={styles.title}>{heading}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <MaterialIcons name="logout" style={{ fontSize: 26 }} />
        </TouchableOpacity>
        <Image style={styles.icon} source={icon1} />
        <Image style={styles.icon} source={icon2} />
      </View>
    </View>
  );
};

export default Header;
