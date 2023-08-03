import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home.jsx";
import Routines from "./components/Routines.jsx";
import MyRoutines from "./components/MyRoutines.jsx";
import Activities from "./components/Activities.jsx";
import Login_Logout from "./components/Login_Logout.jsx"
import { fetchRoutines } from "./api/ajax-helpers";

function App() {
    const [allRoutines, setAllRoutines] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const routinesPromise = fetchRoutines();
        Promise.all([routinesPromise])
            .then(res => setAllRoutines(res[0]));
    }, [token])

    return (
        <BrowserRouter>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/Home">Home</Link></li>
                        <li><Link to="/Routines">Routines</Link></li>
                        <li><Link to="/My_Routines">My Routines</Link></li>
                        <li><Link to="/Activities">Activities</Link></li>
                        <li><Link to="/Login_Logout">Login/Logout</Link></li>
                    </ul>
                </nav>
                <div>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/Home">
                        <Home />
                    </Route>
                    <Route path="/Routines">
                        <Routines allRoutines={allRoutines} />
                    </Route>
                    <Route path="/My_Routines">
                        <MyRoutines />
                    </Route>
                    <Route path="/Activities">
                        <Activities />
                    </Route>
                    <Route path="/Login_Logout">
                        <Login_Logout />
                    </Route>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
