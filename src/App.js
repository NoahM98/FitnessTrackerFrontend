import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home.jsx";
import Routines from "./components/Routines.jsx";
import MyRoutines from "./components/MyRoutines.jsx";
import Activities from "./components/Activities.jsx";
import Login_Logout from "./components/Login_Logout.jsx"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { fetchRoutines, fetchActivities, fetchUser, fetchUserRoutines } from "./api/ajax-helpers";

function App() {
    const [token, setToken] = useState('');
    const [allRoutines, setAllRoutines] = useState([]);
    const [allActivities, setAllActivities] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [myRoutines, setMyRoutines] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            const routinesPromise = fetchRoutines();
            const activitiesPromise = fetchActivities();
            const userPromise = fetchUser(storedToken);
            Promise.all([routinesPromise, activitiesPromise, userPromise])
                .then(async (res) => {
                    setAllRoutines(res[0]);
                    setAllActivities(res[1]);
                    setCurrentUser(res[2]);
                    const userRoutines = await fetchUserRoutines(storedToken, res[2].username);
                    setMyRoutines(userRoutines);
                })

        } else {
            const routinesPromise = fetchRoutines();
            const activitiesPromise = fetchActivities();
            Promise.all([routinesPromise, activitiesPromise])
                .then((res) => {
                    setAllRoutines(res[0]);
                    setAllActivities(res[1]);
                });
        }
    }, [token])

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar sticky="top" bg="primary" variant="dark" expand="lg">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>Noah's Fitness Tracker!</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav className="mr-auto">
                                <LinkContainer to="/Home">
                                    <Nav.Link>Home</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/Routines">
                                    <Nav.Link>Routines</Nav.Link>
                                </LinkContainer>
                                {token ?
                                    <LinkContainer to="/My_Routines">
                                        <Nav.Link>My Routines</Nav.Link>
                                    </LinkContainer>
                                    : null}
                                <LinkContainer to="/Activities">
                                    <Nav.Link>Activities</Nav.Link>
                                </LinkContainer>
                                {token ?
                                    <LinkContainer to="/Login_Logout">
                                        <Nav.Link>Logout</Nav.Link>
                                    </LinkContainer> :
                                    <LinkContainer to="/Login_Logout">
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div id="main-section">
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
                        <Activities allActivities={allActivities} />
                    </Route>
                    <Route path="/Login_Logout">
                        <Login_Logout token={token} setToken={setToken} currentUser={currentUser} />
                    </Route>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
