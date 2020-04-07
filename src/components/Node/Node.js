import React, { useState } from "react";
import "./Node.css";

export const Node = (props) => {
    const [nodeType, setNodeType] = useState("");

    const handleMouseDown = () => {
        setNodeType(props.mode);
        console.log(props.mode);
    };

    const EventListenerMode = { capture: true };

    const mousemoveListener = (e) => {
        e.stopPropagation();
        setNodeType(props.mode);
        console.log(props.mode);
    };

    const mouseupListener = (e) => {
        document.removeEventListener(
            "mouseup",
            mouseupListener,
            EventListenerMode
        );
        document.removeEventListener(
            "mousemove",
            mousemoveListener,
            EventListenerMode
        );
        e.stopPropagation();
    };

    const captureMouseEvents = (e) => {
        document.addEventListener(
            "mouseup",
            mouseupListener,
            EventListenerMode
        );
        document.addEventListener(
            "mousemove",
            mousemoveListener,
            EventListenerMode
        );
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <td
            className={`node ${nodeType}`}
            onMouseDown={captureMouseEvents}
        ></td>
    );
};
