import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import SearchBox from "../../components/SearchBox/SearchBox";
import Story from "../../components/Story/Story";
import StorySlider from "../../components/StorySlider/StorySlider";
import { images } from "../../images";
import { getStories } from "../../redux/storySlice";
import { getUserInfo } from "../../redux/userSlice";
import { styles } from "./Chat.styles";
import UserListing from "./UserListing/UserListing";

const Chats = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      dispatch(getUserInfo(auth.token));
      dispatch(getStories(auth.token));
    }
  }, [auth]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        heading="Chats"
        icon1={images.take_photo}
        icon2={images.new_message}
        navigation={navigation}
      />
      <SearchBox navigation={navigation} auth={auth} />
      <StorySlider navigation={navigation} />
      <UserListing navigation={navigation} />
    </SafeAreaView>
  );
};

export default Chats;
