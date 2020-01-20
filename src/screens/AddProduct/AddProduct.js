import React from "react";
import {Text, View} from "react-native";
import styles from "./AddProduct.styles";
import {defaultNavigationOptions} from "entry/utils";
import {observer} from "mobx-react";

@observer
class AddProduct extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Добавить товар",
    ...defaultNavigationOptions(navigation)
  });
  state = {
    bottomHidden: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

export default AddProduct;
