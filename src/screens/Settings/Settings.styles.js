import { StyleSheet } from "react-native";
import { FONTS } from "utils/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexGrow: 1
  },
  wrapper: {
    margin: 10
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.COMFORTAA_REGULAR
  }
});

export default styles;
