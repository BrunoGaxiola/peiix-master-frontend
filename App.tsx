import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ExportModal from './components/buttonCSV';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Hello Peiix!</Text>

      {/* Export Button */}
      <TouchableOpacity
        style={styles.exportButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.exportButtonText}>Exportar</Text>
        <Ionicons name="download" size={18} color="black" />
      </TouchableOpacity>

      {/* Export Modal */}
      <ExportModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5a623',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  exportButtonText: {
    color: 'black',
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold',
  },
});
