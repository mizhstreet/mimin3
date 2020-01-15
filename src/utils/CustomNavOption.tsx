import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialHeaderButtons, Item } from "../custom-components/HeaderButton";
import { NavigationDrawerOptions } from "react-navigation-drawer";

const CustomNavOption = (
  routeName: string,
  screen: React.ComponentType,
  iconName: string,
  drawerLabel: string,
  title: string
) => {
  const stack = createStackNavigator(
    {
      [routeName]: {
        screen,
        navigationOptions: props => ({
          title,
          headerStyle: {
            backgroundColor: "#e57373",
            elevation: 0
          },
          headerTitleStyle: {
            color: "white"
          },
          headerLeft: () => (
            <MaterialHeaderButtons>
              <Item
                buttonStyle={{ color: "white" }}
                title="add"
                iconName="menu"
                onPress={() => props.navigation.openDrawer()}
              />
            </MaterialHeaderButtons>
          )
        })
      }
    },
    {
      headerMode: "screen"
    }
  );
  return {
    screen: stack,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name={iconName} size={24} color={tintColor} />
      ),
      drawerLabel,
      title
    } as NavigationDrawerOptions
  };
};
export default CustomNavOption;
