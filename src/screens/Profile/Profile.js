import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { images } from "../../images";
import { styles } from "./Profile.styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Story from "../../components/Story/Story";

const Profile = ({ navigation, route }) => {
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    const otherUser = route.params?.otherUser;
    if (otherUser) {
      setUser(otherUser);
    } else {
      const loggedUser = users.filter((user) => user._id === auth.id)[0];

      setUser(loggedUser);
    }
  }, [route.params?.otherUser, users]);

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
          user.stories.length > 0 &&
          navigation.navigate("Story", {
            user: user,
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

      <Text style={styles.name}>{user.fullName}</Text>
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
          onPress={() => {
            if (user._id === auth.id) {
              navigation.navigate("EditProfile", { user });
            }
          }}
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

      <View style={styles.infoContainer}>
        <Text
          style={{
            marginLeft: 20,
            marginBottom: 10,
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          Information
        </Text>
        {user.gender && (
          <View style={styles.itemContainer}>
            <FontAwesome name="transgender" style={styles.icon} />
            <Text style={styles.text}>
              <Text style={styles.valueText}>{user.gender}</Text>
            </Text>
          </View>
        )}

        {user.address && (
          <View style={styles.itemContainer}>
            <FontAwesome name="home" style={styles.icon} />
            <Text style={styles.text}>
              Lives in <Text style={styles.valueText}>{user.address}</Text>
            </Text>
          </View>
        )}

        {user.school && (
          <View style={styles.itemContainer}>
            <Ionicons name="school" style={styles.icon} />
            <Text style={styles.text}>
              Studies at <Text style={styles.valueText}>{user.school}</Text>
            </Text>
          </View>
        )}

        {user.work && (
          <View style={styles.itemContainer}>
            <MaterialIcons name="work" style={styles.icon} />
            <Text style={styles.text}>
              Works at <Text style={styles.valueText}>{user.work}</Text>
            </Text>
          </View>
        )}

        {user.dateOfBirth && (
          <View style={styles.itemContainer}>
            <FontAwesome name="birthday-cake" style={styles.icon} />
            <Text style={styles.text}>
              Born on <Text style={styles.valueText}>{user.dateOfBirth}</Text>
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;
