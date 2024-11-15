// FilterModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
}

interface Filters {
  cardType?: string;
  bank?: string;
  transactionStatus?: string;
  startDate?: string; // Format: YYYY-MM-DD
  endDate?: string;   // Format: YYYY-MM-DD
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApplyFilters }) => {
  const [cardType, setCardType] = useState<string | null>(null);
  const [bank, setBank] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<{ day: string | null; month: string | null; year: string | null }>({
    day: null,
    month: null,
    year: null,
  });
  const [endDate, setEndDate] = useState<{ day: string | null; month: string | null; year: string | null }>({
    day: null,
    month: null,
    year: null,
  });

  // Combine date parts into a single string
  const formatDate = (date: { day: string | null; month: string | null; year: string | null }): string | null => {
    if (date.day && date.month && date.year) {
      const day = date.day.padStart(2, '0');
      const month = date.month.padStart(2, '0');
      return `${date.year}-${month}-${day}`;
    }
    return null;
  };

  const handleApplyFilters = () => {
    const filters: Filters = {};

    if (cardType) filters.cardType = cardType;
    if (bank) filters.bank = bank;
    if (transactionStatus) filters.transactionStatus = transactionStatus;

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    if (formattedStartDate) filters.startDate = formattedStartDate;
    if (formattedEndDate) filters.endDate = formattedEndDate;

    onApplyFilters(filters);
    onClose();
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
          {/* Header with Close Button */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Card Type Filter */}
            <Text style={styles.title}>Tipo de Tarjeta</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setCardType(value)}
                items={[
                  { label: 'Débito', value: 'DEBIT' },
                  { label: 'Crédito', value: 'CREDIT' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona Tipo de Tarjeta', value: null }}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
              />
            </View>

            {/* Bank Filter */}
            <Text style={styles.title}>Banco Emisor</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setBank(value)}
                items={[
                  { label: 'BANCOMER', value: 'BANCOMER' },
                  { label: 'BANAMEX', value: 'BANAMEX' },
                  { label: 'HSBC', value: 'HSBC' },
                  // Add more banks as needed
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona Banco Emisor', value: null }}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
              />
            </View>

            {/* Transaction Status Filter */}
            <Text style={styles.title}>Estado de la Transacción</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setTransactionStatus(value)}
                items={[
                  { label: 'Completada', value: 'COMPLETED' },
                  { label: 'Pendiente', value: 'PENDING' },
                  { label: 'Cancelada', value: 'CANCELLED' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecciona Estado', value: null }}
                useNativeAndroidPickerStyle={false}
                Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
              />
            </View>

            {/* Date Range Filter */}
            <Text style={styles.title}>Rango de Fechas</Text>
            <View style={styles.dateRangeContainer}>
              {/* Start Date */}
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setStartDate((prev) => ({ ...prev, day: value }))}
                  items={[...Array(31).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'DD', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                />
              </View>
              <Text style={styles.separator}>/</Text>
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setStartDate((prev) => ({ ...prev, month: value }))}
                  items={[...Array(12).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'MM', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                />
              </View>
              <Text style={styles.separator}>/</Text>
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setStartDate((prev) => ({ ...prev, year: value }))}
                  items={[...Array(100).keys()].map((i) => ({
                    label: `${2023 - i}`,
                    value: `${2023 - i}`,
                  }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'YYYY', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                />
              </View>
            </View>

            <Text style={styles.toText}>a</Text>

            <View style={styles.dateRangeContainer}>
              {/* End Date */}
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setEndDate((prev) => ({ ...prev, day: value }))}
                  items={[...Array(31).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'DD', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                />
              </View>
              <Text style={styles.separator}>/</Text>
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setEndDate((prev) => ({ ...prev, month: value }))}
                  items={[...Array(12).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'MM', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                />
              </View>
              <Text style={styles.separator}>/</Text>
              <View style={styles.datePicker}>
                <RNPickerSelect
                  onValueChange={(value) => setEndDate((prev) => ({ ...prev, year: value }))}
                  items={[...Array(100).keys()].map((i) => ({
                    label: `${2023 - i}`,
                    value: `${2023 - i}`,
                  }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'YYYY', value: null }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                />
              </View>
            </View>

            {/* Apply Filters Button */}
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    cardType || bank || transactionStatus || (formatDate(startDate) && formatDate(endDate))
                      ? '#4CAF50'
                      : '#a0c4f4',
                },
              ]}
              onPress={handleApplyFilters}
              disabled={
                !cardType &&
                !bank &&
                !transactionStatus &&
                !(formatDate(startDate) && formatDate(endDate))
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

// Styles
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
    justifyContent: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  toText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    flexDirection: 'row', // Align text and icon in the same row
    justifyContent: 'center',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    width: '60%',
    alignSelf: 'center', // Center the button horizontally
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 16,
  },
  filterIcon: {
    color: 'white',
  },
});

// Picker Select Styles
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    textAlign: 'center',
    color: '#000', // Visible text color
    paddingRight: 30, // To ensure the text is not behind the icon
  },
  inputAndroid: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
    color: '#000', // Visible text color
    paddingRight: 30, // To ensure the text is not behind the icon
  },
  iconContainer: {
    top: '50%',
    right: 10,
  },
  placeholder: {
    color: '#aaa', // Placeholder text color
  },
});
