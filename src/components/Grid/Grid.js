import React, { useState, useEffect } from "react";
import "./Grid.css";
import { Cell } from "../Cell/Cell";
import { primsMaze, initGrid } from "../../utils/maze";
import { aStar } from "../../utils/aStar";

export const Grid = (props) => {
    const [grid, setGrid] = useState([[]]);
    let count = 1; // Used for delayed individual cell rendering

    useEffect(() => {
        switch (props.status) {
            case "generate":
                primsMaze(grid);
                break;
            case "solve":
                setGrid(aStar([...grid]));
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
                            const {
                                row,
                                col,
                                visited,
                                walls,
                                isPathNode,
                            } = cell;
                            count++;

                            return (
                                <Cell
                                    key={nodeIndex}
                                    row={row}
                                    col={col}
                                    visited={visited}
                                    walls={walls}
                                    count={count}
                                    isPathNode={isPathNode}
                                ></Cell>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
