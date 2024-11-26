// FilterModal.tsx

import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

// Definir la interfaz Filters acorde a los requisitos
interface Filters {
  bank?: string;
  card_type?: string;
  transaction_status?: string;
  dateFrom?: string; // Formato: YYYY-MM-DD
  dateTo?: string;   // Formato: YYYY-MM-DD
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void; // Añadido
}

// ... (importaciones y definiciones previas)

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApplyFilters }) => {
  // Estados para los filtros obligatorios
  const [dateFrom, setDateFrom] = useState<{ day: string | null; month: string | null; year: string | null }>({
    day: null,
    month: null,
    year: null,
  });
  const [dateTo, setDateTo] = useState<{ day: string | null; month: string | null; year: string | null }>({
    day: null,
    month: null,
    year: null,
  });

  // Estados para los filtros opcionales
  const [bank, setBank] = useState<string | null>(null);
  const [cardType, setCardType] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);

    // Estado para cargar fuentes
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

  // Función para formatear las fechas
  const formatDate = (date: { day: string | null; month: string | null; year: string | null }): string | null => {
    if (date.day && date.month && date.year) {
      const day = date.day.padStart(2, '0');
      const month = date.month.padStart(2, '0');
      return `${date.year}-${month}-${day}`;
    }
    return null;
  };

  // Función para manejar la aplicación de filtros
  const handleApplyFilters = () => {
    const formattedDateFrom = formatDate(dateFrom);
    const formattedDateTo = formatDate(dateTo);

    // Validaciones de fechas
    if (!formattedDateFrom || !formattedDateTo) {
      Alert.alert('Error de Fecha', 'Por favor, selecciona ambas fechas de inicio y fin.');
      return;
    }

    const start = new Date(formattedDateFrom);
    const end = new Date(formattedDateTo);
    if (start > end) {
      Alert.alert('Error de Fecha', 'La fecha de inicio no puede ser posterior a la fecha de fin.');
      return;
    }

    // Construir el objeto de filtros dinámicamente
    const allFilters: Filters = {
      dateFrom: formattedDateFrom,
      dateTo: formattedDateTo,
      bank: bank || undefined,
      card_type: cardType || undefined,
      transaction_status: transactionStatus || undefined,
    };

    // Remover campos que son undefined, null o cadenas vacías
    const filters: Filters = Object.entries(allFilters)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .reduce((obj, [key, value]) => {
        obj[key as keyof Filters] = value;
        return obj;
      }, {} as Filters);

    onApplyFilters(filters); // Llamar a la función pasada desde TransaccionesPage
    onClose(); // Cerrar el modal
  };

  // Función para limpiar todos los filtros
  const handleClearFilters = () => {
    setDateFrom({ day: null, month: null, year: null });
    setDateTo({ day: null, month: null, year: null });
    setBank(null);
    setCardType(null);
    setTransactionStatus(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalView}>
          {/* Header con botón de cerrar */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Filtro de Fecha Desde */}
            <Text style={styles.title}>Fecha Desde</Text>
            <View style={styles.dateRangeContainer}>
              {/* Día */}
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setDateFrom((prev) => ({ ...prev, day: value }))}
                  items={[...Array(31).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'DD', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                  value={dateFrom.day} // Añadido
                />
              </View>
              <Text style={styles.separator}>/</Text>
              {/* Mes */}
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setDateFrom((prev) => ({ ...prev, month: value }))}
                  items={[...Array(12).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'MM', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                  value={dateFrom.month} // Añadido
                />
              </View>
              <Text style={styles.separator}>/</Text>
              {/* Año */}
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setDateFrom((prev) => ({ ...prev, year: value }))}
                  items={[...Array(5).keys()].map((i) => ({
                    label: `${2020 + i}`, // Ajusta según necesites
                    value: `${2020 + i}`,
                  }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'YYYY', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                  value={dateFrom.year} // Añadido
                />
              </View>
            </View>

            {/* Filtro de Fecha Hasta */}
            <Text style={styles.title}>Fecha Hasta</Text>
            <View style={styles.dateRangeContainer}>
              {/* Día */}
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setDateTo((prev) => ({ ...prev, day: value }))}
                  items={[...Array(31).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'DD', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                  value={dateTo.day} // Añadido
                />
              </View>
              <Text style={styles.separator}>/</Text>
              {/* Mes */}
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setDateTo((prev) => ({ ...prev, month: value }))}
                  items={[...Array(12).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'MM', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                  value={dateTo.month} // Añadido
                />
              </View>
              <Text style={styles.separator}>/</Text>
              {/* Año */}
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setDateTo((prev) => ({ ...prev, year: value }))}
                  items={[...Array(5).keys()].map((i) => ({
                    label: `${2020 + i}`, // Ajusta según necesites
                    value: `${2020 + i}`,
                  }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'YYYY', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                  value={dateTo.year} // Añadido
                />
              </View>
            </View>

            {/* Filtro de Bank */}
            <Text style={styles.title}>Banco</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setBank(value)}
                items={[
                  { label: 'NU MEXICO FINANCIERA', value: 'NU MEXICO FINANCIERA' },
                  { label: 'BANCOMER', value: 'BANCOMER' },
                  { label: 'REGIGOLD', value: 'REGIGOLD' },
                  { label: 'TARJETAS DEL FUTURO', value: 'TARJETAS DEL FUTURO' },
                  { label: 'N/A', value: 'null' },
                  // Añadir más bancos según sea necesario
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona Banco', value: null }}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                value={bank} // Añadido
              />
            </View>

            {/* Filtro de Tipo de Tarjeta */}
            <Text style={styles.title}>Tipo de Tarjeta</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setCardType(value)}
                items={[
                  { label: 'Débito', value: 'DEBIT' },
                  { label: 'Crédito', value: 'CREDIT' },
                  { label: 'N/A', value: 'null' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona Tipo de Tarjeta', value: null }}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                value={cardType} // Añadido
              />
            </View>

            {/* Filtro de Estado de la Transacción */}
            <Text style={styles.title}>Estado de la Transacción</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setTransactionStatus(value)}
                items={[
                  { label: 'Aprobada', value: 'aprobada' },
                  { label: 'Rechazada por Riesgo', value: 'rechazadaRiesgo' },
                  { label: 'Rechazada por Prosa', value: 'rechazadaProsa' },
                  // Añadir más estados según sea necesario
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona Estado', value: null }}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                value={transactionStatus} // Añadido
              />
            </View>

            {/* Botón para limpiar todos los filtros */}
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearFilters}
            >
              <Text style={styles.clearButtonText}>Limpiar Filtros</Text>
              <Ionicons name="trash" size={20} color="white" style={styles.clearIcon} />
            </TouchableOpacity>

            {/* Botón para aplicar filtros */}
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    dateFrom.day && dateFrom.month && dateFrom.year &&
                    dateTo.day && dateTo.month && dateTo.year
                      ? '#4CAF50'
                      : '#a0c4f4',
                },
              ]}
              onPress={handleApplyFilters}
              disabled={
                !(
                  dateFrom.day && dateFrom.month && dateFrom.year &&
                  dateTo.day && dateTo.month && dateTo.year
                )
              }
            >
              <Text style={styles.filterButtonText}>Filtrar</Text>
              <Ionicons name="filter" size={20} color="white" style={styles.filterIcon} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default FilterModal;

// ... (estilos permanecen igual)


// Estilos
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    padding: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '90%',
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'MontserratSemiBold', // Usar fuente semi-bold
    // fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePicker: {
    width: 90,
  },
  separator: {
    fontSize: 20,
    fontFamily: 'MontserratRegular', // Aplicar fuente regular al separador
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  filterButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    flexDirection: 'row', // Alinear texto e icono en la misma fila
    justifyContent: 'center',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    width: '60%',
    alignSelf: 'center', // Centrar el botón horizontalmente
  },
  filterButtonText: {
    color: '#fff',
    fontFamily: 'MontserratSemiBold', // Usar fuente semi-bold
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 16,
  },
  filterIcon: {
    color: 'white',
  },
  clearButton: {
    backgroundColor: '#f44336',
    borderRadius: 10,
    flexDirection: 'row', // Alinear texto e icono en la misma fila
    justifyContent: 'center',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    width: '60%',
    alignSelf: 'center', // Centrar el botón horizontalmente
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'MontserratSemiBold', // Usar fuente semi-bold
    marginRight: 5,
    fontSize: 16,
  },
  clearIcon: {
    color: 'white',
  },
});

/// Estilos para RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    textAlign: 'center',
    color: '#000', // Color de texto visible
    paddingRight: 30, // Asegurar que el texto no quede detrás del icono
    fontFamily: 'MontserratRegular', // Aplicar fuente regular
  },
  inputAndroid: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
    color: '#000', // Color de texto visible
    paddingRight: 30, // Asegurar que el texto no quede detrás del icono
    fontFamily: 'MontserratRegular', // Aplicar fuente regular
  },
  iconContainer: {
    top: '50%',
    right: 10,
  },
  placeholder: {
    color: '#aaa', // Color de texto del placeholder
    fontFamily: 'MontserratRegular', // Aplicar fuente regular al placeholder
  },
});
