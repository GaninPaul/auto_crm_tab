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
  List,
  Left,
  ListItem,
  Icon
} from "native-base";
import { Alert, View } from "react-native";
import { get } from "../../service/api";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Toast from "react-native-easy-toast";

@observer
class ListSales extends React.Component {
  @observable isLoading = false;
  @observable inputValue = "";
  @observable listSales = [];
  toastRef = React.createRef();
  pageSize = 50;
  page = 1;

  fetch = async () => {
    try {
      const url = `/api/shop/sales/?page%5Bnumber%5D=${
        this.page
      }&page%5Bsize%5D=${this.pageSize}`;
      console.log("url", url);
      const response = await get({
        url
      });
      if (response.results) this.listSales = response.results;
    } catch (e) {
      console.log(e);
    }
  };
  async componentDidMount() {
    await this.fetch();
  }
  backPage = async () => {
    this.page--;
    await this.fetch();
  };

  nextPage = async () => {
    this.page++;
    await this.fetch();
  };

  handleControlPanel = () => {
    const { state, goBack } = this.props.navigation;
    goBack(state.key);
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Title>Список продаж</Title>
          </Left>
          <Right>
            <Button transparent onPress={this.handleControlPanel}>
              <Text>Закрыть </Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Body style={{ width: "100%" }}>
            <List>
              {this.listSales.map((item, index) => (
                <ListItem key={index}>
                  <Text>
                    {item.id} {JSON.stringify(item)}
                  </Text>
                </ListItem>
              ))}
            </List>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                disabled={this.page <= 1}
                iconLeft
                light
                onPress={this.backPage}
              >
                <Icon name="arrow-back" />
                <Text>Back</Text>
              </Button>
              <Button iconRight light onPress={this.nextPage}>
                <Text>Next</Text>
                <Icon name="arrow-forward" />
              </Button>
            </View>
          </Body>
        </Content>
        <Toast ref={this.toastRef} />
      </Container>
    );
  }
}

export default ListSales;
