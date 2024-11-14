// screens/HomeScreen.js o HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) { // Asegúrate de recibir navigation aquí
  const initialData = [...Array(3)].map((_, index) => ({
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
      const moreData = [...Array(3)].map((_, index) => ({
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
      navigation.navigate('Details', { item }); // Usa navigate correctamente aquí
    } catch (error) {
      console.error('Error al navegar:', error); // Log de error para depurar
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
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={150}
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
    maxWidth: 400,
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
