import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./Message.styles";
import { images } from "../../../images";

export const LeftMessage = ({ imgSource, arrMessages }) => {

  return (
    <View style={styles.left_container}>
      <View style={styles.avatar}>
        <Image source={imgSource} style={styles.avatarImg}/>
      </View>
      
      <View style={styles.text}>
        <Text style={styles.textValue}>We re-created Facebook Messenger UI design to help designers and developers visualize</Text>
        <Text style={styles.textValue}>We re-created Facebook Messenger UI design to help designers and developers visualize</Text>
      </View>
    </View>
  )
};

export const RightMessage = ({ imgSource, arrMessages }) => {

  return (
    <View style={styles.right_container}>
      <View style={styles.text}>
        <Text style={styles.textValue}>We re-created Facebook Messenger UI design to help designers and developers visualize</Text>
        <Text style={styles.textValue}>We re-created Facebook Messenger UI design to help designers and developers visualize</Text>
      </View>
      
      <View style={styles.avatar}>
        <Image source={imgSource} style={styles.checkedIcon}/>
      </View>
    </View>
  )
}