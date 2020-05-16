import MazeUtils from "../mazeUtils";
import NodeUtils from "../nodeUtils";

export const aStar = (grid) => {
    const openSet = [];
    const closedSet = [];
    const startNode = grid[0][0];
    const endNode = grid[24][24];

    startNode.f = startNode.g = startNode.h = 0;

    openSet.push(startNode);
    while (openSet.length > 0) {
        const currNode = getLowestCostFNode(openSet);
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
                    // Calculate g, h, and f for frontier
                    frontier.g =
                        currNode.g + NodeUtils.calcCost(currNode, frontier);
                    frontier.h = calcHeuristic(endNode, frontier);
                    frontier.f = frontier.g + frontier.h;

                    // Make parent of frontier equal to current node
                    frontier.parent = currNode;

                    // Push frontier to open set
                    openSet.push(frontier);
                } else if (frontier.g < currNode.g) {
                    // Make parent of frontier equal to current node
                    frontier.parent = currNode;

                    // Recalculate g and f for frontier
                    frontier.g =
                        currNode.g + NodeUtils.calcCost(currNode, frontier);
                    frontier.f = frontier.g + frontier.h;
                }
            }
        });
    }

    return closedSet;
};

// The estimated movement cost to move from the
// current node to the end node
// Manhattan distance used to calculate heuristic
const calcHeuristic = (endNode, adjNode) => {
    const x = Math.abs(endNode.row - adjNode.row);
    const y = Math.abs(endNode.col - adjNode.col);

    return x + y;
};

const getLowestCostFNode = (openSet) => {
    let index = 0;

    for (let i = 0; i < openSet.length; i++) {
        // If a new node with a lower f is found, replace index
        if (openSet[index].f > openSet[i].f) index = i;
    }

    // Remove and return node with lowest f value from open set
    return openSet.splice(index, 1)[0];
};
