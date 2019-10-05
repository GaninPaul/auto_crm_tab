import React from "react";
import { Left, Right, Item, Label, Input, Text, Icon } from "native-base";
import { View, TouchableOpacity, Alert } from "react-native";
import { observer } from "mobx-react";
import { observable } from "mobx";
import ItemsSales from "../../../../store/ItemsSales";
import { CATEGORIES } from "../../../../utils/constants";

@observer
class ItemSale extends React.Component {
  @observable inputValue = "";
  oldValue = "";
  inputValidation = text => {
    function IsNumeric(input) {
      let RE = /^\d*\.?\d+$/g;
      return RE.test(input);
    }
    if (IsNumeric(text) || text === "") {
      this.inputValue = text;
      ItemsSales.editProduct(
        { product: this.props.item.product, price: this.inputValue },
        this.props.index
      );
    }
  };

  deleteRow = () => {
    ItemsSales.deleteProduct(this.props.index);
  };

  showAlert = () => {
    Alert.alert(
      "Убрать товар?",
      "Это не обратимое действие",
      [
        {
          text: "Да",
          onPress: this.deleteRow
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

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingVertical: 7,
          paddingHorizontal: 5,
          justifyContent: "center",
          borderBottomColor: "#B4B4B4",
          borderBottomWidth: 2
        }}
      >
        <Left>
          <View
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            <View style={{ marginVertical: 30 }}>
              <TouchableOpacity onPress={() => this.showAlert()}>
                <Icon name="trash" />
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 30, marginLeft: 50 }}>
              <Text style={{ fontSize: 20 }}>
                {CATEGORIES.get(this.props.item.product)}
              </Text>
            </View>
          </View>
        </Left>
        <Right style={{ marginBottom: 10, marginTop: 0 }}>
          <Item stackedLabel style={{ width: "100%" }} error={!this.isValid}>
            <Label>Цена</Label>
            <Input
              onChangeText={this.inputValidation}
              keyboardType="numeric"
              value={this.inputValue}
            />
          </Item>
        </Right>
      </View>
    );
  }
}

export default ItemSale;
