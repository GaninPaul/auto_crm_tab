import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    marginBottom: 50
  },
  wrapper: {
    flexGrow: 1
  },
  footer: {
    position: "absolute",
    padding: 5,
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fbc1bc"
  },

  footerLeft: {},
  footerRight: {
    marginLeft: "auto"
  },
  header: {
    width: "100%",
    height: 60,
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#fbc1bc"
  }
});

export default styles;
