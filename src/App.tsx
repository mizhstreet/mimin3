import * as React from "react";
import { createAppContainer } from "react-navigation";
import { Provider } from "unstated";
import Modal from "./components/Modal";
import DrawerNavigator from "./navigators/DrawerNavigator";

const AppContainer = createAppContainer(DrawerNavigator);

export default () => (
  <Provider>
    <AppContainer />
    <Modal />
  </Provider>
);
