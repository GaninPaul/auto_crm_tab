import { StyleSheet } from "react-native";
import { FONTS } from "../../utils/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    padding: 5
  },
  inputWrapper: {
    width: "100%"
  },
  button: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto"
  },
  label: {
    fontSize: 30,
    fontFamily: FONTS.COMFORTAA_BOLD
  },
  input: {
    height: 35,
    fontSize: 28,
    fontFamily: FONTS.COMFORTAA_REGULAR,
    marginVertical: 4
  }
});

export default styles;
