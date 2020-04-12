import React, { useState, useEffect } from "react";
import "./Grid.css";
import { Cell } from "../Cell/Cell";
import { initGrid, primsMaze } from "../../algorithms/maze";

export const Grid = (props) => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        console.log(props.status);
        switch (props.status) {
            case "generate":
                console.log("GENERATING");
                setGrid(primsMaze(grid));
                break;
            case "start":
                console.log("STARTING");
                break;
            default:
                console.log("DRAWING GRID");
                setGrid(initGrid());
                break;
        }
    }, [props.status]);

    return (
        <table className="grid">
            <tbody>
                {grid.map((row, rowIndex) => (
                    <tr className="grid-row" key={rowIndex}>
                        {row.map((cell, nodeIndex) => {
                            const { row, col, visited, walls } = cell;

                            return (
                                <Cell
                                    key={nodeIndex}
                                    row={row}
                                    col={col}
                                    visited={visited}
                                    walls={walls}
                                ></Cell>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
