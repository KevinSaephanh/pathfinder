import React, { useState, useEffect } from "react";
import "./Grid.css";
import { Cell } from "../Cell/Cell";
import { initGrid } from "../../utils/mazeUtils";
import { primsAlgorithm } from "../../utils/mazeGeneration/prims";
import { recursiveBacktracker } from "../../utils/mazeGeneration/recursiveBacktracker";
import { aStar } from "../../utils/aStar";

export const Grid = (props) => {
    const [grid, setGrid] = useState([[]]);
    let count = 1; // Used for delayed individual cell rendering

    useEffect(() => {
        switch (props.status) {
            case "create":
                const maze = getMaze(props.maze);
                getNewMaze(maze, [...grid]);
                break;
            case "solve":
                const aStarMaze = aStar(grid);
                getNewMaze(aStarMaze, [...grid]);
                break;
            default:
                setGrid(initGrid);
                break;
        }
    }, [props.status]);

    const getMaze = (algorithm) => {
        if (algorithm === "Recursive Backtracker") {
            return recursiveBacktracker(grid);
        } else if (algorithm === "Prim's") {
            return primsAlgorithm(grid);
        }
    };

    const getPathfinding = (algorithm) => {
        if (algorithm === "A* Search") {
            return aStar(grid);
        } else if (algorithm === "Dijkstra's") {
            return;
        }
    };

    const getNewMaze = (maze, oldGrid) => {
        maze.forEach((cell) => {
            // Make a shallow copy of the specific cell and update properties
            const gridCell = { ...oldGrid[cell.row][cell.col] };
            gridCell.row = cell.row;
            gridCell.col = cell.col;
            gridCell.walls = cell.walls;
            gridCell.visited = cell.visited;
            gridCell.isPathNode = cell.isPathNode;

            // Put it back in the array
            oldGrid[cell.row][cell.col] = gridCell;

            // Set new grid with updated cell
            setGrid(oldGrid);
        });
    };

    return (
        <table className="grid">
            <tbody>
                {grid.map((row, rowIndex) => (
                    <tr className="grid-row" key={rowIndex}>
                        {row.map((cell, key) => {
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
                                    {...{
                                        key,
                                        row,
                                        col,
                                        visited,
                                        walls,
                                        count,
                                        isPathNode,
                                    }}
                                ></Cell>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
