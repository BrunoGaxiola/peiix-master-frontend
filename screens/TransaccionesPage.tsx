// TransaccionesPage.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import ExportButton from '../components/ExportButton';
import FilterButton from '../components/FilterButton';
import { apiFetch } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the type for your navigation stack
type RootStackParamList = {
  Transacciones: undefined;
  Details: { item: Transaction };
};

// Define the navigation prop type for TransaccionesPage
type TransaccionesPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Transacciones'
>;

// Define the route prop type for TransaccionesPage if needed
type TransaccionesPageRouteProp = RouteProp<RootStackParamList, 'Transacciones'>;

// Combine navigation and route props
type Props = {
  navigation: TransaccionesPageNavigationProp;
  route: TransaccionesPageRouteProp;
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

// Define the Filters type acorde a los requisitos
interface Filters {
  bank?: string;
  card_type?: string;
  transaction_status?: string;
  dateFrom?: string; // Formato: YYYY-MM-DD
  dateTo?: string;   // Formato: YYYY-MM-DD
}

const { width } = Dimensions.get('window');

const TransaccionesPage: React.FC<Props> = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [allData, setAllData] = useState<Transaction[]>([]); // Almacena todas las transacciones
  const [filteredData, setFilteredData] = useState<Transaction[]>([]); // Almacena las transacciones filtradas
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({}); // Estado para los filtros

  useEffect(() => {
    const loadFontsAndData = async () => {
      try {
        // Cargar fuentes
        await Font.loadAsync({
          MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
          MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
        });
        setFontsLoaded(true);

        // Obtener todas las transacciones
        fetchAllTransactions();
      } catch (error) {
        console.error('Error loading fonts or data:', error);
      }
    };
    loadFontsAndData();
  }, []);

    // Función auxiliar para formatear el estado de la transacción
    const formatTransactionStatus = (status: string): string => {
      if (status.toLowerCase().includes('rechazada')) {
        return 'Rechazada';
      }
      // Puedes añadir más condiciones aquí para otros estados si lo deseas
      // Por ejemplo:
      // if (status.toLowerCase().includes('aprobada')) {
      //   return 'Aprobada';
      // }
      return capitalizeFirstLetter(status);
    };


// Función auxiliar para capitalizar la primera letra
const capitalizeFirstLetter = (text: string): string => {
  if (text.length === 0) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};
  

  // Función para obtener todas las transacciones
  const fetchAllTransactions = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const params: any = {
        dateFrom: '2000-01-01 00:00:00', // Fecha mínima
        dateTo: '2024-11-11 23:59:59',   // Fecha máxima para incluir 2024
        size: 100, // Asignar un tamaño suficientemente grande para obtener todas las transacciones
        page: 1,    // Iniciar en la primera página
      };

      const responseData = await apiFetch('/transactions', {
        method: 'GET',
        params,
      });

      // Mapear los datos de la respuesta al tipo Transaction
      const fetchedTransactions: Transaction[] = responseData.data.map((item: any) => ({
        transaction_id: item.transaction_id,
        authorization_number: item.authorization_number,
        bank: item.bank,
        card_brand: item.card_brand,
        card_type: item.card_type,
        capture_method: item.capture_method,
        commission: item.commission,
        countercharged: item.countercharged,
        date: item.date,
        details: item.details,
        device: item.device,
        error_detail: item.error_detail,
        masked_card: item.masked_card,
        msi: item.msi,
        retention: item.retention,
        rejection_code: item.rejection_code,
        subtotal: item.subtotal,
        surcharge: item.surcharge,
        tip: item.tip,
        total_amount: item.total_amount,
        transaction_type: item.transaction_type,
        transaction_status: item.transaction_status,
      }));

      setAllData(fetchedTransactions);
      setFilteredData(fetchedTransactions);
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      Alert.alert('Error', error.message || 'No se pudo cargar las transacciones.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Función para manejar la aplicación de filtros
  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // Función para aplicar filtros localmente
  const applyFilters = (filters: Filters) => {
    const { bank, card_type, transaction_status, dateFrom, dateTo } = filters;

    const filtered = allData.filter((transaction) => {
      // Filtrar por bank
      const bankMatch = bank ? transaction.bank === bank : true;

      // Filtrar por card_type
      const cardTypeMatch = card_type ? transaction.card_type === card_type : true;

      // Filtrar por transaction_status
      const transactionStatusMatch = transaction_status ? transaction.transaction_status === transaction_status : true;

      // Filtrar por rango de fechas
      const transactionDate = new Date(transaction.date);
      const fromDate = dateFrom ? new Date(dateFrom) : new Date('2000-01-01T00:00:00');
      const toDate = dateTo ? new Date(dateTo) : new Date('2024-12-31T23:59:59');

      const dateMatch = transactionDate >= fromDate && transactionDate <= toDate;

      return bankMatch && cardTypeMatch && transactionStatusMatch && dateMatch;
    });

    setFilteredData(filtered);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAllTransactions();
  };

  const handleCardPress = (item: Transaction) => {
    try {
      navigation.navigate('Details', { item });
    } catch (error) {
      console.error('Error navigating to Details:', error);
      Alert.alert('Error', 'No se pudo navegar a los detalles de la transacción.');
    }
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <Text style={styles.amount}>{`$${item.total_amount.toFixed(2)}`}</Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Fecha:</Text> {formatDateForDisplay(item.date)}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Terminal:</Text> {item.device || 'N/A'}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Banco:</Text> {item.bank || 'N/A'}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Tarjeta:</Text> {item.masked_card || 'N/A'}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Estado:</Text> {formatTransactionStatus(item.transaction_status) || 'N/A'}
      </Text>
    </TouchableOpacity>
  );

  // Función auxiliar para formatear la fecha
  const formatDateForDisplay = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString(); // Ajusta según necesites
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Contenedor de botones */}
      <View style={styles.buttonsContainer}>
        <ExportButton />
        {/* Pasar la función handleApplyFilters al FilterButton */}
        <FilterButton onApplyFilters={handleApplyFilters} />
      </View>

      {/* FlatList de transacciones */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.transaction_id.toString()}
        contentContainerStyle={styles.cardContainer}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay transacciones para mostrar.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20, // Padding horizontal para márgenes laterales
    paddingTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Espacio entre botones y FlatList
  },
  cardContainer: {
    alignItems: 'center', // Centrar las cards
    paddingBottom: 20, // Espacio al final para ListFooterComponent
  },
  
  card: {
    width: '80%', // Establecer el ancho al 80% del contenedor
    backgroundColor: '#e0e0e0',
    padding: 20,
    marginVertical: 10,
    borderRadius: 20,
    borderLeftWidth: 5,
    borderBottomWidth: 15,
    borderLeftColor: '#8EC100',
    borderBottomColor: '#8EC100',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  
  amount: {
    fontSize: 40,
    fontFamily: 'MontserratSemiBold', // Usar fuente semi-bold
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    fontFamily: 'MontserratRegular', // Usar fuente regular
    color: '#333',
    marginVertical: 2,
  },
  bold: {
    fontFamily: 'MontserratSemiBold', // Usar fuente semi-bold para negrita
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontFamily: 'MontserratRegular', // Usar fuente regular
  },
});

export default TransaccionesPage;
