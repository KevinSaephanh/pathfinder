import React, { useState, useEffect, useRef } from "react";
import "./Cell.css";

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export const Cell = (props) => {
    const [cellData, setCellData] = useState({
        row: props.row,
        col: props.col,
        visited: props.visited,
        walls: props.walls,
    });
    const { row, col, visited, walls } = cellData;

    useEffect(() => {
        // Set each cell in sequence to animate
        // the generation of the maze
        const interval = setInterval(() => {
            setCellData({
                row: props.row,
                col: props.col,
                visited: props.visited,
                walls: props.walls,
            });
        }, 50 * props.count);

        return () => {
            clearInterval(interval);
        };
    }, [props.walls]);

    return (
        <td
            key={`(${row},${col})`}
            id={`cell-${row}-${col}`}
            className={`cell 
                top-${walls[0]} 
                bottom-${walls[1]} 
                right-${walls[2]} 
                left-${walls[3]} 
                visited-${visited}`}
        ></td>
    );
};
