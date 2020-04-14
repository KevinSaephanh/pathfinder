import React, { useState } from "react";
import "./Cell.css";

export const Cell = (props) => {
    const [cellType, setCellType] = useState("");
    const { row, col, visited, walls } = props;

    return (
        <td
            key={`(${row},${col})`}
            className={`cell ${cellType} 
                right-${walls[0]} 
                left-${walls[1]} 
                top-${walls[2]} 
                bottom-${walls[3]} 
                visited-${visited}`}
        ></td>
    );
};
