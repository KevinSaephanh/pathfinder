export default class NodeUtils {
    // Update css of node style after running generate, clear, or solve
    static updateNodeStyle = (node) => {
        const nodeStyle = document.getElementById(
            `node-${node.row}-${node.col}`
        ).style;

        if (!node.walls[0]) nodeStyle.borderTop = "none";
        if (!node.walls[1]) nodeStyle.borderBottom = "none";
        if (!node.walls[2]) nodeStyle.borderRight = "none";
        if (!node.walls[3]) nodeStyle.borderLeft = "none";
        if (node.visited) nodeStyle.backgroundColor = "skyblue";
        if (node.isPathNode) nodeStyle.backgroundColor = "green";
    };

    // Reset css of node style to original state
    static resetNodeStyle = (node) => {
        const nodeStyle = document.getElementById(
            `node-${node.row}-${node.col}`
        ).style;

        nodeStyle.borderTop = "1.6px solid white";
        nodeStyle.borderBottom = "1.6px solid white";
        nodeStyle.borderRight = "1.6px solid white";
        nodeStyle.borderLeft = "1.6px solid white";
        nodeStyle.backgroundColor = "#444444";
    };

    static calcCost = (currNode, frontier) => {
        const x = Math.abs(currNode.row - frontier.row);
        const y = Math.abs(currNode.col - frontier.col);

        return x + y;
    };
}
