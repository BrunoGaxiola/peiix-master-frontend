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
import { apiFetch } from '../utils/api'; // Import the apiFetch utility
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

const { width } = Dimensions.get('window');

const TransaccionesPage: React.FC<Props> = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); // To track if more data is available

  useEffect(() => {
    const loadFontsAndData = async () => {
      try {
        // Load fonts
        await Font.loadAsync({
          MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
          MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
        });
        setFontsLoaded(true);

        // Fetch initial data
        fetchTransactions(1, true);
      } catch (error) {
        console.error('Error loading fonts or data:', error);
      }
    };
    loadFontsAndData();
  }, []);

  const fetchTransactions = async (pageNumber: number, initialLoad: boolean = false) => {
    if (loading) return;

    setLoading(true);

    try {
      const dateFrom = '2000-01-01 00:00:00'; // Start of the day
      const dateTo = '2024-11-11 23:59:59'; // End of the day

      const params = {
        dateFrom,
        dateTo,
        size: 20, // Number of transactions per page
        page: pageNumber,
      };

      const responseData = await apiFetch('/transactions', {
        method: 'GET',
        params,
      });

      // Extract transactions from responseData.data
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

      // Update hasMore based on response
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
    fetchTransactions(1, true);
  };

  const loadMoreData = () => {
    if (loading || !hasMore) return;
    fetchTransactions(page);
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

  // Helper function to format ISO date to readable format
  const formatDateForDisplay = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString(); // Adjust as needed for localization
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
        <FilterButton />
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
    paddingHorizontal: 20, // Added horizontal padding for side margins
    paddingTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Space between buttons and FlatList
  },
  cardContainer: {
    alignItems: 'center',
    paddingBottom: 20, // Space at the bottom for ListFooterComponent
  },
  card: {
    width: '100%', // Use 100% of the parent container
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
    fontFamily: 'MontserratSemiBold', // Using semi-bold font
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    fontFamily: 'MontserratRegular', // Using regular font
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
