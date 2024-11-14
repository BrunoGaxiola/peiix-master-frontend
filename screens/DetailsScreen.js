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

      {/* Detalles de la transacción */}
      <Text style={styles.amount}>{amount}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>ID de transacción: <Text style={styles.value}>194402170</Text></Text>
        <Text style={styles.label}>Banco: <Text style={styles.value}>{bank}</Text></Text>
        <Text style={styles.label}>Tipo de tarjeta: <Text style={styles.value}>{cardType}</Text></Text>
        <Text style={styles.label}>Fecha: <Text style={styles.value}>{date}</Text></Text>
        <Text style={styles.label}>Terminal: <Text style={styles.value}>{terminal}</Text></Text>
        <Text style={styles.label}>Propina: <Text style={styles.value}>$0</Text></Text>
        <Text style={styles.label}>Monto total: <Text style={styles.value}>{amount}</Text></Text>
        <Text style={styles.label}>Tipo de transacción: <Text style={styles.value}>Venta</Text></Text>
        <Text style={styles.label}>Estado de transacción: <Text style={styles.value}>rechazadaProsa</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3', // Color de fondo similar a la imagen
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
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
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
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold', // Para poner en negrita las etiquetas
    marginVertical: 2,
  },
  value: {
    fontWeight: 'normal', // Para que los valores no estén en negrita
  },
});
