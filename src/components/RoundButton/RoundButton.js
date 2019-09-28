import React, { PureComponent } from "react";
import { ActivityIndicator, View, Text, TouchableOpacity } from "react-native";
import styles from "./RoundButton.styles";

class RoundButton extends PureComponent {
  render() {
    const { title, onPress, style, isLoading, testStyle } = this.props;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={[styles.text, testStyle]}>{title}</Text>
        {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
      </TouchableOpacity>
    );
  }
}

export default RoundButton;
