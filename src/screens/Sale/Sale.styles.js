import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexGrow: 1
  },
  wrapper: {
    flexGrow: 1
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fbc1bc",
    padding: 5,
    bottom: 0
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
