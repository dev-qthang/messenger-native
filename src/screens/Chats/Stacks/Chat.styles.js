import { StyleSheet } from "react-native";
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  icon: {
    fontSize: 28,
    color: colors.mainColor,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon: {
    fontSize: 40,
    color: colors.mainColor,
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
  },
  body: {
    flex: 11,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.gray02,
    borderRadius: 16,
  },
  inputText: {
    flex: 1,
    paddingLeft: 8,
    color: colors.white,
    fontSize: 16,
  },
  inputEmoji: {
    padding: 4,
  },
})