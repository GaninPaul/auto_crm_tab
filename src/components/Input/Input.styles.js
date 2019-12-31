import { StyleSheet } from "react-native";
import { FONTS } from "utils/constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10
  },
  border: {
    width: "100%",
    minHeight: 35,
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 0,
    paddingHorizontal: 10
  },
  content: {
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    fontFamily: FONTS.COMFORTAA_LIGHT,
    fontWeight: "900",
    fontSize: 18
  },
  label: {
    fontSize: 15
  }
});

export default styles;
