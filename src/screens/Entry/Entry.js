import React from "react";
import { Container, Content, Body, Text, Button, Input } from "native-base";
import { ActivityIndicator, View } from "react-native";
import {
  createUserJWT,
  IsAuth,
  SetIsAuth,
  verifyTokens
} from "../../service/Auth";
import { getServerAddress, setServerAddress, SetUp } from "../../service/Setup";
import Logs from "../../store/Logs";

class Entry extends React.Component {
  componentDidMount() {
    this.fetch();
  }
  state = { hasNetWorkError: false, serverAddress: "" };
  fetch = async () => {
    try {
      await SetUp();
      console.log("SERVER_ADDRESS", getServerAddress());
      this.setState({ serverAddress: getServerAddress() });
      if (await verifyTokens()) {
        SetIsAuth(true);
      }
      if (!IsAuth())
        await createUserJWT({
          username: "pganin",//"admin",
          password: "evdh5r36"
        });
      await Logs.init();
      this.props.navigation.navigate("SaleScreen");
    } catch (e) {
      console.log(e);
      this.setState({ hasNetWorkError: true });
    }
  };

  handleInput = value => {
    setServerAddress(value);
    this.setState({ serverAddress: value });
  };

  render() {
    return (
      <Container>
        <Content>
          <Body style={{ flex: 1, height: "100%" }}>
            <Text
              style={{
                fontSize: 35,
                color: "#111",
                textAlign: "center",
                marginTop: 20
              }}
            >
              ОНЛАЙН ТЕРМИНАЛ
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
                color: "#808080",
                textAlign: "center",
                marginBottom: 10
              }}
            >
              В случае возникновения проблем надо будет{"\n"}сфотографировать
              экран устройства с ошибкой
            </Text>
            {this.state.hasNetWorkError ? (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 35,
                    color: "#8B0000",
                    textAlign: "center"
                  }}
                >
                  Проблемы с подключением к серверу!
                </Text>
                <Input
                  style={{
                    width: "100%",
                    maxHeight: 45,
                    fontSize: 20,
                    borderColor: "#000",
                    borderWidth: 1,
                    margin: 10
                  }}
                  onChangeText={this.handleInput}
                  value={this.state.serverAddress}
                />
                <Button
                  rounded
                  danger
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  onPress={() => {
                    this.setState({ hasNetWorkError: false });
                    this.fetch();
                  }}
                >
                  <Text style={{ fontSize: 25 }}>Переподключиться</Text>
                </Button>
              </View>
            ) : (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    marginTop: 5,
                    marginRight: 15,
                    fontSize: 15,
                    color: "#888888",
                    textAlign: "center"
                  }}
                >
                  Загрузка
                </Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
            <Text
              style={{
                marginLeft: "auto",
                marginTop: "50%",
                fontSize: 15,
                color: "#C0C0C0",
                textAlign: "right"
              }}
            >
              @GaninPaul - frontend{"\n"}@Dihset - backend
            </Text>
          </Body>
        </Content>
      </Container>
    );
  }
}

export default Entry;
