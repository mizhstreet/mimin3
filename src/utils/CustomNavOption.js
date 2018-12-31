import React from 'react';
import {TouchableNativeFeedback, View, StyleSheet} from 'react-native';
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
          headerLeft: (
            <MaterialHeaderButtons>
              <Item title="add" iconName="menu" onPress={() => props.navigation.openDrawer()} />
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
