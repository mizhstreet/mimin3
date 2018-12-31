import {createStackNavigator} from 'react-navigation';
import React from 'react';
import {Button} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerLeft: (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#fff"
          />
        ),
      }
    }
  }
)
export default StackNavigator;
