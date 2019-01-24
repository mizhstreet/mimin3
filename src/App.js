import React from "react";
import { createAppContainer } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import DrawerNavigator from "./navigators/DrawerNavigator";
import { Provider, Subscribe } from "unstated";
import WordStateContainer from "./state-containers/WordStateContainer";
const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider>
        {/* <Subscribe to={[WordStateContainer]}>
          {container => {
            if (container.state.storageIsInitialized) {
              return ;
            } else {
              container.initializeStorage();
              return <Spinner />;
            }
          }}
        </Subscribe> */}
        <AppContainer />
      </Provider>
    );
  }
}
