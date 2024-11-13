// screens/HomeScreen.js
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Barra de Encabezado Personalizada */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Peiix</Text>
        <FontAwesome5 name="user-circle" size={24} color="white" />
      </View>

      {/* Botones de Exportar y Filtrar */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.buttonText}>Exportar</Text>
          <MaterialIcons name="file-download" size={16} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.buttonText}>Filtrar</Text>
          <FontAwesome5 name="filter" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Lista de Tarjetas */}
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {[...Array(10)].map((_, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.amount}>$25</Text>
            <Text style={styles.detail}>Fecha: 2024-05-14</Text>
            <Text style={styles.detail}>Terminal: Test Device 0001</Text>
            <Text style={styles.detail}>Banco: BANCOMER</Text>
            <Text style={styles.detail}>Tarjeta: DEBIT</Text>
          </View>
        ))}
      </ScrollView>

      {/* Barra de Navegación Inferior */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="wallet" size={20} color="green" />
          <Text style={styles.navText}>Transacciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="tablet-alt" size={20} color="white" />
          <Text style={styles.navText}>Terminales</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F09600',
    padding: 10,
    borderRadius: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8EC100',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 20,
  },
  cardContainer: {
    alignItems: 'center', // Centra las tarjetas horizontalmente
    paddingVertical: 10,
  },
  card: {
    width: '90%', // Ocupa el 90% del ancho de la pantalla
    backgroundColor: '#e0e0e0',
    padding: 20,
    marginVertical: 10,
    borderRadius: 35,
    borderLeftWidth: 5,
    borderRightWidth: 0.01,
    borderBottomWidth: 15, 
    borderLeftColor: '#8EC100',
    borderrightColor: '#8EC100',
    borderBottomColor: '#8EC100',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10, 
  },
  amount: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center', // Centra el texto del monto
  },
  detail: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left', // Alinea a la izquierda el texto de detalles
    marginVertical: 2,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 12,
  },
});
