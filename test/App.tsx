import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Users from './src/pages/Users';
import Wifi from './src/pages/Wifi';
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Users} />
        <Drawer.Screen name="About" component={Wifi} />
      </Drawer.Navigator>

    </NavigationContainer>
  );
}

export default App;
