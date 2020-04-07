import React, { useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid/Grid";

const App = () => {
    const [mode, setMode] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        setMode(e.target.name);
    };

    return (
        <div className="container">
            <header>
                <button
                    name="start-node"
                    disabled={mode === "start"}
                    onClick={handleClick}
                >
                    SET START
                </button>
                <button
                    name="goal-node"
                    disabled={mode === "start"}
                    onClick={handleClick}
                >
                    SET GOAL
                </button>
                <button
                    name="wall-node"
                    disabled={mode === "start"}
                    onClick={handleClick}
                >
                    SET WALLS
                </button>
                <button name="clear" onClick={handleClick}>
                    CLEAR
                </button>
                <button name="start" onClick={handleClick}>
                    START
                </button>
            </header>
            <Grid mode={mode} />
        </div>
    );
};

export default App;
