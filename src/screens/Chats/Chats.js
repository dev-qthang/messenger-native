import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, SafeAreaView } from "react-native";
import Header from "../../components/Header/Header";
import SearchBox from "../../components/SearchBox/SearchBox";
import StorySlider from "../../components/StorySlider/StorySlider";
import { images } from "../../images";
import { styles } from "./Chat.styles";
import UserListing from "./UserListing/UserListing";

import { fetchConversations } from "../../redux/conversationSlice";

const DATA = [
  { id: 0, image: images.your_story, user: "Your story" },
  { id: 1, image: images.user_1, user: "Martin" },
  { id: 2, image: images.user_2, user: "Martin" },
  { id: 3, image: images.user_3, user: "Karen" },
  { id: 4, image: images.user_4, user: "Martha" },
  { id: 5, image: images.user_5, user: "Joshua" },
];

const Chats = ({ navigation }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchConversations(userInfo._id, auth.token));
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        heading="Chats"
        icon1={images.take_photo}
        icon2={images.new_message}
      />
      <SearchBox />
      <StorySlider data={DATA} />
      <UserListing navigation={navigation} />
    </SafeAreaView>
  );
};

export default Chats;
