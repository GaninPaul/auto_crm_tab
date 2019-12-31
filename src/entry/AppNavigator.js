import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import SaleScreen from "screens/Sale";
import SettingsScreen from "screens/Settings";
import MakeReturnScreen from "screens/MakeReturn";
import ListSalesScreen from "screens/ListSales";
import EntryScreen from "screens/Entry";

const SaleScreenNavigator = createStackNavigator({
  screen: SaleScreen
});

const SettingsScreenNavigator = createStackNavigator({
  screen: SettingsScreen
});

const MakeReturnScreenNavigator = createStackNavigator({
  screen: MakeReturnScreen
});

const ListSalesScreenNavigator = createStackNavigator({
  screen: ListSalesScreen
});

const BottomNavigator = createDrawerNavigator(
  {
    SaleScreen: {
      screen: SaleScreenNavigator,
      navigationOptions: {
        drawerLabel: "Продажа"
      }
    },
    SettingsScreen: {
      screen: SettingsScreenNavigator,
      navigationOptions: {
        drawerLabel: "Управление терминалом"
      }
    },
    MakeReturnScreen: {
      screen: MakeReturnScreenNavigator,
      navigationOptions: {
        drawerLabel: "Отмена продажи"
      }
    },
    ListSalesScreen: {
      screen: ListSalesScreenNavigator,
      navigationOptions: {
        drawerLabel: "Список продаж"
      }
    }
  },
  {
    initialRouteName: "SaleScreen",
    drawerType: "slide",
    overlayColor: 0.8,
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    navigationOptions: {
      header: null
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    EntryScreen,
    BottomNavigator
  },
  {
    initialRouteName: "EntryScreen",
    navigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(AppNavigator);
