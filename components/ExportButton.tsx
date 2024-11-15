import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ExportModal from './ExportModal';
import { Ionicons } from '@expo/vector-icons';

const ExportButton: React.FC = () => {
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
      <TouchableOpacity style={styles.exportButton} onPress={openModal}>
        <Text style={styles.exportButtonText}>Exportar</Text>
            <Ionicons name="download" size={18} color="black" />
      </TouchableOpacity>
      <ExportModal visible={isModalVisible} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5a623',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 100,
  },
  exportButtonText: {
    color: 'black',
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold',
  },
});

export default ExportButton;
