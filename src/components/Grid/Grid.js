import React, { useEffect } from "react";
import { Node } from "../Node/Node";
import { primsAlgorithm } from "../../utils/mazeGeneration/prims";
import { recursiveBacktracker } from "../../utils/mazeGeneration/recursiveBacktracker";
import { dijkstra } from "../../utils/pathfinding/dijkstra";
import { aStar } from "../../utils/pathfinding/aStar";
import MazeUtils from "../../utils/mazeUtils";
import NodeUtils from "../../utils/nodeUtils";
import "./Grid.css";

let grid = MazeUtils.initGrid();

export const Grid = (props) => {
    useEffect(() => {
        switch (props.status) {
            case "create":
                if (props.maze === "Recursive Backtracker") {
                    const recursive = recursiveBacktracker(grid);
                    generateMaze(recursive, 0);
                } else if (props.maze === "Prim's") {
                    const prims = primsAlgorithm(grid);
                    generateMaze(prims, 0);
                }
                break;
            case "solve":
                if (props.pathfinding === "A* Search") {
                    const pathfinding = aStar(grid);
                    generateMaze(pathfinding, 0);
                } else if (props.pathfinding === "Dijkstra's") {
                    const pathfinding = dijkstra(grid);
                    generateMaze(pathfinding, 0);
                }

                setTimeout(() => {
                    const path = MazeUtils.generatePath(grid[24][24]);
                    generateMaze(path, 0);
                }, 9000);
                break;
            default:
                // Reset grid to initial state and reset all node styles
                grid.splice(0, grid.length, ...MazeUtils.initGrid());
                grid.forEach((row) => {
                    row.forEach((node) => {
                        NodeUtils.resetNodeStyle(node);
                    });
                });
                break;
        }
    }, [props.status]);

    const generateMaze = (algorithm, index) => {
        if (index < algorithm.length) {
            setTimeout(() => {
                // Update css of current node
                NodeUtils.updateNodeStyle(algorithm[index]);

                // Recursive call with updated index
                generateMaze(algorithm, index + 1);
            }, 25);
        }
    };

    return (
        <table className="grid">
            <tbody>
                {grid.map((row, rowIndex) => (
                    <tr className="grid-row" key={rowIndex}>
                        {row.map((node, key) => {
                            return <Node node={node} key={key}></Node>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
