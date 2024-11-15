// screens/DetailsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import * as Font from 'expo-font';

// Define the type for your navigation stack
type RootStackParamList = {
  Transacciones: undefined;
  Details: { item: Transaction };
};

// Define the navigation prop type for DetailsScreen
type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

// Define the route prop type for DetailsScreen
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

// Combine navigation and route props
type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

// Define the Transaction type
interface Transaction {
  id: string;
  amount: string;
  date: string;
  terminal: string;
  bank: string;
  cardType: string;
}

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { item } = route.params;
  const { amount, date, terminal, bank, cardType } = item;

  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
          MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botón de cerrar */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Monto grande */}
      <Text style={styles.largeAmount}>{amount}</Text>

      {/* Contenedor de detalles */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>ID de transacción:</Text>
          <Text style={styles.value}>{item.id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Banco:</Text>
          <Text style={styles.value}>{bank}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Tipo de tarjeta:</Text>
          <Text style={styles.value}>{cardType}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Terminal:</Text>
          <Text style={styles.value}>{terminal}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Propina:</Text>
          <Text style={styles.value}>$0</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Monto total:</Text>
          <Text style={styles.value}>{amount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Tipo de transacción:</Text>
          <Text style={styles.value}>Venta</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Estado de transacción:</Text>
          <Text style={styles.value}>rechazadaProsa</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  closeButton: {
    position: 'absolute',
    top: 40, // Adjusted for better positioning
    right: 20, // Changed to right for better UX
    backgroundColor: '#333',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'MontserratSemiBold', // Using the semi-bold font
  },
  largeAmount: {
    fontSize: 60, // Adjusted for better display
    fontFamily: 'MontserratSemiBold', // Using the semi-bold font
    color: '#000',
    marginTop: 80,
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 30,
    width: '90%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    fontFamily: 'MontserratRegular', // Using the regular font
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    flex: 1,
    fontFamily: 'MontserratRegular', // Using the regular font
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
});

export default DetailsScreen;
