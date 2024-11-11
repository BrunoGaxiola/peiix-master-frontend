import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import TransaccionesPage from "../screens/TransaccionesPage";
import TerminalesPage from "../screens/TerminalesPage";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Header from "../components/Header";

const Tab = createBottomTabNavigator();

function MainNavigationContainer() {
  return (
    <Tab.Navigator
    initialRouteName='Transacciones'
    screenOptions={{
      header: ({ navigation }) => {
        return <Header navigation={navigation} />
      },
      tabBarStyle: {
        backgroundColor: '#000000',
        height: 96,
        position: 'absolute',
        paddingTop: 10
      },
      tabBarActiveTintColor: '#0E9600',
      tabBarInactiveTintColor: '#FFFFFF',
      tabBarLabelStyle: {
        fontFamily: 'Montserrat',
        fontSize: 15
      }
    }}
    >
      <Tab.Screen 
      name='Transacciones'
      component={TransaccionesPage}
      options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome name="money" color={focused ? '#0E9600' : '#FFFFFF'} size={30} />
        ),
      }}
      />
      <Tab.Screen 
      name='Terminales' 
      component={TerminalesPage} 
      options={{
        tabBarIcon: ({ focused }) => (
          <Fontisto name="shopping-pos-machine" color={focused ? '#0E9600' : '#FFFFFF'} size={30} />
        ),
      }}
      />
    </Tab.Navigator>
  );
}

export default MainNavigationContainer;