import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {FONTS} from "utils/constants";

const styles = StyleSheet.create({
  content: { marginRight: 5 },
  text: { color: "#fff", fontFamily: FONTS.COMFORTAA_BOLD }
});

const ClearButton = ({ onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.content, style]}>
    <Text style={styles.text}>Очистить</Text>
  </TouchableOpacity>
);

export default ClearButton;
