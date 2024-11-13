import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from 'expo-font'
import { useState, useEffect } from 'react';

// Placeholder para la página de Terminales.
const TerminalesPage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
      async function loadFonts() {
      await Font.loadAsync({
          MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
          MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
      });
      setFontsLoaded(true);
      }
      loadFonts();
  }, []);

  if (!fontsLoaded) {
      return null;
  }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Página de Terminales!</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontFamily: 'MontserratRegular'
    }
  });

export default TerminalesPage;