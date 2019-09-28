import React, { Component } from "react";
import { Text, View } from "react-native";
import ScrollPicker from "react-native-wheel-scroll-picker";

export default class NumberWheel extends Component {
  render() {
    const data = [];
    for (let i = 0; i < 100; i++) data.push(i);
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <ScrollPicker
          dataSource={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          selectedIndex={1}
          onValueChange={(data, selectedIndex) => {
            //
          }}
          wrapperHeight={120}
          wrapperWidth={40}
          wrapperBackground={"#FFFFFF"}
          itemHeight={40}
          highlightColor={"#d8d8d8"}
          highlightBorderWidth={2}
          activeItemColor={"#222121"}
          itemColor={"#B4B4B4"}
        />
        <ScrollPicker
          dataSource={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          selectedIndex={1}
          onValueChange={(data, selectedIndex) => {
            //
          }}
          wrapperHeight={120}
          wrapperWidth={20}
          wrapperBackground={"#FFFFFF"}
          itemHeight={40}
          highlightColor={"#d8d8d8"}
          highlightBorderWidth={2}
          activeItemColor={"#222121"}
          itemColor={"#B4B4B4"}
        />
        <Text>.</Text>
        <ScrollPicker
          dataSource={data}
          selectedIndex={1}
          onValueChange={(data, selectedIndex) => {
            //
          }}
          wrapperHeight={120}
          wrapperWidth={20}
          wrapperBackground={"#FFFFFF"}
          itemHeight={40}
          highlightColor={"#d8d8d8"}
          highlightBorderWidth={2}
          activeItemColor={"#222121"}
          itemColor={"#B4B4B4"}
        />
      </View>
    );
  }
}
