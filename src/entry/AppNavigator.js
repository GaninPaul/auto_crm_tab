import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import SaleScreen from "../screens/Sale/Sale";
import SettingsScreen from "../screens/Settings/Settings";
import MakeReturnScreen from "../screens/MakeReturn/MakeReturn";
import ListSalesScreen from "../screens/ListSales/ListSales";
import EntryScreen from "../screens/Entry/Entry";

const BottomNavigator = createDrawerNavigator(
  {
    SaleScreen,
    SettingsScreen,
    MakeReturnScreen,
    ListSalesScreen
  },
  {
    initialRouteName: "SaleScreen",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppNavigator = createDrawerNavigator(
  {
    EntryScreen,
    BottomNavigator
  },
  {
    initialRouteName: "EntryScreen",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(AppNavigator);
