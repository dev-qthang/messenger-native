import { StyleSheet } from "react-native";
import { colors } from '../../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 4,
    color: '#ffffff',
  },
  iconHeader: {
    fontSize: 21,
    color: colors.mainColor,
  },
  iconFooter: {
    fontSize: 21,
    color: colors.mainColor,
    marginRight: 10,
    marginLeft: 10,
  },
  iconEmoji: {
    fontSize: 21,
    color: colors.mainColor,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.07)',
    borderBottomWidth: 1,
  },
  backIcon: {
    fontSize: 30,
    color: colors.mainColor,
    marginLeft: 8,
  },
  headerInfo: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_avatarIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginLeft: 16,
    marginRight: 8,
  },
  header_actions: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginRight: 8,
  },
  body: {
    flex: 11,
    marginLeft: 8,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 0,
  },
  preview: {
    position: "absolute",
    width: 100,
    height: 200,
    top: -210,
    right: 16,
    elevation: 10,
  },
  previewVideo: {
    alignSelf: 'center',
    width: 100,
    height: 160,
  },
  previewClose: {
    width: 24,
    fontSize: 20,
    color: colors.white,
    padding: 2,
    borderRadius: 100,
    backgroundColor: colors.mainColor,
  },
  previewImg: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 2,
  },
  previewSend: {
    width: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.mainColor,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray03,
    borderRadius: 19,
    height: 37,
  },
  inputText: {
    flex: 1,
    paddingLeft: 11,
    color: colors.zblack,
    fontSize: 16,
  },
  inputEmoji: {
    padding: 4,
    paddingRight: 9,
  },
})