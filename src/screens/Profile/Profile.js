import React from "react";
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
import { useSelector } from "react-redux";

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
};

const Profile = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.wallpaperContainer}>
        <Image
          source={{ uri: userInfo.wallpaper } || images.wallpaper}
          style={styles.coverPhoto}
        />
        <Image source={images.take_photo} style={styles.cameraWallpaper} />
      </View>
      <View style={styles.dpContainer}>
        <View style={styles.dpBlueRound}>
          <Image
            source={{ uri: userInfo.avatar } || images.avatar}
            style={styles.dp}
          />
          {/* <View style={styles.activeNowTick}></View> */}
          <Image source={images.take_photo} style={styles.cameraAvatar} />
        </View>
      </View>

      <Text style={styles.name}>{userInfo.name}</Text>
      <Text style={styles.shortBio}>{userInfo.bio}</Text>

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
        <View style={styles.aboutItem}>
          <Ionicons name="school" style={styles.iconAbout} />
          <Text style={styles.containerText}>
            <Text style={styles.normalText}>Studies {data.branch} at </Text>
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
                Linking.openURL(`https://www.instagram.com/${data.instagram}`)
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
  );
};

export default Profile;
