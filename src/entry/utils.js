import React from "react";
import MenuIcon from "../components/Icons/MenuIcon";
import {FONTS} from "../utils/constants";

export const defaultNavigationOptions = navigation => ({
  headerStyle: {
    backgroundColor: "#315b96"
  },
  headerTitleStyle: {
    color: "#ffffff",
    fontFamily: FONTS.COMFORTAA_REGULAR
  },
  headerLeft: (
    <MenuIcon onPress={() => navigation.openDrawer()} color="#ffffff" />
  )
});
