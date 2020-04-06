import React, { useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid/Grid";

const App = () => {
    const [buttons, setButtons] = useState({
        startNode: false,
        goalNode: false,
        restart: false,
        start: false,
    });

    const handleClick = (e) => {
        e.preventDefault();
        const { name } = e.target;
        setButtons((buttons) => ({ ...buttons, [name]: !buttons[name] }));
    };

    return (
        <div className="container">
            <header>
                <button name="startNode" onClick={handleClick}>
                    SET START
                </button>
                <button name="goalNode" onClick={handleClick}>
                    SET GOAL
                </button>
                <button name="restart" onClick={handleClick}>
                    RESTART
                </button>
                <button name="start" onClick={handleClick}>
                    START
                </button>
            </header>
            <Grid gameState={buttons} />
        </div>
    );
};

export default App;
