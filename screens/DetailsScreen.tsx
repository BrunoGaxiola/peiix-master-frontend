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
  transaction_id: number;
  authorization_number: string;
  bank: string;
  card_brand: string;
  card_type: string;
  capture_method: string;
  commission: number;
  countercharged: boolean;
  date: string;
  details: string;
  device: string;
  error_detail: string;
  masked_card: string;
  msi: string | null;
  retention: number;
  rejection_code: string;
  subtotal: number;
  surcharge: number;
  tip: number;
  total_amount: number;
  transaction_type: string;
  transaction_status: string;
}

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { item } = route.params;
  const { total_amount, date, device, bank, card_brand } = item;

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

  // Función auxiliar para formatear la fecha
  const formatDateForDisplay = (isoDate: string): string => {
    const dateObj = new Date(isoDate);
    return dateObj.toLocaleString(); // Puedes ajustar el formato según tus necesidades
  };

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
      <Text style={styles.largeAmount}>{`$${item.total_amount.toFixed(2)}`}</Text>

      {/* Contenedor de detalles */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>ID de transacción:</Text>
          <Text style={styles.value}>{item.transaction_id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Banco:</Text>
          <Text style={styles.value}>{item.bank || 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Tipo de tarjeta:</Text>
          <Text style={styles.value}>{item.card_brand || 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{formatDateForDisplay(item.date)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Terminal:</Text>
          <Text style={styles.value}>{item.device || 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Propina:</Text>
          <Text style={styles.value}>{`$${item.tip.toFixed(2)}`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Monto total:</Text>
          <Text style={styles.value}>{`$${item.total_amount.toFixed(2)}`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Tipo de transacción:</Text>
          <Text style={styles.value}>{item.transaction_type || 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Estado de transacción:</Text>
          <Text style={styles.value}>{item.transaction_status || 'N/A'}</Text>
        </View>
        {/* Puedes agregar más campos aquí si lo deseas */}
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
    top: 40, // Ajustado para mejor posicionamiento
    right: 20, // Cambiado a right para mejor UX
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
    fontFamily: 'MontserratSemiBold', // Usando la fuente semi-bold
  },
  largeAmount: {
    fontSize: 60, // Ajustado para mejor visualización
    fontFamily: 'MontserratSemiBold', // Usando la fuente semi-bold
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
    fontFamily: 'MontserratRegular', // Usando la fuente regular
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    flex: 1,
    fontFamily: 'MontserratRegular', // Usando la fuente regular
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
});

export default DetailsScreen;
