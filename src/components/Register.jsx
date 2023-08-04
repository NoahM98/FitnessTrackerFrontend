import React, { useState } from "react";
import { registerUser } from "../api/ajax-helpers";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        if (username.length >= 6 && password.length >= 6 && password === confirmPassword
            && !(username.indexOf(' ') >= 0) && !(password.indexOf(' ') >= 0)) {
            const result = await registerUser({ username, password });
            if (result.success) {
                alert(result.data.message);
                // setToken and store it in local storage
            } else {
                alert(result.error.message);
            }

        }

    }

    return (
        <h2>Registration Form</h2>
    )
}

export default Register;
