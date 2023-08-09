import React from "react";
import Register from "./Register";
import Login from "./Login";
import Button from 'react-bootstrap/Button';

const Login_Logout = ({ token, setToken, currentUser }) => {
    return (
        <div id="login-logout-page">
            {!token ?
                <>
                    <Login setToken={setToken} />
                    <Register setToken={setToken} />
                </>
                :
                <>
                    <h1>You are logged in as: {currentUser.username}</h1>
                    <Button variant="primary" onClick={() => {
                        localStorage.removeItem("token");
                        setToken('');
                    }}>Logout</Button>
                </>
            }
        </div>
    )
}

export default Login_Logout;
