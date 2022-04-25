import React, { useEffect, useRef, useState } from "react";
import { View, Image, TextInput, FlatList } from "react-native";
import { images } from "../../images";
import { colors } from "../../theme/colors";
import { getDataAPI } from "../../utils/fetchData";
import { styles } from "./SearchBox.styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserCard from "../UserCard/UserCard";

const SearchBox = ({ auth, navigation }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const debounceSearch = useRef(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!search) setUsers([]);
    if (debounceSearch.current) {
      clearTimeout(debounceSearch.current);
    }

    debounceSearch.current = setTimeout(() => {
      const searchUsers = async () => {
        try {
          // setLoad(true);
          const users = await getDataAPI(
            `user/search?searchUser=${search}`,
            auth.token
          );

          setUsers(users.data);
          // setLoad(false);
        } catch (e) {
          console.log(e);
        }
      };

      searchUsers();
    }, 250);
  }, [search]);

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  const renderItem = ({ item }) => (
    <UserCard user={item} navigation={navigation} setSearch={setSearch} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image style={styles.searchIcon} source={images.search} />
        <TextInput
          placeholderTextColor={colors.gray02}
          value={search}
          style={styles.searchInput}
          onChangeText={(text) =>
            setSearch(text.toLowerCase().replace(/ /g, ""))
          }
          placeholder="Search"
        />
        {users.length > 0 && <Ionicons name="close" onPress={handleClose} />}
      </View>

      {users.length > 0 && (
        <View
          style={{
            height: 500,
          }}
        >
          <FlatList
            style={{ height: 500 }}
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBox;
