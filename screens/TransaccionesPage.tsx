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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import ExportButton from '../components/ExportButton';
import FilterButton from '../components/FilterButton'; // Import FilterButton

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

  // Initial transaction data
  const initialData: Transaction[] = [...Array(10)].map((_, index) => ({
    id: index.toString(),
    amount: '$25',
    date: '2024-05-14',
    terminal: 'Test Device 0001',
    bank: 'BANCOMER',
    cardType: 'DEBIT',
  }));

  useEffect(() => {
    const loadFontsAndData = async () => {
      try {
        // Load fonts
        await Font.loadAsync({
          MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
          MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
        });
        setFontsLoaded(true);

        // Set initial data
        setData(initialData);
      } catch (error) {
        console.error('Error loading fonts or data:', error);
      }
    };
    loadFontsAndData();
  }, []);

  const loadMoreData = () => {
    if (loading) return; // Prevent multiple triggers
    setLoading(true);
    setTimeout(() => {
      const moreData: Transaction[] = [...Array(10)].map((_, index) => ({
        id: (data.length + index).toString(),
        amount: '$25',
        date: '2024-05-14',
        terminal: 'Test Device 0001',
        bank: 'BANCOMER',
        cardType: 'DEBIT',
      }));
      setData((prevData) => [...prevData, ...moreData]);
      setLoading(false);
    }, 1500);
  };

  const handleCardPress = (item: Transaction) => {
    try {
      navigation.navigate('Details', { item });
    } catch (error) {
      console.error('Error navigating to Details:', error);
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
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20, // Añadido padding horizontal para márgenes laterales
    paddingTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Espacio entre los botones y la FlatList
  },
  cardContainer: {
    alignItems: 'center',
    paddingBottom: 20, // Espacio inferior para el ListFooterComponent
  },
  card: {
    width: '100%', // Utilizar el 100% del contenedor padre
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
    fontFamily: 'MontserratSemiBold', // Usando la fuente semi-bold
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    fontFamily: 'MontserratRegular', // Usando la fuente regular
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
});

export default TransaccionesPage;
