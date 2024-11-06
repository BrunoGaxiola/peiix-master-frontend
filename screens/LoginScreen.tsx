import { StyleSheet, TextInput, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

const LoginScreen = () => {
    return(
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style = {styles.container}>
            <Text style = {styles.intro}>Sea Bienvenido a</Text>
            <Image
            style = {styles.logo}
            source = {require('../assets/images/peiixlogo.png')} 
            />
            <View style = {styles.formSpaces}>
                <Text style = {styles.textForm}>Correo Electrónico</Text>
                <TextInput
                style = {styles.textbox} 
                placeholder='Dirección de Correo Electrónico' />
            </View>
            <View style = {styles.formSpaces}>
                <Text style = {styles.textForm}>Contraseña</Text>
                <TextInput
                style = {styles.textbox} 
                placeholder='Contraseña' />
            </View>
            <TouchableOpacity 
            style = {styles.loginButton}
            activeOpacity={0.5}>
                <Text style = {styles.loginButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
            
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 30,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Montserrat",
        
    },
    intro: {
        fontSize: 32,
    },
    formSpaces: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
    },
    textForm: {
        fontSize: 16,
    },
    textbox: {
        backgroundColor: "#BBBBBB",
        width: 295,
        height: 35,
        borderRadius: 7,
        textAlign: 'center',
    },
    logo: {
        width: 295,
        height: 98
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#F09600',
        width: 309,
        height: 40,
        borderRadius: 20
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 500,
    }
});


export default LoginScreen;