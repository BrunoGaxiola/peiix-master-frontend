// DeviceList.tsx

import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import DeviceCard from './DeviceCard';

interface DeviceListProps {
  devices: string[];
  onDevicePress: (deviceName: string) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, onDevicePress }) => {
  const renderItem = ({ item }: { item: string }) => (
    <DeviceCard name={item} onPress={() => onDevicePress(item)} />
  );

  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item}
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
