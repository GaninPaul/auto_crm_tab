import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./RoundButton.styles";
import { BUTTONS_SIZES } from "utils/constants";
import ActivityIndicator from "../Icons/ActivityIndicator";

class RoundButton extends PureComponent {
  render() {
    const {
      title,
      onPress,
      style,
      isLoading,
      testStyle,
      size,
      color,
      disabled
    } = this.props;
    let buttonSize = styles.regular;
    let textSize = styles.textRegular;
    let width = 16;
    let height = 16;
    switch (size) {
      case BUTTONS_SIZES.LARGE:
        buttonSize = styles.large;
        textSize = styles.textLarge;
        width = 20;
        height = 20;
        break;
      case BUTTONS_SIZES.SMALL:
        buttonSize = styles.small;
        textSize = styles.textSmall;
        width = 10;
        height = 10;
        break;
      default:
        buttonSize = styles.regular;
        textSize = styles.textRegular;
        width = 16;
        height = 16;
        break;
    }
    return (
      <TouchableOpacity
        style={[
          styles.container,
          buttonSize,
          color && { backgroundColor: color },
          style
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.text, textSize, testStyle]}>{title}</Text>
        {isLoading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator width={width} height={height} color="#ffffff" />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

export default RoundButton;
