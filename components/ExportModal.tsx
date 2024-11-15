import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ visible, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
            style={styles.exportButton} 
            onPress={() => {
              onClose();
              alert(`Exporting as ${selectedOption}`);
            }}
            disabled={!selectedOption}
          >
            <Text style={styles.exportButtonText}>Exportar</Text>
            <Ionicons name="download" size={18} color="black" />
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