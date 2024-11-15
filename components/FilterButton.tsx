// FilterButton.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FilterModal from './FilterModal';
import { Ionicons } from '@expo/vector-icons';

const FilterButton: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Custom Styled Button */}
      <TouchableOpacity style={styles.filterButton} onPress={openModal}>
        <Text style={styles.filterButtonText}>Filtrar</Text>
        <Ionicons name="filter" size={18} color="black" />
      </TouchableOpacity>
      <FilterModal visible={isModalVisible} onClose={closeModal} />
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
