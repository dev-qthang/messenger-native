import React, { useState } from "react";
import { View, Image, FlatList, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../images";
import { styles } from "./StorySlider.styles";
import UserPermissions from "../../utils/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { uploadStory } from "../../redux/storySlice";

const StorySlider = ({ navigation }) => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.stories);
  const myStory = useSelector((state) => state.story.myStory);
  const [story, setStory] = useState({ content: "", type: "", finish: 0 });
  const user = useSelector((state) => state.user);

  const handlePickerAvatar = async () => {
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
        dispatch(uploadStory({ ...story, content: result.uri, type: "image" }));
      }
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userIconContainer}
      onPress={() =>
        navigation.navigate("Story", {
          user: item.user,
          image: item.user.avatar,
          contentStory: item.stories,
        })
      }
    >
      <Image source={item.image} />
      <Text style={styles.userName}>
        {item.user.firstName + " " + item.user.lastName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.userIconContainer}
        onPress={() =>
          myStory.length > 0
            ? navigation.navigate("Story", {
                user: user,
                image: user.avatar,
                contentStory: myStory,
              })
            : handlePickerAvatar()
        }
      >
        <Image
          source={myStory.length > 0 ? images.avatar : images.your_story}
        />
        <Text style={styles.userName}>Your Story</Text>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={stories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default StorySlider;