// screens/HomeScreen.js o HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const transactionCost = '$5';

export default function HomeScreen({ navigation }) {
  const initialData = [...Array(10)].map((_, index) => ({
    id: index.toString(),
    amount: '$25',
    date: '2024-05-14',
    terminal: 'Test Device 0001',
    bank: 'BANCOMER',
    cardType: 'DEBIT',
  }));

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const loadMoreData = () => {
    setLoading(true);
    setTimeout(() => {
      const moreData = [...Array(10)].map((_, index) => ({
        id: (data.length + index).toString(),
        amount: '$25',
        date: '2024-05-14',
        terminal: 'Test Device 0001',
        bank: 'BANCOMER',
        cardType: 'DEBIT',
      }));
      setData([...data, ...moreData]);
      setLoading(false);
    }, 1500);
  };

  const handleCardPress = (item) => {
    try {
      navigation.navigate('Details', { item });
    } catch (error) {
      console.error('Error al navegar:', error);
    }
  };

  const renderItem = ({ item }) => (
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

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardContainer}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  cardContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: '90%',
    maxWidth: 800,
    backgroundColor: '#e0e0e0',
    padding: 20,
    marginVertical: 15,
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
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  detail: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
});
