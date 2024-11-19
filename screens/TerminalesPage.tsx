// TerminalesPage.tsx

import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Modal, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from 'expo-font';
import DeviceList from '../components/DeviceList';
import { apiFetch } from '../utils/api';
import TransactionsList from '../components/TransactionsList'; // Importamos el componente para mostrar las transacciones

const TerminalesPage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [devices, setDevices] = useState<string[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
        MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    // Obtener la lista de terminales
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const params = {
        dateFrom: '2000-01-01 00:00:00',
        dateTo: '2024-11-11 23:59:59',
        size: 100,
        page: 1,
      };
      const response = await apiFetch('/transactions', {
        method: 'GET',
        params,
      });
      const transactionsData = response.data;
      // Extraer las terminales y obtener una lista única
      const devicesSet = new Set();
      transactionsData.forEach((transaction: any) => {
        if (transaction.device) {
          devicesSet.add(transaction.device);
        }
      });
      const devicesArray = Array.from(devicesSet);
      setDevices(devicesArray);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleDevicePress = async (deviceName: string) => {
    // Al seleccionar una terminal, obtener sus transacciones y mostrar el modal
    setSelectedDevice(deviceName);
    setModalVisible(true);
    setLoadingTransactions(true);
    try {
      const params = {
        dateFrom: '2000-01-01 00:00:00',
        dateTo: '2024-11-11 23:59:59',
        device: deviceName,
        size: 100,
        page: 1,
      };
      const response = await apiFetch('/transactions', {
        method: 'GET',
        params,
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions for device:', error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setTransactions([]);
    setSelectedDevice(null);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <DeviceList devices={devices} onDevicePress={handleDevicePress} />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Transacciones de {selectedDevice}</Text>
          {loadingTransactions ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TransactionsList transactions={transactions} />
          )}
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'MontserratSemiBold',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#f5a623',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'MontserratRegular',
  },
});

export default TerminalesPage;
