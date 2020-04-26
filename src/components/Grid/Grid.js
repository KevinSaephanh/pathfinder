import React, { useState, useEffect } from "react";
import "./Grid.css";
import { Cell } from "../Cell/Cell";
import { primsMaze, initGrid } from "../../utils/maze";

export const Grid = (props) => {
    const [grid, setGrid] = useState([[]]);
    let count = 1; // Used for delayed individual cell rendering

    useEffect(() => {
        switch (props.status) {
            case "generate":
                setGrid(primsMaze(grid));
                break;
            case "solve":
                break;
            default:
                setGrid(initGrid);
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
                            count++;

                            return (
                                <Cell
                                    key={nodeIndex}
                                    row={row}
                                    col={col}
                                    visited={visited}
                                    walls={walls}
                                    count={count}
                                ></Cell>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
