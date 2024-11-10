import { StyleSheet, TextInput, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
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
        fontWeight: '500',
        marginBottom: 30,
    },
    formSpaces: {
        alignItems: 'center',
        marginBottom: 15,
    },
    textForm: {
        fontSize: 16,
    },
    textbox: {
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
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default LoginScreen;
