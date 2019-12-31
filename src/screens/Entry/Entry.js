import React from "react";
import { View, Text, ScrollView } from "react-native";
import { createUserJWT, IsAuth, SetIsAuth, verifyTokens } from "service/Auth";
import {
  getPassword,
  getServerAddress,
  setServerAddress,
  SetUp,
  getUsername,
  setUsername,
  setPassword
} from "service/Setup";
import Logs from "store/Logs";
import styles from "./Entry.styles";
import RoundButton from "components/RoundButton";
import Input from "components/Input";
import { observable } from "mobx";
import { observer } from "mobx-react";
import ActivityIndicator from "components/Icons/ActivityIndicator";

@observer
class Entry extends React.Component {
  static navigationOptions = {
    header: null
  };

  @observable isLoading = false;
  @observable hasNetWorkError = false;
  @observable serverAddress = "";
  @observable username = "";
  @observable password = "";

  componentDidMount() {
    this.fetch();
  }

  login = async () => {
    if (await verifyTokens()) {
      SetIsAuth(true);
    }
    if (!IsAuth()) {
      await createUserJWT({
        username: this.username,
        password: this.password
      });
    }
  };

  fetch = async () => {
    try {
      this.isLoading = true;
      await SetUp();
      console.log("SERVER_ADDRESS", getServerAddress());
      this.serverAddress = getServerAddress();
      this.username = getUsername();
      this.password = getPassword();
      // await this.login();
      // await Logs.init();
      this.isLoading = false;
      this.props.navigation.navigate("SaleScreen");
    } catch (e) {
      console.log(e);
      this.hasNetWorkError = true;
      this.isLoading = false;
    }
  };

  handleInput = value => {
    this.serverAddress = value;
  };

  handleUsername = value => {
    this.username = value;
  };

  handlePassword = value => {
    this.password = value;
  };

  reconnect = async () => {
    setServerAddress(this.serverAddress);
    setUsername(this.username);
    setPassword(this.password);
    await this.fetch();
  };

  renderNetWorkError = () => {
    return (
      <View style={styles.errorWrapper}>
        <Text style={styles.textError}>Проблемы с подключением к серверу!</Text>
        <Input
          onChangeText={this.handleInput}
          value={this.serverAddress}
          label="Адресс сервера"
          inputStyle={{height: 30}}
        />
        <Input
          onChangeText={this.handleUsername}
          value={this.username}
          label="Пользователь"
          inputStyle={{height: 30}}
        />
        <Input
          onChangeText={this.handlePassword}
          value={this.password}
          inputProps={{ secureTextEntry: true }}
          inputStyle={{height: 30}}
        />
        <RoundButton
          title="Переподключиться"
          isLoading={this.isLoading}
          style={styles.button}
          onPress={this.reconnect}
        />
      </View>
    );
  };

  renderConnect() {
    return (
      <View style={styles.loadingWrapper}>
        <Text style={styles.loadingText}>Загрузка</Text>
        <ActivityIndicator width={32} height={32} color="#0000ff" />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>ОНЛАЙН ТЕРМИНАЛ</Text>
          <Text style={styles.subTitle}>
            В случае возникновения проблем надо будет сфотографировать экран
            устройства с ошибкой
          </Text>
          {this.hasNetWorkError
            ? this.renderNetWorkError()
            : this.renderConnect()}
        </ScrollView>
      </View>
    );
  }
}

export default Entry;
