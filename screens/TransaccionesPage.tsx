import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Placeholder para la página de Transacciones.
const TransaccionesPage = () => {
    return (
        <SafeAreaView style ={styles.container}>
            <Text>Página de Transacciones!</Text>
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
  });

export default TransaccionesPage;