import React from "react";
import { Alert, ScrollView, View } from "react-native";
import { deleteRequest } from "service/api";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Toast from "react-native-easy-toast";
import { defaultNavigationOptions } from "entry/utils";
import RoundButton from "components/RoundButton";
import styles from "./MakeReturn.styles";
import Input from "components/Input";

@observer
class MakeReturn extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Отмена продажи",
    ...defaultNavigationOptions(navigation)
  });

  @observable isLoading = false;
  @observable inputValue = "";
  toastRef = React.createRef();

  handleControlPanel = () => {
    const { state, goBack } = this.props.navigation;
    goBack(state.key);
  };

  handleInput = text => {
    if (text === "") {
      this.inputValue = "";
    }
    const number = parseInt(text);
    if (!isNaN(number) && number) {
      this.inputValue = number.toString();
    }
  };

  makeReturn = async () => {
    if (this.inputValue === "") {
      return;
    }
    try {
      this.isLoading = true;
      await deleteRequest({ url: `/api/shop/sales/${this.inputValue}/` });
      this.toastRef.current.show("Операция выполнена!");
      this.inputValue = "";
      // await new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     this.props.navigation.navigate("SaleScreen");
      //     resolve();
      //   }, 1000);
      // });
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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={styles.inputWrapper}>
            <Input
              labelStyle={styles.label}
              inputStyle={styles.input}
              onChangeText={this.handleInput}
              value={this.inputValue}
              label="Номер чека"
              inputProps={{
                keyboardType: "numeric"
              }}
            />
          </View>
          <RoundButton
            title="Оформить возврат"
            onPress={this.makeReturn}
            isLoading={this.isLoading}
            disabled={this.isLoading}
            style={styles.button}
          />
        </ScrollView>
        <Toast ref={this.toastRef} />
      </View>
    );
  }
}

export default MakeReturn;
