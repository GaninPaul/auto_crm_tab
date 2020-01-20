import React from "react";
import {createAppContainer, createDrawerNavigator, createStackNavigator} from "react-navigation";
import SaleScreen from "screens/Sale";
import SettingsScreen from "screens/Settings";
import MakeReturnScreen from "screens/MakeReturn";
import ListSalesScreen from "screens/ListSales";
import EntryScreen from "screens/Entry";
import ProductsListScreen from "screens/ProductsList";
import AddProductScreen from "screens/AddProduct";

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

const ProductsListScreenNavigator = createStackNavigator({
  screen: ProductsListScreen
});

const AddProductScreenNavigator = createStackNavigator({
  screen: AddProductScreen
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
    },
    ProductsListScreen: {
      screen: ProductsListScreenNavigator,
      navigationOptions: {
        drawerLabel: "Список товаров"
      }
    },
    AddProductScreen: {
      screen: AddProductScreenNavigator,
      navigationOptions: {
        drawerLabel: "Добавить товар"
      }
    }
  },
  {
    initialRouteName: "SaleScreen",
    drawerType: "slide",
    backBehavior: "initialRoute",
    overlayColor: 0.8,
    contentOptions: {
      activeTintColor: "#e91e63",
      activeBackgroundColor: "rgba(129,129,129,0.47)"
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
