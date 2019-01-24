import React from 'react';
import {createStackNavigator} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialHeaderButtons, Item} from '../custom-components/HeaderButton';
const CustomNavOption = (routeName, screen, iconName, drawerLabel, title) => {
  const stack = createStackNavigator(
    {
      [routeName]: {
        screen: screen,
        navigationOptions: (props) =>  ({
          title,
          headerStyle: {
            backgroundColor: "#e57373",
            elevation: 0           
          },
          headerTitleStyle: {
            color: "white"
          },
          headerLeft: (
            <MaterialHeaderButtons>
              <Item buttonStyle={{color: "white"}} title="add" iconName="menu" onPress={() => props.navigation.openDrawer()} />
            </MaterialHeaderButtons>
          ),
        })
      }
    },
    {
      headerMode: "screen"
    }
  )
  return ({
    screen: stack,
    navigationOptions: {
      drawerIcon: () => <MaterialIcons name={iconName} size={24}/>,
      drawerLabel,
      title: title ? title : drawerLabel
    }
  })
}
export default CustomNavOption;
