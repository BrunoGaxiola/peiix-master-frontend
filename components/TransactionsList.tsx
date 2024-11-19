// TransactionsList.tsx

import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

interface Transaction {
  transaction_id: number;
  total_amount: number;
  date: string;
  bank: string;
  masked_card: string;
  transaction_status: string;
  // Agrega otros campos si los necesitas
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.card}>
      <Text style={styles.amount}>{`$${item.total_amount.toFixed(2)}`}</Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Fecha:</Text> {formatDateForDisplay(item.date)}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Banco:</Text> {item.bank || 'N/A'}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Tarjeta:</Text> {item.masked_card || 'N/A'}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Estado:</Text> {item.transaction_status || 'N/A'}
      </Text>
    </View>
  );

  const formatDateForDisplay = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  return (
    <FlatList
      data={transactions}
      renderItem={renderItem}
      keyExtractor={(item) => item.transaction_id.toString()}
      contentContainerStyle={styles.cardContainer}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
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
    fontSize: 24,
    fontFamily: 'MontserratSemiBold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    fontFamily: 'MontserratRegular',
    color: '#333',
    marginVertical: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default TransactionsList;
