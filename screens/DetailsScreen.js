// screens/DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DetailsScreen({ route }) {
  const navigation = useNavigation();
  const { amount, date, terminal, bank, cardType } = route.params;

  return (
    <View style={styles.container}>
      {/* Botón de cerrar */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Monto */}
      <Text style={styles.amount}>{amount}</Text>

      {/* Contenedor de detalles */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>ID de transacción:</Text>
          <Text style={styles.value}>194402170</Text>
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
}

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
    top: 20,
    left: 20,
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
  },
  amount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 60,
  },
  detailsContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    flex: 1,
  },
});
