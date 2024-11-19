// FilterButton.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FilterModal from './FilterModal';
import { Ionicons } from '@expo/vector-icons';

// Importar el tipo Filters para tipado
interface Filters {
  cardType?: string;
  bank?: string;
  transactionStatus?: string;
  startDate?: string; // Formato: YYYY-MM-DD
  endDate?: string;   // Formato: YYYY-MM-DD
}

// Definir las props que recibirá FilterButton
interface FilterButtonProps {
  onApplyFilters: (filters: Filters) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onApplyFilters }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Botón personalizado */}
      <TouchableOpacity style={styles.filterButton} onPress={openModal}>
        <Text style={styles.filterButtonText}>Filtrar</Text>
        <Ionicons name="filter" size={18} color="black" />
      </TouchableOpacity>
      {/* Pasar la función onApplyFilters al FilterModal */}
      <FilterModal visible={isModalVisible} onClose={closeModal} onApplyFilters={onApplyFilters} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 100,
  },
  filterButtonText: {
    color: 'black',
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold',
  },
});

export default FilterButton;
