import React, { useState, useEffect } from "react";
import "./Node.css";

export const Node = (props) => {
    const [nodeData, setNodeData] = useState({
        row: null,
        col: null,
        visited: false,
        walls: [true, true, true, true],
        isPathNode: false,
    });
    const { row, col, visited, walls, isPathNode } = nodeData;

    useEffect(() => {
        // Set each node in sequence to animate
        // the generation of the maze
        const interval = setInterval(() => {
            setNodeData(props);
        }, 5 * props.count);

        return () => {
            clearInterval(interval);
        };
    }, [props]);

    return (
        <td
            key={`(${row},${col})`}
            id={`node-${row}-${col}`}
            className={`node 
                top-${walls[0]} 
                bottom-${walls[1]} 
                right-${walls[2]} 
                left-${walls[3]} `}
        >
            {visited ? (
                <div className={`visited-${visited} path-${isPathNode}`}></div>
            ) : null}
        </td>
    );
};
