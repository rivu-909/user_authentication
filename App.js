import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import LoadingOverlay from "./components/LoadingOverlay";
import UserSignIn from "./screens/UserSignIn";
import UserSignUp from "./screens/UserSignUp";
import Welcome from "./screens/Welcome";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();

// Both navigation stack are kept separate from each other
function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="UserSignIn" component={UserSignIn} />
            <Stack.Screen name="UserSignUp" component={UserSignUp} />
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
    );
}

function Navigation() {
    const authCtx = useContext(AuthContext);
    const [appLoading, setAppLoading] = useState(true);

    useEffect(() => {
        // one time run for the stored token (if any) in local device
        async function fetchToken() {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                if (storedToken) {
                    authCtx.authenticate(storedToken);
                }
            } catch (error) {
                console.log(error);
            }
            setAppLoading(false);
        }
        fetchToken();
    }, []);

    return appLoading ? (
        <LoadingOverlay />
    ) : (
        <NavigationContainer>
            {!authCtx.isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <AuthContextProvider>
                <Navigation />
            </AuthContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
