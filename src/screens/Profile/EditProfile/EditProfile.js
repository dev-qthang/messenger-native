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
import { images } from "../../../images";
import { styles } from "./EditProfile.styles";
import { colors } from "../../../theme/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editAttributeUser, upload } from "../../../redux/userSlice";
import Modal from "react-native-modal";
import UserPermissions from "../../../utils/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

const data = {
  name: "Nguyen Quyet Thang",
  bio: "Dang lam profile",
  branch: "Information of Technology (IT)",
  school: "Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội",
  highSchool: "THPT Lạc Thuỷ A",
  lives: "Ha Noi, Vietnam",
  address: "Chi Nê, Hoà Bình, Vietnam",
  instagram: "q.thangg_13",
  github: "dev-qthang",
  gender: "Male",
  dateOfBirth: "13/10/2001",
};

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    avatar: "https://i.redd.it/i3peg3rqksa51.png",
    wallpaper:
      "https://i.pinimg.com/736x/f4/f9/1c/f4f91c394261080ff096d7c7843eb4c7.jpg",
    name: "",
    bio: "",
    schools: [],
    workPlaces: [],
    lives: "",
    linked: {
      instagram: "",
      github: "",
      facebook: "",
      linkedIn: "",
    },
    address: "",
    gender: "",
    dateOfBirth: "",
  });
  const [modalVisible, setModalVisible] = useState({
    bio: false,
    information: false,
    intro: false,
  });

  const userInfo = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  const handleData = (field, text) => {
    setInfo({ ...info, [field]: text });
  };

  const handleSave = (fieldModal, field) => {
    setModalVisible(!modalVisible[fieldModal]);
    dispatch(editAttributeUser({ type: field, data: info[field] }));
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
          dispatch(editAttributeUser({ type: "avatar", data: result.uri }));
        } else if (type === "wallpaper") {
          setInfo({ ...info, wallpaper: result.uri });
          dispatch(editAttributeUser({ type: "wallpaper", data: result.uri }));
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
            <Text style={styles.typeEditText}>Bio</Text>
            <Text style={styles.editText} onPress={() => setModal("bio")}>
              Edit
            </Text>
          </View>
          <Text style={styles.textBio}>{userInfo.bio}</Text>
          <Modal isVisible={modalVisible.bio}>
            <View style={styles.modalView}>
              <Text style={styles.modalTypeText}>Edit Bio</Text>

              <TextInput
                onChangeText={(text) => handleData("bio", text)}
                style={styles.modalInput}
                placeholder="Bio..."
                multiline
                value={info.bio}
              />
              <Text style={styles.noteText}>
                Try adding a short bio to tell people more about yourself. Your
                bio is public and limited to 101 characters.
              </Text>

              <View style={styles.containerButton}>
                <TouchableOpacity
                  onPress={() => handleSave("bio", "bio")}
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
                  onPress={() => setModalVisible(!modalVisible.bio)}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ ...styles.noteText, textAlign: "center" }}>
                Your bio is Public.
              </Text>
            </View>
          </Modal>
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
              <Text style={styles.typeInfo}>Full Name:</Text>
              <Text style={styles.textInfo}>{userInfo.name}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>Gender:</Text>
              <Text style={styles.textInfo}>{userInfo.gender}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>Date Of Birth:</Text>
              <Text style={styles.textInfo}>{userInfo.dateOfBirth}</Text>
            </View>
          </View>

          <Modal isVisible={modalVisible.information}>
            <View style={{ ...styles.modalView, maxHeight: 250 }}>
              <Text style={styles.modalTypeText}>Edit Information</Text>

              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Text style={styles.typeInfo}>Full Name:</Text>
                  <TextInput
                    onChangeText={(text) => handleData("name", text)}
                    style={{ ...styles.modalInput, height: 40, width: 180 }}
                    placeholder="Fullname..."
                    value={info.name}
                  />
                </View>
                <Text style={styles.nodeText}>
                  Your gender and date of birth cannot be changed for security
                  reasons
                </Text>
              </View>

              <View style={styles.containerButton}>
                <TouchableOpacity
                  onPress={() => handleSave("information", "name")}
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
                  onPress={() => setModalVisible(!modalVisible.information)}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.editContainer}>
          <View style={styles.typeEditContainer}>
            <Text style={styles.typeEditText}>Intro</Text>
            <Text style={styles.editText}>Edit</Text>
          </View>
          <View>
            <View style={styles.aboutContainer}>
              <View style={styles.aboutItem}>
                <Ionicons name="school" style={styles.iconAbout} />
                <Text style={styles.containerText}>
                  <Text style={styles.normalText}>
                    Studies {data.branch} at{" "}
                  </Text>
                  <Text style={styles.boldText}>{data.school}</Text>
                </Text>
              </View>

              <View style={styles.aboutItem}>
                <Ionicons name="school" style={styles.iconAbout} />
                <Text style={styles.containerText}>
                  <Text style={styles.normalText}>Went to </Text>
                  <Text style={styles.boldText}>{data.highSchool}</Text>
                </Text>
              </View>

              <View style={styles.aboutItem}>
                <Ionicons name="home" style={styles.iconAbout} />
                <Text style={styles.containerText}>
                  <Text style={styles.normalText}>Lives in </Text>
                  <Text style={styles.boldText}>{data.lives}</Text>
                </Text>
              </View>

              <View style={styles.aboutItem}>
                <Entypo name="address" style={styles.iconAbout} />
                <Text style={styles.containerText}>
                  <Text style={styles.normalText}>From </Text>
                  <Text style={styles.boldText}>{data.address}</Text>
                </Text>
              </View>

              <View style={styles.aboutItem}>
                <FontAwesome name="instagram" style={styles.iconAbout} />
                <Text style={styles.containerText}>
                  <Text
                    style={{
                      ...styles.normalText,
                      color: colors.secondColor,
                      textDecorationLine: "underline",
                    }}
                    onPress={() =>
                      Linking.openURL(
                        `https://www.instagram.com/${data.instagram}`
                      )
                    }
                  >
                    {data.instagram}
                  </Text>
                </Text>
              </View>

              <View style={styles.aboutItem}>
                <Ionicons name="logo-github" style={styles.iconAbout} />
                <Text style={styles.containerText}>
                  <Text
                    style={{
                      ...styles.normalText,
                      color: colors.secondColor,
                      textDecorationLine: "underline",
                    }}
                    onPress={() =>
                      Linking.openURL(`https://www.github.com/${data.github}`)
                    }
                  >
                    {data.github}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
