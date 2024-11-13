import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TransaccionesPage from "../screens/TransaccionesPage";
import TerminalesPage from "../screens/TerminalesPage";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Header from "../components/Header";
import * as Font from 'expo-font'
import { useState, useEffect } from 'react';

// Componente con las pestañas de la aplicación principal.
const Tab = createBottomTabNavigator();

// Pestañas de la aplicación principal.
function MainNavigationContainer() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
      async function loadFonts() {
      await Font.loadAsync({
          MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
      });
      setFontsLoaded(true);
      }
      loadFonts();
  }, []);

  if (!fontsLoaded) {
      return null;
  }
  return (
    <Tab.Navigator
    initialRouteName='Transacciones' // Al entrar a la app, esta pestaña siempre será la primera en aparecer.
    // Estilos de la barra de pestañaas.
    screenOptions={{
      header: ({ navigation }) => {
        return <Header navigation={navigation} />
      },
      tabBarStyle: {
        backgroundColor: '#000000',
        height: 96,
        position: 'absolute',
        paddingTop: 10,
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
          <FontAwesome name="money" color={focused ? '#0E9600' : '#FFFFFF'} size={30} /> // Ícono de dinero.
        ),
      }}
      />
      <Tab.Screen 
      name='Terminales' 
      component={TerminalesPage} 
      options={{
        tabBarIcon: ({ focused }) => (
          <Fontisto name="shopping-pos-machine" color={focused ? '#0E9600' : '#FFFFFF'} size={30} /> // Ícono de terminal.
        ),
      }}
      />
    </Tab.Navigator>
  );
}

export default MainNavigationContainer;