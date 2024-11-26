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

  // Función para obtener la fecha y hora actual en formato YYYY-MM-DD_HH-MM-SS
  const getCurrentDateString = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  // Función para manejar la exportación del archivo
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

      // Obtener la fecha actual para el nombre del archivo
      const currentDate = getCurrentDateString();

      if (selectedOption === 'CSV') {
        // Manejar la respuesta CSV
        const csvText: string = response;

        // Define el nombre del archivo con la fecha y hora actual
        const csvFilename = `transactions_${currentDate}.csv`;
        const csvUri = `${FileSystem.documentDirectory}${csvFilename}`;

        // Guarda el CSV en el sistema de archivos
        await FileSystem.writeAsStringAsync(csvUri, csvText, { encoding: FileSystem.EncodingType.UTF8 });

        // Compartir el archivo CSV para que el usuario pueda guardarlo
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(csvUri, {
            mimeType: 'text/csv',
            dialogTitle: 'Guardar CSV',
            UTI: 'public.comma-separated-values-text',
          });
        } else {
          Alert.alert('Error', 'Compartir no está disponible en este dispositivo.');
        }

        Alert.alert('Éxito', `Transacciones exportadas como ${csvFilename}.`);
        onClose();
      } else if (selectedOption === 'PDF') {
        // Manejar la respuesta PDF
        const pdfBlob: Blob = response;

        // Convertir el blob a base64
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          const base64 = base64data.split(',')[1];

          // Define el nombre del archivo con la fecha y hora actual
          const pdfFilename = `transactions_${currentDate}.pdf`;
          const pdfUri = `${FileSystem.documentDirectory}${pdfFilename}`;

          // Guarda el PDF en el sistema de archivos
          await FileSystem.writeAsStringAsync(pdfUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // Compartir el archivo PDF para que el usuario pueda guardarlo
          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(pdfUri, {
              mimeType: 'application/pdf',
              dialogTitle: 'Guardar PDF',
              UTI: 'com.adobe.pdf',
            });
          } else {
            Alert.alert('Error', 'Compartir no está disponible en este dispositivo.');
          }

          Alert.alert('Éxito', `Transacciones exportadas como ${pdfFilename}.`);
          onClose();
        };
      }
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
          {/* Botón de Cerrar */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={35} color="white" />
          </TouchableOpacity>

          {/* Opciones de Exportación */}
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

          {/* Botón de Exportar */}
          <TouchableOpacity
            style={[
              styles.exportButton,
              { backgroundColor: selectedOption ? '#f5a623' : '#d3d3d3' }
            ]}
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
    width: '90%',
    padding: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 20,
    backgroundColor: 'black',
    padding: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  option1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f5a623',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f5a623',
    backgroundColor: '#f5a623',
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
    marginTop: 30,
  },
  exportButtonText: {
    color: 'black',
    fontSize: 16,
    marginRight: 5,
    fontWeight: 'bold',
  },
});
