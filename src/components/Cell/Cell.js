import React, { useState } from "react";
import "./Cell.css";

export const Cell = (props) => {
    const [cellType, setCellType] = useState("");
    const { row, col, visited, walls } = props;

    return (
        <td
            key={`(${row},${col})`}
            className={`cell ${cellType} 
                top-${walls[0]} 
                bottom-${walls[1]} 
                right-${walls[2]} 
                left-${walls[3]} 
                visited-${visited}`}
        ></td>
    );
};
