import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { Animated } from "react-native";

class ActivityIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.loop(
      Animated.timing(this.animation, { toValue: 10, duration: 1000 })
    ).start();
  }
  render() {
    const rotation = this.animation.interpolate({
      inputRange: [0, 10],
      outputRange: ["0deg", "360deg"]
    });
    const { width = 64, height = 64, color = "#000000" } = this.props;
    return (
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <Svg width={width} height={height} viewBox="0 0 128 128">
          <G>
            <Path
              d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z"
              fill={color}
              fillOpacity="1"
            />
          </G>
        </Svg>
      </Animated.View>
    );
  }
}

export default ActivityIndicator;
