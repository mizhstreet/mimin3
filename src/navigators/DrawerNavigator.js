import { createDrawerNavigator } from "react-navigation";
// component
import DrawerContent from "../custom-components/DrawerContent";
import SearchScreen from "../screens/SearchScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import UnitScreen from "../screens/UnitScreen";
// util
import CustomNavOption from "../utils/CustomNavOption";

const DrawerNavigator = createDrawerNavigator(
  {
    SearchScreen: CustomNavOption(
      "SearchScreen",
      SearchScreen,
      "search",
      "Tìm kiếm",
      "Tìm kiếm"
    ),
    FavoriteScreen: CustomNavOption(
      "FavoriteScreen",
      FavoriteScreen,
      "favorite",
      "Từ vựng yêu thích",
      "Từ vựng yêu thích"
    ),
    UnitOneScreen: CustomNavOption(
      "UnitOneScreen",
      UnitScreen(0, 120),
      "book",
      "Unit 1",
      "Unit 1"
    ),
    UnitTwoScreen: CustomNavOption(
      "UnitTwoScreen",
      UnitScreen(120, 220),
      "book",
      "Unit 2",
      "Unit 2"
    ),
    UnitThreeScreen: CustomNavOption(
      "UnitTwoScreen",
      UnitScreen(258, 298),
      "book",
      "Unit 3",
      "Unit 3"
    ),
    UnitFourScreen: CustomNavOption(
      "UnitTwoScreen",
      UnitScreen(311, 409),
      "book",
      "Unit 4",
      "Unit 4"
    ),
    MatomeOneScreen: CustomNavOption(
      "UnitTwoScreen",
      UnitScreen(220, 258),
      "book",
      "Matome 1",
      "Danh động từ"
    ),
    MatomeTwoScreen: CustomNavOption(
      "UnitTwoScreen",
      UnitScreen(298, 310),
      "book",
      "Matome 2",
      "Matome 2"
    )
  },
  {
    contentComponent: DrawerContent,
    navigationOptions: {
      drawerLockMode: "locked-closed",
      headerMode: "screen"
    },
    initialRouteName: "UnitOneScreen"
  }
);
export default DrawerNavigator;
