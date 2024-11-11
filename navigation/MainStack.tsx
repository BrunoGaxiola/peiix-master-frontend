import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import LogOutScreen from "../screens/LogOutScreen";
import MainNavigationContainer from "./MainNavigationContainer";
const Stack = createStackNavigator();

// Este componente sirve para separar las páginas entre el inicio de sesión, la app principal y el cierre de sesión.
function MainStack() {
    return(
        <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name = 'Login' component={LoginScreen}/>
            <Stack.Screen name = 'MainContainer' component={MainNavigationContainer}/>
            <Stack.Screen name="LogOutScreen" component={LogOutScreen}/>
        </Stack.Navigator>
    );
}

export default MainStack;