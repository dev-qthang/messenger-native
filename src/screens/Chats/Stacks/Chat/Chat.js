import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./Chat.styles";
import { colors } from "../../../../theme/colors";
import { images } from "../../../../images";

import { LeftMessage, RightMessage } from "../Message/Message";
import Story from "../../../../components/Story/Story";

import { uploadFile } from "../../../../redux/uploadSlice";
import { fetchCurrentMessages, fetchSendMessage } from "../../../../redux/messageSlice";

const Chat = ({ navigation }) => {
  const [messageList, setMessageList] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const video = useRef(null);

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const current_conversation = useSelector((state) => state.conversation.current_conversation);
  const currentMessages = useSelector((state) => state.message.currentMessages.messages);

  const { socket } = useSelector((state) => state.socket);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const sendMessage = () => {
    if (text !== "") {
      const messageData = {
        author: auth.firstName,
        message: text,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("send_message", messageData);
      setMessageList([...messageList, messageData]);
      setText("");
    }

    // if (text !== "") {
    //   console.log(text);
    //   dispatch(fetchSendMessage(current_conversation._id, auth.id, 0, text, auth.token));
    //   dispatch(fetchCurrentMessages(current_conversation._id, auth.token));

    //   socket.emit("send_message", currentMessages[0]);
    //   setMessageList([...messageList, currentMessages[0]]);
    //   setText("");
    // }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [socket, messageList]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  };

  const onSendImage = () => {
    dispatch(uploadFile(image, "image", token));
    setImage(null);
  };

  const onSendVideo = () => {
    dispatch(uploadFile(videoUri, "video", token));
    setVideoUri(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Story /> */}

        {/* Back to Chats list button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Chats");
          }}
        >
          <Feather name="chevron-left" style={styles.backIcon} />
        </TouchableOpacity>

        {/* Header of Conversation */}
        <View style={styles.headerInfo}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ flexDirection: "row" }}
            onPress={() => {
              navigation.navigate("ConversationSettings", {
                avatar: current_conversation.avatar,
                userInfo: {
                  username: current_conversation.title,
                  status: "Active"
                },
              });
            }}
          >
            <Image
              source={current_conversation.avatar}
              style={styles.header_avatarIcon}
            />
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {current_conversation.title}
              </Text>
              <Text style={{ fontSize: 12 }}>Status</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Some action buttons (call, call video) */}
        <View style={styles.header_actions}>
          <TouchableOpacity
            onPress={() => {
              console.log("Call pressed");
            }}
          >
            <FontAwesome name="phone" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("Video pressed");
            }}
          >
            <FontAwesome name="video-camera" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      { /* style={[styles.message, username === messageContent.author ? "you" : "other"]} */}
      {/* Body a.k.a List of messages */}
      <View style={styles.body}>
        <ScrollView>
          {messageList.map((messageContent, index) => {
            return (
              <View key={index}>
                <View>
                  <View style={styles.messageContent}>
                    <Text>{messageContent.message}</Text>
                  </View>
                  <View style={styles.messageMeta}>
                    <Text style={styles.time}>{messageContent.time}</Text>
                    <Text style={styles.author}>{messageContent.author}</Text>
                  </View>
                </View>
              </View>
            );
          })}

          {/* {currentMessages.messages.foreach((msg, index) => {
            console.log(msg);

            return (
              <View key={index}>
                <View>
                  <View style={styles.msg}>
                    <Text>{msg.content}</Text>
                  </View>
                  <View style={styles.messageMeta}>
                    <Text style={styles.time}>{msg.createdAt}</Text>
                    <Text style={styles.author}>{msg.author}</Text>
                  </View>
                </View>
              </View>
            );
          })} */}
        </ScrollView>
      </View>

      <View style={styles.footer}>

        {/* Grid a.k.a four points */}
        <TouchableOpacity>
          <Entypo
            name="grid"
            style={{ fontSize: 36, color: colors.mainColor }}
          />
        </TouchableOpacity>

        {/* Camera button */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Camera", {
              image,
              setImage,
              setVideoUri,
            })
          }
        >
          <FontAwesome name="camera" style={styles.icon} />
        </TouchableOpacity>

        {/* Picture/Photo button */}
        <TouchableOpacity onPress={pickImage}>
          <FontAwesome name="photo" style={styles.icon} />
        </TouchableOpacity>

        {/* Microphone button */}
        <TouchableOpacity>
          <FontAwesome name="microphone" style={styles.icon} />
        </TouchableOpacity>

        {/* Message Text input */}
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

        {/* a.k.a Like button */}
        <TouchableOpacity>
          <AntDesign name="like1" style={styles.icon} />
        </TouchableOpacity>

        {/* a.k.a Send button */}
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" style={styles.icon} />
        </TouchableOpacity>

        {/* ... */}
        {image && (
          <View style={styles.preview}>
            <TouchableOpacity
              style={styles.previewClose}
              onPress={() => setImage(null)}
            >
              <AntDesign
                name="close"
                style={{ color: colors.white, fontSize: 20 }}
              />
            </TouchableOpacity>
            <Image
              source={{ uri: image } || images.avatar}
              style={styles.previewImg}
            />
            <TouchableOpacity style={styles.previewSend} onPress={onSendImage}>
              <Text style={{ color: colors.white }}>Send</Text>
              <Ionicons
                name="send"
                style={{ color: colors.white, marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* ... */}
        {videoUri && (
          <View style={styles.preview}>
            <TouchableOpacity
              style={styles.previewClose}
              onPress={() => setVideoUri(null)}
            >
              <AntDesign
                name="close"
                style={{ color: colors.white, fontSize: 20 }}
              />
            </TouchableOpacity>
            <Video
              ref={video}
              style={styles.previewVideo}
              source={{
                uri: videoUri,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
            />
            <TouchableOpacity style={styles.previewSend} onPress={onSendVideo}>
              <Text style={{ color: colors.white }}>Send</Text>
              <Ionicons
                name="send"
                style={{ color: colors.white, marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>
        )}

      </View>
    </View>
  );
};

export default Chat;
