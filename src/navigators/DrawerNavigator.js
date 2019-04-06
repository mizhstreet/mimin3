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
      "Unit 1-Danh từ A"
    ),
    UnitTwoScreen: CustomNavOption(
      "UnitTwoScreen",
      UnitScreen(120, 220),
      "book",
      "Unit 2",
      "Unit 2-Động từ A"
    ),
    UnitThreeScreen: CustomNavOption(
      "UnitThreeScreen",
      UnitScreen(258, 298),
      "book",
      "Unit 3",
      "Unit 3-Tính từ A"
    ),
    UnitFourScreen: CustomNavOption(
      "UnitFourScreen",
      UnitScreen(310, 410),
      "book",
      "Unit 4",
      "Unit 4-Danh từ B"
    ),
    UnitFiveScreen: CustomNavOption(
      "UnitFiveScreen",
      UnitScreen(410, 510),
      "book",
      "Unit 5",
      "Unit 5-Động từ B"
    ),
    UnitSixScreen: CustomNavOption(
      "UnitSixScreen",
      UnitScreen(510, 550),
      "book",
      "Unit 6",
      "Unit 6-Katakana A"
    ),
    UnitSevenScreen: CustomNavOption(
      "UnitSevenScreen",
      UnitScreen(550, 590),
      "book",
      "Unit 7",
      "Unit 7-Tính từ B"
    ),
    UnitEightScreen: CustomNavOption(
      "UnitEightScreen",
      UnitScreen(590, 635),
      "book",
      "Unit 8",
      "Unit 8-Phó từ A"
    ),
    UnitNineScreen: CustomNavOption(
      "UnitNineScreen",
      UnitScreen(635, 715),
      "book",
      "Unit 9",
      "Unit 9-Danh từ C"
    ),
    UnitTenScreen: CustomNavOption(
      "UnitTenScreen",
      UnitScreen(715, 795),
      "book",
      "Unit 10",
      "Unit 10-Động từ C"
    ),
    UnitElevenScreen: CustomNavOption(
      "UnitElevenScreen",
      UnitScreen(795, 835),
      "book",
      "Unit 11",
      "Unit 11-Katakana B"
    ),
    UnitTwelveScreen: CustomNavOption(
      "UnitTwelveScreen",
      UnitScreen(845, 880),
      "book",
      "Unit 11",
      "Unit 12-Phó từ, liên từ"
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
    ),
    MatomeThreeScreen: CustomNavOption(
      "MatomeThreeScreen",
      UnitScreen(835, 845),
      "book",
      "Matome 3",
      "Matome 3"
    )
  },
  {
    contentComponent: DrawerContent,
    navigationOptions: {
      drawerLockMode: "locked-closed",
      headerMode: "screen"
    },
    initialRouteName: "UnitOneScreen",
    contentOptions: {
      activeTintColor: "#e57373"
    }
  }
);
export default DrawerNavigator;
