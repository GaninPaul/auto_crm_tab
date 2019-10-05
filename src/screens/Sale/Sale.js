import React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Picker
} from "native-base";
import { Alert, View, FlatList, DrawerLayoutAndroid } from "react-native";
import { observer } from "mobx-react";
import { computed, observable } from "mobx";
import ItemSale from "./components/ItemSale/ItemSale";
import ItemsSales from "store/ItemsSales";
import Toast from "react-native-easy-toast";
import Logs from "store/Logs";

@observer
class Sale extends React.Component<{ navigation: Object }> {
  @observable validation = false;
  @observable categoryValue = 1;
  @observable isLoading = false;
  toastRef = React.createRef();
  drawerRef = React.createRef();

  @computed
  get items() {
    return [...ItemsSales.products];
  }

  @computed
  get totalAmount() {
    return ItemsSales.totalAmount || "0";
  }

  @computed
  get isOpenCheckBox() {
    return Logs.isOpenCheckBox;
  }

  showAlert = () => {
    Alert.alert(
      "Очистить чек",
      "Это не обратимое действие",
      [
        {
          text: "Да",
          onPress: this.cleanItems
        },
        {
          text: "Нет",
          onPress: () => {},
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  cleanItems = () => {
    ItemsSales.clearProduct();
  };

  onSelectedValueChange = value => {
    this.categoryValue = value;
  };

  addItem = () => {
    ItemsSales.addProduct({ category: this.categoryValue });
  };

  makeSale = async () => {
    try {
      this.isLoading = true;
      if (ItemsSales.isValid()) {
        return;
      }
      await ItemsSales.saleProducts();
      this.toastRef.current.show("Продано!");
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

  handleControlPanel = () => {
    this.drawerRef.current.openDrawer();
    //this.props.navigation.navigate("SettingsScreen");
  };

  renderPlaceholder = () => {
    return (
      <Content>
        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 30, color: "#d50000" }}>Касса закрыта!</Text>
        </View>
      </Content>
    );
  };

  renderContent = () => {
    return (
      <React.Fragment>
        <Content>
          <View>
            <Picker
              headerBackButtonText="Отмена"
              iosHeader="Выбор категрии"
              mode="dropdown"
              placeholder="КАТЕГОРИЯ"
              note={false}
              style={{ width: 320 }}
              selectedValue={this.categoryValue}
              onValueChange={this.onSelectedValueChange}
              textStyle={{ fontSize: 25 }}
            >
              <Picker.Item style={{ fontSize: 25 }} label="Оптика" value={2} />
              <Picker.Item
                style={{ fontSize: 25 }}
                label="Лампочки"
                value={1}
              />
              <Picker.Item
                style={{ fontSize: 25 }}
                label="Отрезные"
                value={3}
              />
              <Picker.Item
                style={{ fontSize: 25 }}
                label="Перчатки"
                value={4}
              />
              <Picker.Item
                style={{ fontSize: 25 }}
                label="Инструменты"
                value={5}
              />
            </Picker>
            <Button full success onPress={this.addItem}>
              <Text style={{ fontSize: 25, color: "#ffffff" }}>+</Text>
            </Button>
          </View>
          <FlatList
            data={this.items}
            extraData={this.items}
            renderItem={item => (
              <ItemSale key={item.index} index={item.index} item={item.item} />
            )}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Left>
              <Button
                rounded
                danger
                style={{ marginLeft: 4 }}
                onPress={this.makeSale}
              >
                <Text style={{ fontSize: 25 }}>Продать</Text>
              </Button>
            </Left>
            <Right style={{ marginRight: 6 }}>
              <Text style={{ color: "#ffffff", fontSize: 25 }}>
                Итого: {this.totalAmount} руб.
              </Text>
            </Right>
          </FooterTab>
        </Footer>
      </React.Fragment>
    );
  };
  navigationView = () => (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={{ margin: 10, fontSize: 15, textAlign: "left" }}>
        I'm in the Drawer!
      </Text>
    </View>
  );
  render() {
    return (
      <DrawerLayoutAndroid
        ref={this.drawerRef}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.navigationView}
        keyboardDismissMode
      >
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.handleControlPanel}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Продажа</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.showAlert}>
                <Text>Очистить </Text>
              </Button>
            </Right>
          </Header>
          {this.isOpenCheckBox
            ? this.renderContent()
            : this.renderPlaceholder()}
          <Toast ref={this.toastRef} />
        </Container>
      </DrawerLayoutAndroid>
    );
  }
}

export default Sale;
