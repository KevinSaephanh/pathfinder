import React, { useState } from "react";
import { Grid } from "./components/Grid/Grid";
import { Navbar } from "./components/Navbar/Navbar";
import { Container } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [status, setStatus] = useState("");
    const [maze, setMaze] = useState("maze");
    const [pathfinding, setPathfinding] = useState("pathfinding");

    const handleClickStatus = (e) => {
        e.preventDefault();
        setStatus(e.target.name);
    };

    const handleClickMaze = (e) => {
        e.preventDefault();
        setMaze(e.target.name);
    };

    const handleClickPathfinding = (e) => {
        e.preventDefault();
        setPathfinding(e.target.name);
    };

    console.log(maze);
    console.log(status);
    console.log(pathfinding);

    return (
        <Container fluid>
            <Navbar
                status={status}
                maze={maze}
                pathfinding={pathfinding}
                handleClickStatus={handleClickStatus}
                handleClickMaze={handleClickMaze}
                handleClickPathfinding={handleClickPathfinding}
            />
            <Grid status={status} maze={maze} pathfinding={pathfinding} />
        </Container>
    );
};

export default App;
