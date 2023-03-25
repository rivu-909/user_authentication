import axios from "axios";
import { API_KEY } from "./apiKey";

const url = "https://identitytoolkit.googleapis.com/v1/accounts:";

async function authenticate(mode, email, password) {
    const response = await axios.post(`${url}${mode}?key=${API_KEY}`, {
        email: email,
        password: password,
        returnSecureToken: true,
    });
    return response.data.idToken;
}

export function createUser(email, password) {
    return authenticate("signUp", email, password);
}

export function logIn(email, password) {
    return authenticate("signInWithPassword", email, password);
}
