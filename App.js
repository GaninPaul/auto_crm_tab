/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./src/entry/AppNavigator";
import Logs from "./src/store/Logs";
import { SetUp } from "./src/service/Setup";

type Props = {};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
console.reportErrorsAsExceptions = false;
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  }
}
