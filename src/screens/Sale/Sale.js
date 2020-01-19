import React from "react";
import {Alert, FlatList, Picker, ScrollView, Text, View} from "react-native";
import {observer} from "mobx-react";
import {computed, observable} from "mobx";
import ItemSale from "./components/ItemSale/ItemSale";
import ItemsSales from "store/ItemsSales";
import Toast from "react-native-easy-toast";
import Logs from "store/Logs";
import styles from "./Sale.styles";
import RoundButton from "components/RoundButton";
import {defaultNavigationOptions} from "entry/utils";
import ClearButton from "./components/ClearButton";

@observer
class Sale extends React.Component<{ navigation: Object }> {
  static navigationOptions = ({ navigation }) => {
    function showAlert() {
      Alert.alert(
        "Очистить чек",
        "Это не обратимое действие",
        [
          {
            text: "Да",
            onPress: () => ItemsSales.clearProduct()
          },
          {
            text: "Нет",
            onPress: () => {},
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
    return {
      title: "Продажа",
      ...defaultNavigationOptions(navigation),
      headerRight: <ClearButton onPress={showAlert} />
    };
  };

  @observable validation = false;
  @observable categoryValue = 1;
  @observable isLoading = false;
  toastRef = React.createRef();
  scrollViewRef = React.createRef();

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
    return !Logs.isOpenCheckBox;
  }

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
    this.props.navigation.navigate("SettingsScreen");
  };

  renderPlaceholder = () => {
    return (
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ fontSize: 30, color: "#d50000" }}>Касса закрыта!</Text>
      </View>
    );
  };

  renderFooter() {
    return (
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <RoundButton
            style={{ marginLeft: 4 }}
            onPress={this.makeSale}
            title="Продать"
          />
        </View>
        <View style={styles.footerRight}>
          <Text style={{ color: "#ffffff", fontSize: 25 }}>
            Итого: {this.totalAmount} руб.
          </Text>
        </View>
      </View>
    );
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View
          style={{
            height: 50,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "red"
          }}
        >
          <Picker
            headerBackButtonText="Отмена"
            iosHeader="Выбор категрии"
            mode="dropdown"
            placeholder="КАТЕГОРИЯ"
            note={false}
            style={{ width: 220 }}
            selectedValue={this.categoryValue}
            onValueChange={this.onSelectedValueChange}
            textStyle={{ fontSize: 25 }}
          >
            <Picker.Item style={{ fontSize: 25 }} label="Оптика" value={2} />
            <Picker.Item style={{ fontSize: 25 }} label="Лампочки" value={1} />
            <Picker.Item style={{ fontSize: 25 }} label="Отрезные" value={3} />
            <Picker.Item style={{ fontSize: 25 }} label="Перчатки" value={4} />
            <Picker.Item
              style={{ fontSize: 25 }}
              label="Инструменты"
              value={5}
            />
          </Picker>
        </View>
        <View
          style={{
            marginLeft: "auto",
            marginTop: "auto",
            marginBottom: "auto"
          }}
        >
          <RoundButton onPress={this.addItem} title="Добавить" />
        </View>
      </View>
    );
  };
  renderContent = () => {
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={this.items}
          extraData={this.items}
          renderItem={item => (
            <ItemSale key={item.index} index={item.index} item={item.item} />
          )}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView
          ref={this.scrollViewRef}
          style={styles.content}
          onContentSizeChange={() => {
            this.scrollViewRef.current.scrollToEnd({ animated: true });
          }}
        >
          {!this.isOpenCheckBox
            ? this.renderContent()
            : this.renderPlaceholder()}
          <Toast ref={this.toastRef} />
        </ScrollView>
        {this.renderFooter()}
      </View>
    );
  }
}

export default Sale;
