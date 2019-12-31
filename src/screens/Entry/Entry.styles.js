import { StyleSheet } from "react-native";
import { FONTS } from "utils/constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  content: {
    flex: 1,
    backgroundColor: "#E7E8E8"
  },
  title: {
    fontFamily: FONTS.COMFORTAA_REGULAR,
    fontSize: 35,
    color: "#111",
    textAlign: "center",
    marginTop: 20
  },
  subTitle: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#60B2E5",
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontFamily: FONTS.COMFORTAA_REGULAR
  },
  textError: {
    fontSize: 20,
    color: "#8B0000",
    textAlign: "center",
    fontFamily: FONTS.COMFORTAA_REGULAR
  },
  errorWrapper: {
    margin: 10
    //alignItems: "center"
  },
  input: {
    width: "100%",
    maxHeight: 45,
    fontSize: 20,
    borderColor: "#000",
    borderWidth: 1,
    margin: 10
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  authors: {
    position: "absolute",
    right: 10,
    bottom: 10,
    fontSize: 15,
    color: "#C0C0C0",
    textAlign: "right"
  },
  loadingText: {
    marginTop: 5,
    marginRight: 15,
    fontSize: 15,
    color: "#888888",
    textAlign: "center",
    fontFamily: FONTS.COMFORTAA_REGULAR
  },
  loadingWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default styles;
