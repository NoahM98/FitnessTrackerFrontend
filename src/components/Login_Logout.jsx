import React from "react";
import Register from "./Register";
import Login from "./Login";

const Login_Logout = () => {
    return (
        <div id="login-logout-page">
            <h1>Login/Logout Page!</h1>
            <Login />
            <Register />
        </div>
    )
}

export default Login_Logout;
