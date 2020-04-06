import React, { useState, useEffect } from "react";
import "./Grid.css";
import { Node } from "../Node/Node";

export const Grid = (props) => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        drawGrid();
    }, []);

    const drawGrid = () => {
        const grid = [];
        for (let row = 0; row < 20; row++) {
            grid[row] = []; // Current row
            for (let col = 0; col < 20; col++) {
                grid[row].push(createNode(row, col));
            }
        }
        setGrid(grid);
    };

    const createNode = (row, col) => {
        return {
            row,
            col,
            isStart: false,
            isGoal: false,
            isWall: false,
        };
    };

    const handleClick = () => {
        console.log(props.gameState);
    };

    return (
        <table className="grid">
            <tbody>
                {grid.map((row, rowIndex) => (
                    <tr className="grid-row" key={rowIndex}>
                        {row.map((node, nodeIndex) => {
                            const { row, col, isStart, isGoal, isWall } = node;

                            return (
                                <Node
                                    key={nodeIndex}
                                    row={row}
                                    col={col}
                                    isStart={isStart}
                                    isGoal={isGoal}
                                    isWall={isWall}
                                    onClick={handleClick}
                                ></Node>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
