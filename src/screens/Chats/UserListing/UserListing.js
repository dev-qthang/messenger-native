import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";

import { styles } from "./UserListing.styles";
import { images } from "../../../images";

const UserListing = ({ navigation }) => {
  let Data = [
    {
      id: 1,
      name: "Martin Randolph",
      image: images.user_1,
      lastMessage: "You: What's man! · 9:40 AM ",
    },
  ];

  // let Data = useSelector((state) => state.conversation.conversations);

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <View style={styles.itemRowWrapper}>
        <Image style={styles.itemRowIcon} source={images.camera} />
        <Image style={styles.itemRowIcon} source={images.call} />
        <Image style={styles.itemRowIcon} source={images.video_call} />
      </View>
      <View style={styles.itemRowWrapper}>
        <Image
          style={styles.itemRowIcon}
          source={images.converation_settings}
        />
        <Image style={styles.itemRowIcon} source={images.notifications} />
        <Image style={styles.itemRowIcon} source={images.delete_conversation} />
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate("Chat")}
      >
        <View style={styles.userItemContainer}>
          <Image source={item.image} style={styles.userIcon} />
          <View style={styles.userDetailsSectionContainer}>
            <View>
              <Text style={styles.label1}>{item.name}</Text>
              <Text style={styles.label2}>{item.lastMessage}</Text>
            </View>
            <Image source={images.checked} style={styles.checked} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SwipeListView
      data={Data}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={180}
      rightOpenValue={-180}
    />
  );
};

export default UserListing;
