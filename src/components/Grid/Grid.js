import React, { useState, useEffect } from "react";
import "./Grid.css";
import { Node } from "../Node/Node";
import { initGrid } from "../../utils/mazeUtils";
import { primsAlgorithm } from "../../utils/mazeGeneration/prims";
import { recursiveBacktracker } from "../../utils/mazeGeneration/recursiveBacktracker";
import { dijkstra } from "../../utils/pathfinding/dijkstra";
import { aStar } from "../../utils/pathfinding/aStar";

export const Grid = (props) => {
    const [grid, setGrid] = useState([[]]);
    let count = 1; // Used for delayed individual node rendering

    useEffect(() => {
        switch (props.status) {
            case "create":
                const maze = getMaze(props.maze);
                getNewMaze(maze, [...grid]);
                break;
            case "solve":
                const aStarMaze = getPathfinding(props.pathfinding);
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
            return dijkstra(grid);
        }
    };

    const getNewMaze = (maze, oldGrid) => {
        maze.forEach((node) => {
            // Make a shallow copy of the specific node and update properties
            const gridNode = { ...oldGrid[node.row][node.col] };
            gridNode.row = node.row;
            gridNode.col = node.col;
            gridNode.walls = node.walls;
            gridNode.visited = node.visited;
            gridNode.isPathNode = node.isPathNode;

            // Put it back in the array
            oldGrid[node.row][node.col] = gridNode;

            // Set new grid with updated node
            setGrid(oldGrid);
        });
    };

    return (
        <table className="grid">
            <tbody>
                {grid.map((row, rowIndex) => (
                    <tr className="grid-row" key={rowIndex}>
                        {row.map((node, key) => {
                            const {
                                row,
                                col,
                                visited,
                                walls,
                                isPathNode,
                            } = node;
                            count++;

                            return (
                                <Node
                                    {...{
                                        key,
                                        row,
                                        col,
                                        visited,
                                        walls,
                                        count,
                                        isPathNode,
                                    }}
                                ></Node>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
