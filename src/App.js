import React, { useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid/Grid";

const App = () => {
    const [status, setStatus] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();
        setStatus(e.target.name);
    };

    return (
        <div className="container">
            <header>
                <button
                    name="generate"
                    disabled={status === "start"}
                    onClick={handleClick}
                >
                    GENERATE
                </button>
                <button name="clear" onClick={handleClick}>
                    CLEAR
                </button>
                <button
                    name="start"
                    disabled={status !== "generate"}
                    onClick={handleClick}
                >
                    START
                </button>
            </header>
            <Grid status={status} />
        </div>
    );
};

export default App;
