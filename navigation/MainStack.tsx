import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import MainNavigationContainer from "./MainNavigationContainer";
const Stack = createStackNavigator();

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
        </Stack.Navigator>
    );
}

export default MainStack;