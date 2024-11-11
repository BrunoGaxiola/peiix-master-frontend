import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
import TerminalesPage from './screens/TerminalesPage';
import MainNavigationContainer from './navigation/MainNavigationContainer';
import Header from './components/Header';
import LogOutScreen from './screens/LogOutScreen';
//import MainStack from './navigation/MainStack';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigation/MainStack';

export default function App() {
  return (
  <NavigationContainer>
    <MainStack/>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
