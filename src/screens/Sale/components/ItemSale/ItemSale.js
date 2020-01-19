import React from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react";
import {observable} from "mobx";
import ItemsSales from "store/ItemsSales";
import {CATEGORIES} from "utils/constants";
import Input from "components/Input";
import TrashIcon from "components/Icons/TrashIcon";

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
        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        >
          <View style={{ marginVertical: 30 }}>
            <TouchableOpacity onPress={() => this.showAlert()}>
              <TrashIcon onPress={() => {}} />
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 30, marginLeft: 50 }}>
            <Text style={{ fontSize: 20 }}>
              {CATEGORIES.get(this.props.item.product)}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 10, marginTop: 0 }}>
          <View
            stackedLabel
            style={{ width: 150, height: 70 }}
            error={!this.isValid}
          >
            <Text>Цена</Text>
            <Input
              onChangeText={this.inputValidation}
              inputProps={{ keyboardType: "numeric" }}
              value={this.inputValue}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ItemSale;
