import React from "react";
import "./Node.css";

export const Node = (props) => {
    const { row, col } = props.node;

    return (
        <td
            key={`(${row},${col})`}
            id={`node-${row}-${col}`}
            className={`node`}
        ></td>
    );
};