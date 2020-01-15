import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { HeaderButton, HeaderButtons } from "react-navigation-header-buttons";

const MaterialHeaderButton: React.FC<any> = props => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} />
);

export const MaterialHeaderButtons: React.FC<any> = props => (
  <HeaderButtons
    HeaderButtonComponent={MaterialHeaderButton}
    OverflowIcon={<MaterialIcons name="more-vert" size={23} color="white" />}
    {...props}
  />
);
export const { Item } = HeaderButtons;
