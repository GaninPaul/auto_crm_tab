import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  content: {
    margin: 5
  }
});

const MenuIcon = ({ onPress, width = 32, height = 32, color = "#111111" }) => (
  <TouchableOpacity onPress={onPress} style={styles.content}>
    <Svg width={width} height={height} viewBox="0 0 459 459">
      <Path
        fill={color}
        d="M0,382.5h459v-51H0V382.5z M0,255h459v-51H0V255z M0,76.5v51h459v-51H0z"
      />
    </Svg>
  </TouchableOpacity>
);

export default MenuIcon;
