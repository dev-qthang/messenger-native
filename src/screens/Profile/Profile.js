import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { images } from "../../images";
import { styles } from "./Profile.styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Story from "../../components/Story/Story";
import { getUserInfo } from "../../redux/userSlice";

const Profile = ({ navigation, route }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const auth = useSelector((state) => state.auth);
  const stories = useSelector((state) => state.story.stories);
  const [user, setUser] = useState({});
  const [story, setStory] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = route.params?.userInfo;
    if (userInfo) {
      setUser(userInfo);
      const currentStory = stories.filter((e) => e.id === userInfo._id)[0]
        .stories;

      if (currentStory) setStory(currentStory);
    } else {
      setUser(currentUser);
      const currentStory = stories.filter((e) => e.id === currentUser._id)[0]
        .stories;

      if (currentStory) setStory(currentStory);
    }
  }, [route.params?.userInfo, currentUser]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wallpaperContainer}>
        <Ionicons
          name="arrow-back"
          style={styles.back}
          onPress={() => navigation.navigate("Chats")}
        />
        <Image
          source={{ uri: user.wallpaper } || images.wallpaper}
          style={styles.coverPhoto}
        />
        <Image source={images.take_photo} style={styles.cameraWallpaper} />
      </View>
      <TouchableOpacity
        style={styles.dpContainer}
        onPress={() =>
          story.length > 0 &&
          navigation.navigate("Story", {
            user: user,
            image: user.avatar,
            contentStory: story,
          })
        }
      >
        <View style={styles.dpBlueRound}>
          <Image
            source={{ uri: user.avatar } || images.avatar}
            style={styles.dp}
          />
          <View style={styles.activeNowTick}></View>
          <Image source={images.take_photo} style={styles.cameraAvatar} />
        </View>
      </TouchableOpacity>

      <Text style={styles.name}>{user.firstName + " " + user.lastName}</Text>
      <Text style={styles.shortBio}>{user.bio}</Text>

      <View style={styles.profileTabsContainer}>
        <View style={styles.tabContainer}>
          <View style={styles.tabImageContainer}>
            <Icon name="plus" style={styles.tabImage} />
          </View>
          <Text style={styles.tabText}>Add Story</Text>
        </View>

        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <View style={styles.tabImageContainer}>
            <Icon
              name="user-edit"
              style={{ ...styles.tabImage, marginLeft: 7 }}
            />
          </View>
          <Text style={styles.tabText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.tabContainer}>
          <View style={styles.tabImageContainer}>
            <Entypo name="message" style={styles.tabImage} />
          </View>
          <Text style={styles.tabText}>Message</Text>
        </View>

        <View style={styles.tabContainer}>
          <View style={styles.tabImageContainer}>
            <Feather name="more-horizontal" style={styles.tabImage} />
          </View>
          <Text style={styles.tabText}>More</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
