import React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Right,
  Left,
  Text,
  Card,
  CardItem,
  Body
} from "native-base";
import { Alert } from "react-native";
import { observer } from "mobx-react";
import { computed, observable } from "mobx";
import Logs from "../../store/Logs";

@observer
class Settings extends React.Component {
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

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Title>Управление</Title>
          </Left>
          <Right>
            <Button transparent onPress={this.handleControlPanel}>
              <Text>Закрыть </Text>
            </Button>
          </Right>
        </Header>
        <Content>
          {!this.isOpenCheckBox ? (
            <Button
              style={{ marginTop: 10 }}
              full
              success
              disabled={this.isLoading}
              onPress={this.openCheckBox}
            >
              <Text style={{ fontSize: 25, color: "#ffffff" }}>
                Открыть кассу
              </Text>
            </Button>
          ) : (
            <>
              <Card style={{ margin: 20 }}>
                <CardItem>
                  <Body>
                    <Text style={{ fontSize: 20 }}>
                      Касса открыта с {Logs.cashierChange}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              <Button
                disabled={this.isLoading}
                style={{ marginTop: 10 }}
                full
                onPress={this.closeCheckBox}
              >
                <Text style={{ fontSize: 25, color: "#ffffff" }}>
                  Закрыть кассу
                </Text>
              </Button>
            </>
          )}
          <Button
            style={{ marginTop: 10 }}
            full
            dark
            onPress={() => {
              this.props.navigation.navigate("MakeReturnScreen");
            }}
          >
            <Text style={{ fontSize: 25, color: "#ffffff" }}>
              Оформить возврат
            </Text>
          </Button>
          <Button
            style={{ marginTop: 10 }}
            full
            info
            onPress={() => {
              this.props.navigation.navigate("ListSalesScreen");
            }}
          >
            <Text style={{ fontSize: 25, color: "#ffffff" }}>
              Список продаж
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Settings;
