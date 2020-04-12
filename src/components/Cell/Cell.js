import React, { useState } from "react";
import "./Cell.css";

export const Cell = (props) => {
    const [cellType, setCellType] = useState("");

    return <td className={`cell ${cellType} visited-${props.visited}`}></td>;
};
