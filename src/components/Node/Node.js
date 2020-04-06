import React from "react";
import "./Node.css";

export const Node = (props) => {
    const { isStart, isGoal, isWall } = props;
    let nodeType = "";

    // Change node type value depending on props passed node specific node
    if (isStart) nodeType = "start-node";
    else if (isGoal) nodeType = "goal-node";
    else if (isWall) nodeType = "wall-node";

    return <td className={`node ${nodeType}`}></td>;
};
