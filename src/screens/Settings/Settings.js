import React from "react";
import { Alert, ScrollView, View, Text } from "react-native";
import { observer } from "mobx-react";
import { computed, observable } from "mobx";
import Logs from "store/Logs";
import { defaultNavigationOptions } from "entry/utils";
import styles from "./Settings.styles";
import RoundButton from "components/RoundButton";

@observer
class Settings extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Управление терминалом",
    ...defaultNavigationOptions(navigation)
  });

  @observable isLoading = false;

  @computed
  get isOpenCheckBox() {
    return Logs.isOpenCheckBox;
  }

  handleControlPanel = () => {
    const { state, goBack } = this.props.navigation;
    goBack(state.key);
  };

  openCheckBox = async () => {
    try {
      this.isLoading = true;
      await Logs.openCheckBox();
    } catch (e) {
      console.log(e);
      Alert.alert(
        "Error",
        e,
        [
          {
            text: "ok",
            onPress: () => {},
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } finally {
      this.isLoading = false;
    }
  };

  closeCheckBox = async () => {
    try {
      this.isLoading = true;
      await Logs.closeCheckBox();
    } catch (e) {
      console.log(e);
      Alert.alert(
        "Error",
        e,
        [
          {
            text: "ok",
            onPress: () => {},
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } finally {
      this.isLoading = false;
    }
  };

  renderCheckOpen = () => {
    return (
      <View style={styles.wrapper}>
        <RoundButton
          title="Открыть кассу"
          onPress={this.openCheckBox}
          isLoading={this.isLoading}
          disabled={this.isLoading}
          style={styles.button}
        />
      </View>
    );
  };

  renderCheckClose = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Касса открыта с {Logs.cashierChange}</Text>
        <RoundButton
          title="Закрыть кассу"
          onPress={this.closeCheckBox}
          isLoading={this.isLoading}
          disabled={this.isLoading}
          style={styles.button}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          {!this.isOpenCheckBox
            ? this.renderCheckOpen()
            : this.renderCheckClose()}
        </ScrollView>
      </View>
    );
  }
}

export default Settings;
