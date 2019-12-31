import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
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
    backgroundColor: "#fbc1bc",
  },

  footerLeft: {},
  footerRight: {
    marginLeft: "auto"
  },
  header: {
    height: 50
  }
});

export default styles;
