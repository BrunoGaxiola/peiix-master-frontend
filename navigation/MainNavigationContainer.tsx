import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import TransaccionesPage from "../screens/TransaccionesPage";
import TerminalesPage from "../screens/TerminalesPage";

const Tab = createBottomTabNavigator();

function MainNavigationContainer() {
  return (
    <Tab.Navigator
    initialRouteName='Transacciones'
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#000000',
        height: 96,
        position: 'absolute',
      }
    }}
    >
      <Tab.Screen name='Transacciones'component={TransaccionesPage} />
      <Tab.Screen name='Terminales' component={TerminalesPage} />
    </Tab.Navigator>
  );
}

export default MainNavigationContainer;