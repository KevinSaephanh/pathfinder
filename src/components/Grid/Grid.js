import React, { useState, useEffect } from "react";
import "./Grid.css";
import { Cell } from "../Cell/Cell";
import { primsMaze, initGrid } from "../../utils/maze";

export const Grid = (props) => {
    const [grid, setGrid] = useState([[]]);

    useEffect(() => {
        switch (props.status) {
            case "generate":
                setGrid([]);
                setPrimsMaze();
                break;
            case "start":
                break;
            default:
                setGrid(initGrid);
                break;
        }
    }, [props.status]);

    const setPrimsMaze = () => {
        const primsGrid = primsMaze();
        let i = 1;
        primsGrid.map((row) => {
            return row.map((cell) => {
                i++;
                return setTimeout(() => {
                    setGrid({ ...grid[cell.row], cell });
                }, 700 * i);
            });
        });
    };

    console.log(grid);
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
