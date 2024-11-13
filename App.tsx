import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigation/MainStack';

// Peiix-master-frontend main app-
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
