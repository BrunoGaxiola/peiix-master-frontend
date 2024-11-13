import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // 



type DeviceCardProps = {
    name: string;
    onPress: () => void;
  };

  const DeviceCard: React.FC<DeviceCardProps> = ({ name, onPress }) => {
 
    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Text style={styles.name}>{name}</Text>
            <MaterialIcons  />
                <View style={styles.iconContainer}>
            <MaterialIcons name="arrow-forward" size={30} color="#d3d3d3" />
      </View>
      </TouchableOpacity>
    );
  };
export default DeviceCard;

const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 50,
      marginVertical: 15,
      backgroundColor: '#d3d3d3', // Fondo gris
      borderRadius: 15,
      shadowColor: '#FFBA00', // Color de sombra amarillo
      shadowOffset: { width: -10, height: 14 },
      shadowOpacity: 10,
      shadowRadius: 5,
      elevation: 5, // Requerido para sombra en Android
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#000', // Color de texto negro
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: '#000', // Fondo negro
        marginLeft: 30,
      },
  });
  