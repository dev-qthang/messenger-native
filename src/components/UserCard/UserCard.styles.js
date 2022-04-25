import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    height: 50,
  },
  userName: {
    fontSize: 13,
    fontWeight: "400",
    color: colors.gray02,
  },
  userAvatar: {
    alignItems: "center",
    justifyContent: "center",
  },
});
