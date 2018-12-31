import {createStackNavigator} from 'react-navigation';
import UnitOneScreen from '../screens/UnitOneScreen'
const UnitOneStack = createStackNavigator(
  {
    UnitOneScreen: UnitOneScreen
  }
)
export default UnitOneStack;
