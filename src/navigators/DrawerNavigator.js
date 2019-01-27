import {createDrawerNavigator} from 'react-navigation';
// component
import DrawerContent from '../custom-components/DrawerContent';
import UnitOneScreen from '../screens/UnitOneScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import {UnitScreen} from '../custom-components/UnitScreen';
//util
import CustomNavOption from '../utils/CustomNavOption';


const DrawerNavigator = createDrawerNavigator(
  {
    SearchScreen: CustomNavOption("SearchScreen",SearchScreen, "search", "Tìm kiếm","Tìm kiếm"),
    FavoriteScreen: CustomNavOption("FavoriteScreen",FavoriteScreen, "favorite", "Từ vựng yêu thích","Từ vựng yêu thích"),
    UnitOneScreen: CustomNavOption("UnitOneScreen",UnitScreen(0,2), "book", "Unit 1","Unit 1"),
    UnitTwoScreen: CustomNavOption("UnitTwoScreen",UnitScreen(6,70), "book", "Unit 2","Unit 2")
  },
  {
    contentComponent: DrawerContent,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      headerMode: 'screen',
      headerStyle: {
        backgroundColor: 'red'
      }
    },
    initialRouteName: "UnitOneScreen"
  }
)
export default DrawerNavigator;
