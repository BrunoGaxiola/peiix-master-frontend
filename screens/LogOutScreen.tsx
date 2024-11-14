import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import * as Font from 'expo-font'
import { useState, useEffect } from 'react';

// Componente para la página de cerrar sesión.
const LogOutScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const back = useNavigation(); // Utilizado para navegar hacia atrás para no reiniciar la página.
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
        });
        setFontsLoaded(true);
        }
        loadFonts();
    }, []);
  
    if (!fontsLoaded) {
        return null;
    }
    return(
        <SafeAreaView style={styles.logOutScreenContainer}>
            <View style={styles.backButton}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back-circle" size={64} color='#000000' // Ícono de back.
                    onPress={() => {
                        back.goBack();
                    }}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logOutButton}
            onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }}>
                <MaterialCommunityIcons name="logout" size={48} color='#FF0000'/> 
                <Text style={styles.logOutText}> Cerrar Sesión </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logOutScreenContainer: {
    },
    backButton: {
        marginLeft: 30,
        marginTop: 60
    },
    logOutButton: {
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#FF0000',
        borderWidth: 5,
        borderRadius: 20,
        width: 191,
        height: 173,
        gap: 10
    },
    logOutText: {
        fontFamily: 'MontserratSemiBold',
        fontSize: 20,
        fontWeight: '500'
    }
});

export default LogOutScreen;