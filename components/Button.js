import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Button({ children, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.button}>
                <Text style={styles.buttonText}>{children}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: "black",
        minWidth: 80,
        margin: 8,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    pressed: {
        opacity: 0.75,
        borderRadius: 4,
    },
});
