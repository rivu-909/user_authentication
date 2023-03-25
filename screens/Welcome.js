import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { AuthContext } from "../store/auth-context";

export default function Welcome() {
    const authCtx = useContext(AuthContext);

    function logOutHandler() {
        authCtx.logout();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.text}>You are successfully logged in</Text>
            <Button onPress={logOutHandler}>Log Out</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        // justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        margin: 16,
    },
    text: {
        fontSize: 16,
    },
});
