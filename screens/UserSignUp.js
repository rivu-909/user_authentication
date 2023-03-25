import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import ErrorOverlay from "../components/ErrorOverlay";
import Input from "../components/Input";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";

export default function UserSignIn() {
    const [inputs, setInputs] = useState({
        email: "",
        cnfEmail: "",
        password: "",
        cnfPassword: "",
    });

    const [validity, setValidity] = useState({
        email: true,
        cnfEmail: true,
        password: true,
        cnfPassword: true,
    });

    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: enteredValue,
            };
        });
    }

    const authCtx = useContext(AuthContext);

    async function signUpHandler() {
        // input validation
        const emailIsValid = inputs.email.includes("@");
        const passwordIsValid = inputs.password.length > 6;
        const emailMatch = inputs.email === inputs.cnfEmail;
        const passwordMatch = inputs.password === inputs.cnfPassword;

        if (
            !emailIsValid ||
            !passwordIsValid ||
            !emailMatch ||
            !passwordMatch
        ) {
            setValidity({
                email: emailIsValid,
                cnfEmail: emailMatch,
                password: passwordIsValid,
                cnfPassword: passwordMatch,
            });
            return;
        }

        // input validation succeeded
        setIsAuthenticating(true);
        try {
            const token = await createUser(inputs.email, inputs.password);
            authCtx.authenticate(token);
        } catch (error) {
            console.log(error);
            // we set the values in catch as if authentication succeeds then
            // user will be taken to another navigation stack
            setHasFailed(true);
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay />;
    }

    if (!isAuthenticating && hasFailed) {
        function tryAgainHandler() {
            setHasFailed(false);
        }
        return (
            <ErrorOverlay
                message="Login failed"
                tryAgainHandler={tryAgainHandler}
            />
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <Input
                invalid={!validity.email}
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, "email"),
                    value: inputs.email,
                    placeholder: "abc@xyz.com",
                }}
            >
                Email
            </Input>
            <Input
                invalid={!validity.cnfEmail}
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, "cnfEmail"),
                    value: inputs.cnfEmail,
                    placeholder: "abc@xyz.com",
                }}
            >
                Confirm Email
            </Input>
            <Input
                invalid={!validity.password}
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, "password"),
                    value: inputs.password,
                    secureTextEntry: true,
                }}
            >
                Password
            </Input>
            <Input
                invalid={!validity.cnfPassword}
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, "cnfPassword"),
                    value: inputs.cnfPassword,
                    secureTextEntry: true,
                }}
            >
                Confirm Password
            </Input>
            <Button onPress={signUpHandler}>Sign Up</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        margin: 16,
    },
});
