// DeviceCard.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de tener esta dependencia instalada
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';

type DeviceCardProps = {
  name: string;
  onPress: () => void;
};

const DeviceCard: React.FC<DeviceCardProps> = ({ name, onPress }) => {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
          MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Puedes reemplazar esto con un indicador de carga si lo deseas
  }

  return (
    <View style={styles.shadowWrapper}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.iconContainer}>
          <MaterialIcons name="arrow-forward" size={24} color="#d3d3d3" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DeviceCard;

// Estilos
const styles = StyleSheet.create({
  shadowWrapper: {
    // Sombras para iOS
    shadowColor: '#FFBA00', // Color de sombra personalizado
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 10, // Sombra gris por defecto
    // Borde lateral para simular acento de color
    borderLeftWidth: 5,
    borderLeftColor: '#FFBA00', // Color personalizado
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: '#fff', // Fondo transparente para la sombra
    // Asegura que el borde no afecte al TouchableOpacity
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15, // Ajustado para un tamaño más manejable
    backgroundColor: '#d3d3d3', // Fondo gris del card
    borderRadius: 10, // Reducido para encajar dentro del shadowWrapper
  },
  name: {
    fontSize: 18,
    fontFamily: 'MontserratSemiBold', // Usar fuente semi-bold para resaltar el nombre
    color: '#000', // Color de texto negro
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15, // Ajustado para ser un círculo perfecto
    backgroundColor: '#000', // Fondo negro
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10, // Espacio entre el texto y el icono
  },
});
