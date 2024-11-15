import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import DeviceCard from './DeviceCard';
import { Device, devices } from './devicesData';

const DeviceList: React.FC = () => {
  const renderItem = ({ item }: { item: Device }) => (
    <DeviceCard name={item.name} onPress={() => alert(item.name)} />
  );

  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 100,
  },
});

export default DeviceList;