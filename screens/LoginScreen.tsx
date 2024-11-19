import { StyleSheet, TextInput, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente de la página de inicio de sesión.
const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Estados para el correo y contraseña.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Por favor, ingresa tu correo y contraseña.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://10.41.50.48:5000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Assuming the response contains tokens
                const { access_token, bp_token, refresh_token, user_token } = data;

                // Store tokens securely
                await AsyncStorage.setItem('ACCESS_TOKEN', access_token);
                await AsyncStorage.setItem('BP_TOKEN', bp_token);
                await AsyncStorage.setItem('REFRESH_TOKEN', refresh_token);
                await AsyncStorage.setItem('USER_TOKEN', user_token);

                // Navigate to the main container
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainContainer' }],
                });
            } else {
                // Handle errors returned from the API
                Alert.alert("Login Fallido", data.error || "Hubo un problema al iniciar sesión.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo conectar al servidor. Inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

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
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.formSpaces}>
                    <Text style={styles.textForm}>Contraseña</Text>
                    <TextInput
                        style={styles.textbox}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.loginButton}
                    activeOpacity={0.7}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                    )}
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
        backgroundColor: '#EEEEEE',
        width: 295,
        height: 40,
        borderRadius: 7,
        paddingHorizontal: 10,
        marginTop: 5,
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
        height: 50,
        borderRadius: 25,
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
