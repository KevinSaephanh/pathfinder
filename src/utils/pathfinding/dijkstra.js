import MazeUtils from "../mazeUtils";
import NodeUtils from "../nodeUtils";

export const dijkstra = (grid) => {
    const openSet = [];
    const closedSet = [];
    const startNode = grid[0][0];
    const endNode = grid[24][24];

    openSet.push(startNode);
    while (openSet.length > 0) {
        const currNode = getLowestCostGNode(openSet);
        currNode.visited = true;
        closedSet.push(currNode);

        // Current node has reached the end of the maze
        if (currNode === endNode) break;

        const frontiers = currNode.getFrontiers(grid);
        frontiers.forEach((frontier) => {
            if (
                MazeUtils.isValidPath(currNode, frontier) &&
                !closedSet.includes(frontier)
            ) {
                if (!openSet.includes(frontier)) {
                    frontier.g =
                        currNode.g + NodeUtils.calcCost(currNode, frontier);

                    // Make parent of frontier equal to current node
                    frontier.parent = currNode;

                    // Push frontier to open set
                    openSet.push(frontier);
                } else if (frontier.g < currNode.g) {
                    // Make parent of frontier equal to current node
                    frontier.parent = currNode;

                    // Recalculate g for frontier
                    frontier.g =
                        currNode.g + NodeUtils.calcCost(currNode, frontier);
                }
            }
        });
    }

    return closedSet;
};

const getLowestCostGNode = (openSet) => {
    let index = 0;

    for (let i = 0; i < openSet.length; i++) {
        // If a new node with a lower g is found, replace index
        if (openSet[index].g > openSet[i].g) index = i;
    }

    // Remove and return node with lowest g value from open set
    return openSet.splice(index, 1)[0];
};
