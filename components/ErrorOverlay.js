import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

export default function ErrorOverlay({ message, tryAgainHandler }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={tryAgainHandler}>Try Again</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    text: {
        textAlign: "center",
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
