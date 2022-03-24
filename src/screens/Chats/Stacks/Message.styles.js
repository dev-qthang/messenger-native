import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

export const styles = StyleSheet.create({
  left_container: {
    maxWidth: "69%",
    flexDirection: 'row',
    marginVertical: 2,
  },
  avatar: {
    marginHorizontal: 8,
    justifyContent: 'flex-end',
  },
  avatarImg: {
    width: 33,
    height: 33,
    borderRadius: 100,
  },
  text: {
    flex: 1,
  },
  textValue: {
    color: colors.white,
    fontSize: 16,
    backgroundColor: colors.gray02,
    borderRadius: 16,
    padding: 8,
    marginBottom: 1,
  },


  right_container: {
    maxWidth: "69%",
    flexDirection: 'row',
    marginLeft: "auto",
    marginVertical: 2,
  },
  checkedIcon: {
    width: 16,
    height: 16,
    borderRadius: 100,
  },
})