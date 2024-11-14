import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

// Componente de encabezado de la aplicación principal.
const Header = ({ navigation }: { navigation: NavigationProp<any> }) => {
    return(
        <SafeAreaView style={styles.headerContainer}>
            <Image 
            style={styles.peiixLogo}
            source={require('../assets/images/peiixlogo.png')}
            />
            <MaterialCommunityIcons name="logout" size={48} color='#FFFFFF'
            onPress={() => {
                navigation.navigate('LogOutScreen') // Navegar a la pantalla de logout.
            }}
            />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        justifyContent:'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
    },
    peiixLogo: {
        width:157,
        height: 52
    }
});

export default Header;

