import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import ErrorOverlay from "../components/ErrorOverlay";
import Input from "../components/Input";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { logIn } from "../util/auth";

export default function UserSignIn({ navigation }) {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [validity, setValidity] = useState({
        email: true,
        password: true,
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

    async function logInHandler() {
        // input validation
        const emailIsValid = inputs.email.includes("@");
        const passwordIsValid = inputs.password.length > 6;

        if (!emailIsValid || !passwordIsValid) {
            setValidity({
                email: emailIsValid,
                password: passwordIsValid,
            });
            return;
        }

        // validation succeeded
        setIsAuthenticating(true);
        try {
            const token = await logIn(inputs.email, inputs.password);
            authCtx.authenticate(token);
        } catch (error) {
            console.log(error);
            setHasFailed(true);
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay />;
    }

    if (!isAuthenticating && hasFailed) {
        function tryAgainHandler() {
            setInputs({
                email: "",
                password: "",
            });
            setHasFailed(false);
        }
        return (
            <ErrorOverlay
                message="Login failed"
                tryAgainHandler={tryAgainHandler}
            />
        );
    }

    function goToSignUpHandler() {
        navigation.navigate("UserSignUp");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>
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
                invalid={!validity.password}
                textInputConfig={{
                    onChangeText: inputChangedHandler.bind(this, "password"),
                    value: inputs.password,
                    secureTextEntry: true,
                }}
            >
                Password
            </Input>
            <Button onPress={logInHandler}>Log In</Button>
            <Button onPress={goToSignUpHandler}>Create new user</Button>
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
