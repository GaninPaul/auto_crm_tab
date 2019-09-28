import React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Right,
  Body,
  Text,
  Item,
  Label,
  Input,
  Left,
  Spinner
} from "native-base";
import { Alert } from "react-native";
import { deleteRequest } from "../../service/api";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Toast from "react-native-easy-toast";

@observer
class MakeReturn extends React.Component {
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
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          this.props.navigation.navigate("SaleScreen");
          resolve();
        }, 1000);
      });
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
            <Title>Отмена продажи</Title>
          </Left>
          <Right>
            <Button transparent onPress={this.handleControlPanel}>
              <Text>Закрыть </Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Body style={{ width: "100%" }}>
            <Item stackedLabel style={{ width: "100%" }} error={!this.isValid}>
              <Label style={{ fontSize: 30, color: "#000" }}>Номер чека</Label>
              <Input
                onChangeText={this.handleInput}
                keyboardType="numeric"
                value={this.inputValue}
              />
            </Item>
            <Button
              style={{ marginTop: 10 }}
              full
              dark
              onPress={this.makeReturn}
              disabled={this.isLoading}
            >
              <Text style={{ fontSize: 25, color: "#ffffff" }}>
                Оформить возврат
              </Text>
              {this.isLoading && <Spinner color="red" />}
            </Button>
          </Body>
        </Content>
        <Toast ref={this.toastRef} />
      </Container>
    );
  }
}

export default MakeReturn;
