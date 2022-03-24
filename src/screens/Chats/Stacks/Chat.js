import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import { styles } from './Chat.styles';
import { colors } from '../../../theme/colors';
import { images } from '../../../images';

import { LeftMessage, RightMessage } from './Message';

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
        <Feather name="chevron-left" style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.headerInfo}>
        <Image source={images.avatar} style={styles.header_avatarIcon} />
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Username</Text>
          <Text style={{ fontSize: 12 }}>Status</Text>
        </View>
      </View>

      <View style={styles.header_actions}>
        <TouchableOpacity onPress={() => { console.log('Call pressed') }}>
          <FontAwesome name="phone" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { console.log('Video pressed') }}>
          <FontAwesome name="video-camera" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Body = () => {
  const leftData = {
    imgSource: images.default_avatar,
    arrMessage: [
      { id: 0, value: "Hello from my laptop Hello from my laptop Hello from my laptop" },
      { id: 1, value: "Hello from my laptop Hello from my laptop Hello from my laptop" },
      { id: 2, value: "Hello from my laptop Hello from my laptop Hello from my laptop" },
    ]
  };

  const rightData = {
    imgSource: images.default_avatar,
    arrMessage: [
      { id: 0, value: "Hello from my laptop Hello from my laptop Hello from my laptop" },
      { id: 1, value: "Hello from my laptop Hello from my laptop Hello from my laptop" },
      { id: 2, value: "Hello from my laptop Hello from my laptop Hello from my laptop" },
    ]
  }

  return (
    <View style={styles.body}>
      <ScrollView>
        <LeftMessage imgSource={leftData.imgSource} arrMessages={leftData.arrMessage} />
        <RightMessage imgSource={rightData.imgSource} arrMessages={rightData.arrMessage} />
        <LeftMessage imgSource={leftData.imgSource} arrMessages={leftData.arrMessage} />
        <RightMessage imgSource={rightData.imgSource} arrMessages={rightData.arrMessage} />
        <LeftMessage imgSource={leftData.imgSource} arrMessages={leftData.arrMessage} />
        <RightMessage imgSource={rightData.imgSource} arrMessages={rightData.arrMessage} />
      </ScrollView>
    </View>
  )
}

const Footer = ({ navigation }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity>
        <Entypo name="grid" style={{ fontSize: 36, color: colors.mainColor }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <FontAwesome name="camera" style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage}>
        <FontAwesome name="photo" style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity>
        <FontAwesome name="microphone" style={styles.icon} />
      </TouchableOpacity>

      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          onChangeText={setText}
          value={text}
          placeholder="Aa"
          placeholderTextColor={"#ddd"}
        />
        <TouchableOpacity style={styles.inputEmoji}>
          <Icon name="smile" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <AntDesign name="like1" style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const Chat = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Body />
      <Footer navigation={navigation} />
    </View>
  )
};

export default Chat;