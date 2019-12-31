import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import styles from "./Input.styles";

class Input extends Component {
  render() {
    const {
      style,
      inputStyle,
      labelStyle,
      onChangeText,
      value,
      validation,
      label,
      inputProps
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <View style={styles.border}>
          <TextInput
            style={[styles.content, inputStyle]}
            onChangeText={onChangeText}
            value={value}
            {...inputProps}
          />
        </View>
      </View>
    );
  }
}

export default Input;
