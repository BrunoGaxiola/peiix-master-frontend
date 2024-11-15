import React from 'react';
import { FlatList, StyleSheet, ListRenderItem } from 'react-native';
import DeviceCard from './components/DeviceCard';
import { devices, Device } from './components/devicesData';
import DeviceList from './components/DeviceList';
import ExportButton from './components/ExportButton';

const App: React.FC = () => {
  return <ExportButton/>;
};

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

export default App;
