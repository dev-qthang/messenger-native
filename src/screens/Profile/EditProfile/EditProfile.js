import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Linking,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { images } from "../../../images";
import { styles } from "./EditProfile.styles";
import { colors } from "../../../theme/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editAttributeUser, upload } from "../../../redux/userSlice";
import Modal from "react-native-modal";
import UserPermissions from "../../../utils/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const auth = useSelector((state) => state.auth);
  const [info, setInfo] = useState(userInfo);
  const [modalVisible, setModalVisible] = useState({
    information: false,
  });

  const handleData = (field, text) => {
    setInfo({ ...info, [field]: text });
  };

  const handleSave = (fieldModal) => {
    setModalVisible(!modalVisible[fieldModal]);
    dispatch(editAttributeUser(info));
  };

  const setModal = (fieldModal) => {
    setModalVisible({
      ...modalVisible,
      [fieldModal]: !modalVisible[fieldModal],
    });
  };

  const handlePickerAvatar = async (type) => {
    UserPermissions.getCameraPermission();

    const resultPermision = await Camera.requestCameraPermissionsAsync();
    const resultPermisionCamera = resultPermision.status;

    if (resultPermisionCamera === "denied") {
      toastRef.current.show("Gallery permissions are needed");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });

      console.log(result);

      if (!result.cancelled) {
        if (type === "avatar") {
          setInfo({ ...info, avatar: result.uri });
          // dispatch(editAttributeUser({ type: "avatar", data: result.uri }));
        } else if (type === "wallpaper") {
          setInfo({ ...info, wallpaper: result.uri });
          // dispatch(editAttributeUser({ type: "wallpaper", data: result.uri }));
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerEdit}>
          <Ionicons
            name="arrow-back"
            style={styles.headerIcon}
            onPress={() => navigation.navigate("Profile")}
          />
          <Text style={styles.headerText}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => dispatch(upload(info.avatar, "image", auth.token))}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.editContainer}>
          <View style={styles.typeEditContainer}>
            <Text style={styles.typeEditText}>Profile Picture</Text>

            <Text
              style={styles.editText}
              onPress={() => handlePickerAvatar("avatar")}
            >
              Edit
            </Text>
          </View>
          <Image
            source={{ uri: info.avatar } || images.avatar}
            style={styles.profileAvatar}
          />
        </View>

        <View style={styles.editContainer}>
          <View style={styles.typeEditContainer}>
            <Text style={styles.typeEditText}>Cover Photo</Text>
            <Text
              style={styles.editText}
              onPress={() => handlePickerAvatar("wallpaper")}
            >
              Edit
            </Text>
          </View>
          <Image
            source={{ uri: info.wallpaper } || images.wallpaper}
            style={styles.profileWallpaper}
          />
        </View>

        <View style={styles.editContainer}>
          <View style={styles.typeEditContainer}>
            <Text style={styles.typeEditText}>Information</Text>

            <Text
              style={styles.editText}
              onPress={() => setModal("information")}
            >
              Edit
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>First Name:</Text>
              <Text style={styles.textInfo}>{info.firstName}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>Last Name:</Text>
              <Text style={styles.textInfo}>{info.lastName}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>Gender:</Text>
              <Text style={styles.textInfo}>{info.gender}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>Date Of Birth:</Text>
              <Text style={styles.textInfo}>{info.dateOfBirth}</Text>
            </View>
          </View>

          <Modal isVisible={modalVisible.information}>
            <View style={{ ...styles.modalView, maxHeight: 250 }}>
              <Text style={styles.modalTypeText}>Edit Information</Text>

              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Text style={styles.typeInfo}>First Name:</Text>
                  <TextInput
                    onChangeText={(text) => handleData("firstName", text)}
                    style={{ ...styles.modalInput, height: 40, width: 180 }}
                    placeholder="Input your first name..."
                    value={info.firstName}
                  />
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.typeInfo}>Last Name:</Text>
                  <TextInput
                    onChangeText={(text) => handleData("lastName", text)}
                    style={{ ...styles.modalInput, height: 40, width: 180 }}
                    placeholder="Input your last name..."
                    value={info.lastName}
                  />
                </View>
                <Text style={styles.nodeText}>
                  Your gender and date of birth cannot be changed for security
                  reasons
                </Text>
              </View>

              <View style={styles.containerButton}>
                <TouchableOpacity
                  onPress={() => handleSave("information")}
                  style={{
                    ...styles.button,
                    backgroundColor: colors.mainColor,
                  }}
                >
                  <Text style={{ color: colors.white, fontWeight: "500" }}>
                    Save
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: colors.grayMain,
                  }}
                  onPress={() => setModal("intro")}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
