import React from 'react';
import { FlatList, StyleSheet, ListRenderItem } from 'react-native';
import DeviceCard from './components/DeviceCard';
import { devices, Device } from './components/devicesData';

const App = () => {
  const renderItem: ListRenderItem<Device> = ({ item }) => (
    <DeviceCard name={item.name} onPress={() => alert(item.name)} />
  );

  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container1}
    />
  );
};

const styles = StyleSheet.create({
  container1: {
    paddingTop: 80,
    padding: 40,
  },
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
