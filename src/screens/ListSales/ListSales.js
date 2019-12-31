import React from "react";
import { ScrollView, View, Text } from "react-native";
import { get } from "service/api";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Toast from "react-native-easy-toast";
import { defaultNavigationOptions } from "entry/utils";
import styles from "./ListSales.styles";
import RoundButton from "components/RoundButton";
import { BUTTONS_SIZES } from "utils/constants";

@observer
class ListSales extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Список продаж",
    ...defaultNavigationOptions(navigation)
  });

  @observable isLoading = false;
  @observable inputValue = "";
  @observable listSales = [];
  toastRef = React.createRef();
  pageSize = 50;
  page = 1;

  fetch = async () => {
    try {
      this.isLoading = true;
      const url = `/api/shop/sales/?page%5Bnumber%5D=${this.page}&page%5Bsize%5D=${this.pageSize}`;
      console.log("url", url);
      const response = await get({
        url
      });
      if (response.results) this.listSales = response.results;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
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
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View>
            <View style={styles.header}>
              <Text style={styles.headerId}>№</Text>
              <Text style={styles.headerWhen}>Когда</Text>
              <Text style={styles.headerPrice}>Сумма</Text>
            </View>
            {this.listSales.map((item, index) => (
              <View key={index} style={styles.header}>
                <Text style={styles.headerId}>{item.id}</Text>
                <Text style={styles.headerWhen}>{item.time}</Text>
                <Text style={styles.headerPrice}>{item.price}</Text>
              </View>
            ))}
          </View>
          <View style={styles.paginationWrapper}>
            <RoundButton
              title="<- Сюда"
              onPress={this.backPage}
              isLoading={this.isLoading}
              disabled={this.isLoading && this.page <= 1}
              style={styles.button}
              size={BUTTONS_SIZES.SMALL}
            />
            <RoundButton
              title="Туда ->"
              onPress={this.nextPage}
              isLoading={this.isLoading}
              disabled={this.isLoading}
              style={styles.button}
              size={BUTTONS_SIZES.SMALL}
            />
          </View>
        </ScrollView>
        <Toast ref={this.toastRef} />
      </View>
    );
  }
}

export default ListSales;
