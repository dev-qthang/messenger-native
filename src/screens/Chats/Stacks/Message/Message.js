import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./Message.styles";
import { images } from "../../../../images";

export const LeftMessage = ({ message, time, userName, avatar }) => {
  return (
    <View style={styles.left_container}>
      <View style={styles.avatar}>
        <Image source={{ uri: avatar }} style={styles.avatarImg} />
      </View>

      <View style={styles.text}>
        <Text key={userName} style={styles.textValue}>
          {message}
        </Text>
        <Text>{userName}</Text>
        <Text>{time}</Text>
      </View>
    </View>
  );
};

export const RightMessage = ({ message, time, userName, avatar }) => {
  return (
    <View style={styles.right_container}>
      <View style={styles.text}>
        <Text key={userName} style={styles.textValue}>
          {message}
        </Text>
        <Text>{userName}</Text>
        <Text>{time}</Text>
      </View>

      <View style={styles.avatar}>
        <Image source={{ uri: avatar }} style={styles.checkedIcon} />
      </View>
    </View>
  );
};
