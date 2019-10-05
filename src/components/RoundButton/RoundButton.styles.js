import { StyleSheet } from "react-native";
import { FONTS } from "../../utils/constants";

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  text: {
    fontFamily: FONTS.COMFORTAA_BOLD,
    color: "#ffffff",
    fontSize: 15
  },
  regular: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#17BEBB",
    paddingHorizontal: 12
  },
  textRegular: {
    fontSize: 20
  },
  small: {
    backgroundColor: "#D62246",
    paddingHorizontal: 8
  },
  textSmall: {
    fontSize: 15
  },
  large: {
    height: 50,
    borderRadius: 20,
    backgroundColor: "#4B1D3F",
    paddingHorizontal: 15
  },
  textLarge: {
    fontSize: 20
  },
  activityIndicator: {
    marginLeft: 5
  }
});

export default styles;
