import React from 'react';
import {createDrawerNavigator} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons';
// component
import DrawerContent from '../custom-components/DrawerContent';
import UnitOneScreen from '../screens/UnitOneScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
//util
import CustomNavOption from '../utils/CustomNavOption';


const DrawerNavigator = createDrawerNavigator(
  {
    SearchScreen: CustomNavOption("SearchScreen",SearchScreen, "search", "Tìm kiếm","Tìm kiếm"),
    HomeScreen: CustomNavOption("HomeScreen", HomeScreen, "home", "Home", "Home"),
    UnitOneScreen: CustomNavOption("UnitOneScreen",UnitOneScreen, "book", "Unit 1","Unit 1")
  },
  {
    contentComponent: DrawerContent,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      headerMode: 'screen',
      headerStyle: {
        backgroundColor: 'red'
      }
    },
    initialRouteName: "SearchScreen"
  }
)
export default DrawerNavigator;
