import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Header = () => {
    return(
        <SafeAreaView style={styles.headerContainer}>
            <Image 
            style={styles.peiixLogo}
            source={require('../assets/images/peiixlogo.png')}
            />
            <MaterialCommunityIcons name="logout" size={48} color='#FFFFFF'/>
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

