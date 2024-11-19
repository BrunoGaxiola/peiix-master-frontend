import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiFetch } from '../utils/api'; // Asegúrate de que la ruta es correcta
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ visible, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!selectedOption) {
      Alert.alert('Error', 'Por favor, selecciona un formato para exportar.');
      return;
    }

    setLoading(true);

    try {
      // Define los parámetros de consulta dinámicamente
      const params = {
        dateFrom: '2000-01-01 00:00:00', // Reemplaza con las fechas dinámicas si es necesario
        dateTo: '2024-11-11 23:59:59',
        format: selectedOption.toLowerCase(),
      };

      // Realiza la solicitud GET al backend utilizando apiFetch
      const endpoint = '/export';
      const responseType = selectedOption === 'CSV' ? 'text' : 'blob';
      const response = await apiFetch(endpoint, { method: 'GET', params }, responseType);

      if (selectedOption === 'CSV') {
        // Manejar la respuesta CSV
        const csvText: string = response;

        // Guarda el CSV en el sistema de archivos
        const csvUri = `${FileSystem.documentDirectory}transactions_${Date.now()}.csv`;
        await FileSystem.writeAsStringAsync(csvUri, csvText, { encoding: FileSystem.EncodingType.UTF8 });

        // Compartir o abrir el CSV
        await Sharing.shareAsync(csvUri, {
          mimeType: 'text/csv',
          dialogTitle: 'Compartir CSV',
          UTI: 'public.comma-separated-values-text',
        });
      } else if (selectedOption === 'PDF') {
        // Manejar la respuesta PDF
        const pdfBlob: Blob = response;

        // Convertir el blob a base64
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          const base64 = base64data.split(',')[1];

          // Guarda el PDF en el sistema de archivos
          const pdfUri = `${FileSystem.documentDirectory}transactions_${Date.now()}.pdf`;
          await FileSystem.writeAsStringAsync(pdfUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // Compartir o abrir el PDF
          await Sharing.shareAsync(pdfUri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Compartir PDF',
            UTI: 'com.adobe.pdf',
          });
        };
      }

      Alert.alert('Éxito', `Transacciones exportadas como ${selectedOption}.`);
      onClose();
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Ocurrió un error al exportar las transacciones.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={35} color="white" />
          </TouchableOpacity>
          
          
          
          {/* Export Options */}
          <View style={styles.option1}>
            <TouchableOpacity onPress={() => setSelectedOption('PDF')}>
              <View style={selectedOption === 'PDF' ? styles.radioSelected : styles.radio} />
            </TouchableOpacity>
            <Text style={styles.optionText}>Exportar a PDF</Text>
          </View>
          
          <View style={styles.option}>
            <TouchableOpacity onPress={() => setSelectedOption('CSV')}>
              <View style={selectedOption === 'CSV' ? styles.radioSelected : styles.radio} />
            </TouchableOpacity>
            <Text style={styles.optionText}>Exportar a CSV</Text>
          </View>
          
          {/* Export Button */}
          <TouchableOpacity 
            style={[styles.exportButton, { backgroundColor: selectedOption ? '#f5a623' : '#d3d3d3' }]} 
            onPress={handleExport}
            disabled={!selectedOption || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <>
                <Text style={styles.exportButtonText}>Exportar</Text>
                <Ionicons name="download" size={18} color="black" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExportModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 380,
    height: 850,
    padding: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 100,
    left: 30,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  option1: {
    paddingTop: 200,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    marginLeft: 30,
    fontSize: 22,
    fontWeight: 'bold',
  },
  radio: {
    height:40,
    width: 40,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#f5a623',
  },
  radioSelected: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#f5a623',
    backgroundColor: '#f5a623',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5a623',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 100,
  },
  exportButtonText: {
    color: 'black',
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold',
  },
});