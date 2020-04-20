import React, { useState, useEffect } from "react";
import "./Grid.css";
import { Cell } from "../Cell/Cell";
import { primsMaze } from "../../algorithms/maze";

export const Grid = (props) => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        console.log(props.status);
        switch (props.status) {
            case "generate":
                const primsGrid = primsMaze(grid);
                setGrid(primsGrid);
                break;
            case "start":
                break;
            default:
                setGrid(initGrid);
                break;
        }
    }, [props.status]);

    const initGrid = () => {
        const newGrid = [];
        for (let row = 0; row < 20; row++) {
            newGrid[row] = []; // Current row
            for (let col = 0; col < 20; col++) {
                const cell = createCell(row, col);
                newGrid[row].push(cell);
            }
        }
        return newGrid;
    };

    const createCell = (row, col) => {
        return {
            row,
            col,
            visited: false,
            walls: [true, true, true, true],
        };
    };

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
