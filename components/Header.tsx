import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Header = () => {
    return(
        <View style={styles.headerContainer}>
            <Image 
            style={styles.peiixLogo}
            source={require('../assets/images/peiixlogo.png')}
            />
            <MaterialCommunityIcons name="logout" size={48} color='#FFFFFF'/>
        </View>
    );

}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        justifyContent:'space-between',
        padding: 30,
        paddingTop: 60,
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

