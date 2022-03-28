import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../images";
import { editTheme } from "../../redux/themeSlice";
import { styles } from "./Header.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = ({ heading, icon1, icon2 }) => {
  const dispatch = useDispatch();
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
          <Image style={styles.avatar} source={images.avatar} />
        </TouchableOpacity>
        <Text style={styles.title}>{heading}</Text>
      </View>
      <View style={styles.row}>
        <Image style={styles.icon} source={icon1} />
        <Image style={styles.icon} source={icon2} />
      </View>
    </View>
  );
};

export default Header;
