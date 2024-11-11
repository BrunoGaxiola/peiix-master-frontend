import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const LogOutScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const back = useNavigation();

    return(
        <SafeAreaView style={styles.logOutScreenContainer}>
            <View style={styles.backButton}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back-circle" size={64} color='#000000'
                    onPress={() => {
                        back.goBack();
                    }}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logOutButton}
            onPress={() => {
                navigation.navigate('Login');
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
        fontFamily: 'Montserrat',
        fontSize: 20,
        fontWeight: '500'
    }
});

export default LogOutScreen;