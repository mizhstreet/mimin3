import React from 'react';
import { Button, View, Text } from 'react-native';
import {createAppContainer } from 'react-navigation';
import DrawerNavigator from './navigators/DrawerNavigator';
import {Provider} from 'unstated';

const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends React.Component {
  render() {
    return(
      <Provider>
        <AppContainer />
      </Provider>
    )
  }
}
