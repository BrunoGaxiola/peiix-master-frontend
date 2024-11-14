import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

interface FilterPopupProps {
    closeModal: () => void;
}

export function FilterPopup({ closeModal }: FilterPopupProps) {
    const [cardType, setCardType] = useState('');
    const [bank, setBank] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');
    const [startDate, setStartDate] = useState({ day: '', month: '', year: '' });
    const [endDate, setEndDate] = useState({ day: '', month: '', year: '' });
    const [showPlaceholder, setShowPlaceholder] = useState({
        cardType: true,
        bank: true,
        transactionStatus: true,
        startDateDay: true,
        startDateMonth: true,
        startDateYear: true,
        endDateDay: true,
        endDateMonth: true,
        endDateYear: true,
    });

    return (
        <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Ionicons name="close" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>Tipo de tarjeta</Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setCardType(value)}
                        items={[
                            { label: 'Débito', value: 'debito' },
                            { label: 'Crédito', value: 'credito' },
                        ]}
                        style={pickerSelectStyles}
                        placeholder={showPlaceholder.cardType ? { label: 'Tarjeta', value: null } : {}}
                        onOpen={() => setShowPlaceholder((prev) => ({ ...prev, cardType: false }))}
                        onClose={() => setShowPlaceholder((prev) => ({ ...prev, cardType: !cardType }))}
                        Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                        pickerProps={{
                            itemStyle: {
                                color: 'black',
                            },
                        }}
                    />
                </View>

                <Text style={styles.title}>Banco emisor</Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setBank(value)}
                        items={[
                            { label: 'Banco A', value: 'banco_a' },
                            { label: 'Banco B', value: 'banco_b' },
                            { label: 'Banco C', value: 'banco_c' },
                        ]}
                        style={pickerSelectStyles}
                        placeholder={showPlaceholder.bank ? { label: 'Banco Emisor', value: null } : {}}
                        onOpen={() => setShowPlaceholder((prev) => ({ ...prev, bank: false }))}
                        onClose={() => setShowPlaceholder((prev) => ({ ...prev, bank: !bank }))}
                        Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                        pickerProps={{
                            itemStyle: {
                                color: 'black'
                            },
                        }}
                    />
                </View>

                <Text style={styles.title}>Estado de la transacción</Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setTransactionStatus(value)}
                        items={[
                            { label: 'Completada', value: 'completada' },
                            { label: 'Pendiente', value: 'pendiente' },
                            { label: 'Cancelada', value: 'cancelada' },
                        ]}
                        style={pickerSelectStyles}
                        placeholder={showPlaceholder.transactionStatus ? { label: 'Estado', value: null } : {}}
                        onOpen={() => setShowPlaceholder((prev) => ({ ...prev, transactionStatus: false }))}
                        onClose={() => setShowPlaceholder((prev) => ({ ...prev, transactionStatus: !transactionStatus }))}
                        Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                        pickerProps={{
                            itemStyle: {
                                color: 'black'
                            },
                        }}
                    />
                </View>

                <Text style={styles.title}>Rango de fechas</Text>
                <View style={styles.dateRangeContainer}>
                    <View style={styles.datePicker}>
                        <RNPickerSelect
                            onValueChange={(value) => setStartDate((prev) => ({ ...prev, day: value }))}
                            items={[...Array(31).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                            style={pickerSelectStyles}
                            placeholder={showPlaceholder.startDateDay ? { label: 'DD', value: null } : {}}
                            onOpen={() => setShowPlaceholder((prev) => ({ ...prev, startDateDay: false }))}
                            onClose={() => setShowPlaceholder((prev) => ({ ...prev, startDateDay: !startDate.day }))}
                            Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                            pickerProps={{
                                itemStyle: {
                                    color: 'black'
                                },
                            }}
                        />
                    </View>
                    <Text style={styles.separator}>/</Text>
                    <View style={styles.datePicker}>
                        <RNPickerSelect
                            onValueChange={(value) => setStartDate((prev) => ({ ...prev, month: value }))}
                            items={[...Array(12).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                            style={pickerSelectStyles}
                            placeholder={showPlaceholder.startDateMonth ? { label: 'MM', value: null } : {}}
                            onOpen={() => setShowPlaceholder((prev) => ({ ...prev, startDateMonth: false }))}
                            onClose={() => setShowPlaceholder((prev) => ({ ...prev, startDateMonth: !startDate.month }))}
                            Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                            pickerProps={{
                                itemStyle: {
                                    color: 'black'
                                },
                            }}
                        />
                    </View>
                    <Text style={styles.separator}>/</Text>
                    <View style={styles.datePicker}>
                        <RNPickerSelect
                            onValueChange={(value) => setStartDate((prev) => ({ ...prev, year: value }))}
                            items={[...Array(100).keys()].map((i) => ({ label: `${2023 - i}`, value: `${2023 - i}` }))}
                            style={pickerSelectStyles}
                            placeholder={showPlaceholder.startDateYear ? { label: 'YYYY', value: null } : {}}
                            onOpen={() => setShowPlaceholder((prev) => ({ ...prev, startDateYear: false }))}
                            onClose={() => setShowPlaceholder((prev) => ({ ...prev, startDateYear: !startDate.year }))}
                            Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                            pickerProps={{
                                itemStyle: {
                                    color: 'black'
                                },
                            }}
                        />
                    </View>
                </View>

                <Text style={styles.toText}>a</Text>

                <View style={styles.dateRangeContainer}>
                    <View style={styles.datePicker}>
                        <RNPickerSelect
                            onValueChange={(value) => setEndDate((prev) => ({ ...prev, day: value }))}
                            items={[...Array(31).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                            style={pickerSelectStyles}
                            placeholder={showPlaceholder.endDateDay ? { label: 'DD', value: null } : {}}
                            onOpen={() => setShowPlaceholder((prev) => ({ ...prev, endDateDay: false }))}
                            onClose={() => setShowPlaceholder((prev) => ({ ...prev, endDateDay: !endDate.day }))}
                            Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                            pickerProps={{
                                itemStyle: {
                                    color: 'black'
                                },
                            }}
                        />
                    </View>
                    <Text style={styles.separator}>/</Text>
                    <View style={styles.datePicker}>
                        <RNPickerSelect
                            onValueChange={(value) => setEndDate((prev) => ({ ...prev, month: value }))}
                            items={[...Array(12).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
                            style={pickerSelectStyles}
                            placeholder={showPlaceholder.endDateMonth ? { label: 'MM', value: null } : {}}
                            onOpen={() => setShowPlaceholder((prev) => ({ ...prev, endDateMonth: false }))}
                            onClose={() => setShowPlaceholder((prev) => ({ ...prev, endDateMonth: !endDate.month }))}
                            Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                            pickerProps={{
                                itemStyle: {
                                    color: 'black'
                                },
                            }}
                        />
                    </View>
                    <Text style={styles.separator}>/</Text>
                    <View style={styles.datePicker}>
                        <RNPickerSelect
                            onValueChange={(value) => setEndDate((prev) => ({ ...prev, year: value }))}
                            items={[...Array(100).keys()].map((i) => ({ label: `${2023 - i}`, value: `${2023 - i}` }))}
                            style={pickerSelectStyles}
                            placeholder={showPlaceholder.endDateYear ? { label: 'YYYY', value: null } : {}}
                            onOpen={() => setShowPlaceholder((prev) => ({ ...prev, endDateYear: false }))}
                            onClose={() => setShowPlaceholder((prev) => ({ ...prev, endDateYear: !endDate.year }))}
                            Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
                            pickerProps={{
                                itemStyle: {
                                    color: 'black'
                                },
                            }}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>Filtrar</Text>
                    <Ionicons name="filter" size={20} color="white" style={styles.filterIcon} />
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        padding: 20,
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    header: {
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#000',
        borderRadius: 50,
        padding: 5,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    pickerContainer: {
        alignSelf: 'center',
        width: 200, // Set the width of each picker container
        marginBottom: 25,
    },
    dateRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    datePicker: {
        width: 90, // Width for each date picker
    },
    separator: {
        fontSize: 25,
        marginHorizontal: 5,
        alignSelf: 'center',
    },
    toText: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
    },
    filterButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        flexDirection: 'row', // Alinea el texto y el ícono en la misma fila
        justifyContent: 'center',

        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        width: "60%",
        alignSelf: 'center', // Centra el botón horizontalmente

    },
    filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 5
    },
    filterIcon: {
        color: "white"
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        textAlign: 'center',
        color: '#000', // Color del texto visible al seleccionar
    },
    inputAndroid: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center',
        color: '#000', // Color del texto visible al seleccionar
    },
    iconContainer: {
        top: "30%",
        right: 5,
    },
    placeholder: {
        color: '#aaa', // Color del placeholder
    },


});