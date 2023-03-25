import { StyleSheet, Text, TextInput } from "react-native";

export default function Input({ children, textInputConfig, invalid }) {
    return (
        <>
            <Text style={[styles.label, invalid && styles.errorLabel]}>
                {children}
            </Text>
            <TextInput
                style={[styles.input, invalid && styles.errorInput]}
                {...textInputConfig}
            />
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        margin: 4,
    },
    input: {
        padding: 4,
        borderColor: "black",
        borderWidth: 1,
        minWidth: 250,
        borderRadius: 4,
        marginBottom: 12,
    },
    errorLabel: {
        color: "red",
    },
    errorInput: {
        borderColor: "red",
    },
});
