import React, { useState, useEffect } from "react";
import "./Cell.css";

export const Cell = (props) => {
    const [cellData, setCellData] = useState({
        row: null,
        col: null,
        visited: false,
        walls: [],
    });
    const { row, col, visited, walls } = cellData;

    useEffect(() => {
        setCellData({
            row: props.row,
            col: props.col,
            visited: props.visited,
            walls: props.walls,
        });
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
