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
      "UnitThreeScreen",
      UnitScreen(258, 298),
      "book",
      "Unit 3",
      "Unit 3"
    ),
    UnitFourScreen: CustomNavOption(
      "UnitFourScreen",
      UnitScreen(310, 410),
      "book",
      "Unit 4",
      "Unit 4"
    ),
    UnitFiveScreen: CustomNavOption(
      "UnitFiveScreen",
      UnitScreen(410, 510),
      "book",
      "Unit 5",
      "Unit 5"
    ),
    UnitSixScreen: CustomNavOption(
      "UnitSixScreen",
      UnitScreen(510, 550),
      "book",
      "Unit 6",
      "Unit "
    ),
    UnitSevenScreen: CustomNavOption(
      "UnitSevenScreen",
      UnitScreen(550, 590),
      "book",
      "Unit 7",
      "Unit 7"
    ),
    UnitEightScreen: CustomNavOption(
      "UnitEightScreen",
      UnitScreen(590, 635),
      "book",
      "Unit 8",
      "Unit 8"
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
