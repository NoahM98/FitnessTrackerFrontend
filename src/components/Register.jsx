import React, { useState } from "react";
import { registerUser } from "../api/ajax-helpers";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        if (username.length >= 6 && password.length >= 6 && password === confirmPassword
            && !(username.indexOf(' ') >= 0) && !(password.indexOf(' ') >= 0)) {
            const result = await registerUser({ username, password });
            if (result.success) {
                alert(result.data.message);
                setUsername('');
                setPassword('');
                localStorage.setItem("token", result.data.token);
                setToken(result.data.token);
            } else if (result.token) {
                alert(result.message);
                setUsername('');
                setPassword('');
                localStorage.setItem("token", result.token);
                setToken(result.token);
            } else {
                alert(result.message);
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            }

        } else {
            alert("Invalid Form");
        }

    }

    return (
        <Form className="form m-5 p-3 border border-3 border-primary rounded text-bg-light"
            onSubmit={async (event) => {
                event.preventDefault();
                await handleSubmit();
            }}>
            <h2>Registration Form</h2>
            <Form.Group className="m-2">
                <Form.Label htmlFor="userName">
                    Username:
                </Form.Label>
                <Form.Control
                    id="userName"
                    type="text"
                    placeholder="Enter Username"
                    required
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);

                    }}

                />
            </Form.Group>
            <Form.Group className="m-2">
                <Form.Label htmlFor="passWord">
                    Password:
                </Form.Label>
                <Form.Control
                    id="passWord"
                    type="password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);

                    }}

                />
            </Form.Group>
            <Form.Group className="m-2">
                <Form.Label htmlFor="confirm-passWord">
                    Confirm Password:
                </Form.Label>
                <Form.Control
                    id="confirm-passWord"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value);

                    }}

                />
            </Form.Group>
            <Button className="m-2" variant="primary" type='submit'>Submit</Button>
        </Form>
    )
}

export default Register;
