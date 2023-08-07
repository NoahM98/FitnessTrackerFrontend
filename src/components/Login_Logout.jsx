import React from "react";
import Register from "./Register";
import Login from "./Login";
import Button from 'react-bootstrap/Button';

const Login_Logout = ({ token, setToken }) => {
    return (
        <div id="login-logout-page">
            <h1>Login/Logout Page!</h1>
            {!token ?
                <>
                    <Login setToken={setToken} />
                    <Register setToken={setToken} />
                </>
                :
                <>
                    <h1>You are Logged In</h1>
                    <Button variant="secondary" onClick={() => {
                        setToken('');
                        localStorage.removeItem("token");
                    }}>Logout</Button>
                </>
            }
        </div>
    )
}

export default Login_Logout;
