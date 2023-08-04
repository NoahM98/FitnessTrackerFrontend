import { BASE_URL } from "./api-keys";

export const fetchRoutines = async () => {
    try {
        const response = await fetch(`${BASE_URL}/routines`);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}

export const registerUser = async ({ username, password }) => {
    try {
        const response = await fetch(
            `${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        });
        const result = await response.json();
        console.log(result)
        return result
    } catch (err) {
        console.error(err);
    }
}

export const loginUser = async ({ username, password }) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await response.json();
        console.log(result);
        return result
    } catch (err) {
        console.error(err);
    }
}
