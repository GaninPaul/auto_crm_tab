import { StyleSheet } from "react-native";
import { FONTS } from "/utils/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    padding: 5
  },
  paginationWrapper: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    borderWidth: 1
  },
  headerWhen: {
    width: "50%",
    fontFamily: FONTS.COMFORTAA_REGULAR,
    paddingLeft: 5,
    borderLeftWidth: 1,
    fontSize: 20
  },
  headerPrice: {
    width: "40%",
    borderLeftWidth: 1,
    paddingLeft: 5,
    fontFamily: FONTS.COMFORTAA_REGULAR,
    fontSize: 20
  },
  headerId: {
    width: "10%",
    paddingLeft: 5,
    fontFamily: FONTS.COMFORTAA_REGULAR,
    fontSize: 20
  }
});

export default styles;
