import React, { useEffect } from "react";
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

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wallpaperContainer}>
        <Image
          source={{ uri: user.wallpaper } || images.wallpaper}
          style={styles.coverPhoto}
        />
        <Image source={images.take_photo} style={styles.cameraWallpaper} />
      </View>
      <View style={styles.dpContainer}>
        <View style={styles.dpBlueRound}>
          <Image
            source={{ uri: user.avatar } || images.avatar}
            style={styles.dp}
          />
          {/* <View style={styles.activeNowTick}></View> */}
          <Image source={images.take_photo} style={styles.cameraAvatar} />
        </View>
      </View>

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

      <View style={styles.aboutContainer}>
        {user.schools?.map((school, index) => (
          <View style={styles.aboutItem} key={index}>
            <Text style={styles.containerText}>
              <Ionicons name="school" style={styles.iconAbout} />
              <Text style={styles.normalText}>
                {school.graduated ? "Studied" : "Studies"} {school.major} at
              </Text>
              <Text style={styles.boldText}>{school.schoolName}</Text>
            </Text>
          </View>
        ))}

        <View style={styles.aboutItem}>
          <Ionicons name="school" style={styles.iconAbout} />
          <Text style={styles.containerText}>
            <Text style={styles.normalText}>Went to </Text>
            <Text style={styles.boldText}>{user.highSchool}</Text>
          </Text>
        </View>

        <View style={styles.aboutItem}>
          <Ionicons name="home" style={styles.iconAbout} />
          <Text style={styles.containerText}>
            <Text style={styles.normalText}>Lives in </Text>
            <Text style={styles.boldText}>{user.lives}</Text>
          </Text>
        </View>

        <View style={styles.aboutItem}>
          <Entypo name="address" style={styles.iconAbout} />
          <Text style={styles.containerText}>
            <Text style={styles.normalText}>From </Text>
            <Text style={styles.boldText}>{user.address}</Text>
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
                Linking.openURL(`https://www.instagram.com/${user.instagram}`)
              }
            >
              {user.instagram}
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
                Linking.openURL(`https://www.github.com/${user.github}`)
              }
            >
              {user.github}
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
