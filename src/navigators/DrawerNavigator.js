import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons';
// component
import StackNavigator from './StackNavigator';
import DrawerContent from '../custom-components/DrawerContent';
import UnitOneScreen from '../screens/UnitOneScreen';
import HomeScreen from '../screens/HomeScreen';
import UnitOneStack from './UnitOneStack'
//util
import CustomNavOption from '../utils/CustomNavOption';


const DrawerNavigator = createDrawerNavigator(
  {
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
  }
)
export default DrawerNavigator;
