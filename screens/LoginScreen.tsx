import { StyleSheet, TextInput, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import * as Font from 'expo-font'
import { useState, useEffect } from 'react';

// Componente de la página de inicio de sesión.
const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
            MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
            MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
        });
        setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView // Para evitar que el teclado se interponga.
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.innerContainer}
            >
                <Text style={styles.intro}>Sea Bienvenido a</Text>
                <Image
                    style={styles.logo}
                    source={require('../assets/images/peiixlogo.png')}
                />
                <View style={styles.formSpaces}>
                    <Text style={styles.textForm}>Correo Electrónico</Text>
                    <TextInput
                        style={styles.textbox}
                        placeholder="Dirección de Correo Electrónico"
                    />
                </View>
                <View style={styles.formSpaces}>
                    <Text style={styles.textForm}>Contraseña</Text>
                    <TextInput
                        style={styles.textbox}
                        placeholder="Contraseña"
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('MainContainer');
                    }}
                    style={styles.loginButton}
                    activeOpacity={0.5}
                >
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        columnGap: 1,
        alignItems: 'center',
    },
    intro: {
        fontSize: 32,
        fontFamily: 'MontserratMedium',
        marginBottom: 30,
    },
    formSpaces: {
        alignItems: 'center',
        marginBottom: 15,
    },
    textForm: {
        fontFamily: 'MontserratMedium',
        fontSize: 16,
    },
    textbox: {
        fontFamily: 'MontserratMedium',
        backgroundColor: '#BBBBBB',
        width: 295,
        height: 35,
        borderRadius: 7,
        textAlign: 'center',
    },
    logo: {
        width: 295,
        height: 98,
        marginBottom: 30,
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F09600',
        width: 309,
        height: 40,
        borderRadius: 20,
        marginTop: 30,
    },
    loginButtonText: {
        fontFamily: 'MontserratSemiBold',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default LoginScreen;
