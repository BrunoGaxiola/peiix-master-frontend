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
  id: string;
  amount: string;
  date: string;
  terminal: string;
  bank: string;
  cardType: string;
}

// Define the Filters type
interface Filters {
  cardType?: string;
  bank?: string;
  transactionStatus?: string;
  startDate?: string; // Format: YYYY-MM-DD
  endDate?: string;   // Format: YYYY-MM-DD
}

const { width } = Dimensions.get('window');

const TransaccionesPage: React.FC<Props> = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
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

        // Obtener datos iniciales
        fetchTransactions(1, true, filters);
      } catch (error) {
        console.error('Error loading fonts or data:', error);
      }
    };
    loadFontsAndData();
  }, []);

  // Función para manejar la aplicación de filtros
  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
    setHasMore(true);
    setData([]);
    fetchTransactions(1, true, newFilters);
  };

  // Función para obtener las transacciones, ahora acepta filtros
  const fetchTransactions = async (pageNumber: number, initialLoad: boolean = false, appliedFilters: Filters = {}) => {
    if (loading) return;

    setLoading(true);

    try {
      let dateFrom = '2000-01-01 00:00:00';
      let dateTo = '2024-11-11 23:59:59';

      // Si se han aplicado filtros de fecha, usarlos
      if (appliedFilters.startDate && appliedFilters.endDate) {
        dateFrom = `${appliedFilters.startDate} 00:00:00`;
        dateTo = `${appliedFilters.endDate} 23:59:59`;
      }

      const params: any = {
        dateFrom,
        dateTo,
        size: 20, // Número de transacciones por página
        page: pageNumber,
      };

      // Incluir filtros opcionales
      if (appliedFilters.cardType) {
        params.card = appliedFilters.cardType;
      }

      if (appliedFilters.bank) {
        params.device = appliedFilters.bank; // Asumiendo que 'device' corresponde al banco
      }

      if (appliedFilters.transactionStatus) {
        params.transactionStatus = appliedFilters.transactionStatus;
      }

      // Puedes añadir más filtros según sea necesario

      const responseData = await apiFetch('/transactions', {
        method: 'GET',
        params,
      });

      // Mapear los datos de la respuesta al tipo Transaction
      const fetchedTransactions: Transaction[] = responseData.data.map((item: any) => ({
        id: item.transaction_id.toString(),
        amount: `$${item.total_amount.toFixed(2)}`,
        date: formatDateForDisplay(item.date),
        terminal: item.device || 'N/A',
        bank: item.bank || 'N/A',
        cardType: item.card_brand || 'N/A',
      }));

      if (initialLoad) {
        setData(fetchedTransactions);
      } else {
        setData(prevData => [...prevData, ...fetchedTransactions]);
      }

      // Actualizar si hay más datos para cargar
      setHasMore(fetchedTransactions.length === params.size);

      setPage(pageNumber + 1);
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      Alert.alert('Error', error.message || 'No se pudo cargar las transacciones.');
    } finally {
      setLoading(false);
      if (initialLoad) setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    setData([]);
    fetchTransactions(1, true, filters);
  };

  const loadMoreData = () => {
    if (loading || !hasMore) return;
    fetchTransactions(page, false, filters);
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
      <Text style={styles.amount}>{item.amount}</Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Fecha:</Text> {item.date}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Terminal:</Text> {item.terminal}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Banco:</Text> {item.bank}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Tarjeta:</Text> {item.cardType}
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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardContainer}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && hasMore ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
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
    alignItems: 'center',
    paddingBottom: 20, // Espacio al final para ListFooterComponent
  },
  card: {
    width: '100%', // Usar 100% del contenedor padre
    maxWidth: 800,
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
    fontWeight: 'bold',
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
    fontFamily: 'MontserratRegular',
  },
});

export default TransaccionesPage;
