import React, { useState } from "react";
import { loginUser } from "../api/ajax-helpers";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (username.length >= 6 && password.length >= 6 &&
            !(username.indexOf(' ') >= 0) && !(password.indexOf(' ') >= 0)) {
            console.log("Valid Form")
            const result = await loginUser({ username, password });
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
            <h2>Login</h2>
            <Form.Group className="m-2">
                <Form.Label htmlFor="user-name">
                    Username:
                </Form.Label>
                <Form.Control
                    id="user-name"
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
                <Form.Label htmlFor="pass-word">
                    Password:
                </Form.Label>
                <Form.Control
                    id="pass-word"
                    type="password"
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);

                    }}

                />
            </Form.Group>
            <Button className="m-2" variant="primary" type='submit'>Submit</Button>
        </Form>
    )
}

export default Login;
