export const aStar = (grid) => {
    const openSet = [];
    const closedSet = [];
    const startNode = grid[0][0];
    const endNode = grid[24][24];

    openSet.push(startNode);
    while (openSet.length > 0) {
        const currNode = getLowestCostFNode(openSet);
        currNode.visited = true;
        closedSet.push(currNode);

        // Current node has reached the end of the maze
        if (currNode === endNode) {
            console.log("SOLVED!");
            break;
        }

        const frontiers = currNode.getFrontiers(grid);
        frontiers.forEach((frontier) => {
            frontier = grid[frontier[0]][frontier[1]];

            if (
                isValidPath(currNode, frontier) &&
                !closedSet.includes(frontier)
            ) {
                if (!openSet.includes(frontier)) {
                    // Calculate g, h, and f for frontier
                    frontier.g = currNode.g + calcCost(currNode, frontier);
                    frontier.h = calcHeuristic(endNode, frontier);
                    frontier.f = frontier.g + frontier.h;

                    // Make parent of frontier equal to current node
                    frontier.parent = currNode;

                    // Push frontier to open set
                    openSet.push(frontier);
                } else if (frontier.g < currNode.g) {
                    // Make parent of frontier equal to current node
                    frontier.parent = currNode;

                    // Recalculate g and g for frontier
                    frontier.g = currNode.g + calcCost(currNode, frontier);
                    frontier.f = frontier.g + frontier.h;
                }
            }
        });
    }

    generatePath(endNode);

    return closedSet;
};

const calcCost = (currNode, adjNode) => {
    const x = Math.abs(currNode.row - adjNode.row);
    const y = Math.abs(currNode.col - adjNode.col);

    return x + y;
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
        if (openSet[index].f > openSet[i].f) {
            index = i;
        }
    }

    // Remove and return node with lowest f value from open set
    return openSet.splice(index, 1)[0];
};

// This method checks if there is a wall between the current node
// and the adjacent node to determine if the path is traversable
const isValidPath = (currNode, adjNode) => {
    const row1 = currNode.row;
    const col1 = currNode.col;
    const row2 = adjNode.row;
    const col2 = adjNode.col;

    const x = col1 - col2;
    const y = row1 - row2;

    if (x === 0 && y === 1) {
        return currNode.walls[0] === false && adjNode.walls[1] === false;
    } else if (x === 0 && y === -1) {
        return currNode.walls[1] === false && adjNode.walls[0] === false;
    } else if (x === 1 && y === 0) {
        return currNode.walls[3] === false && adjNode.walls[2] === false;
    } else if (x === -1 && y === 0) {
        return currNode.walls[2] === false && adjNode.walls[3] === false;
    }
};

const generatePath = (endNode) => {
    let current = endNode;
    current.isPathNode = true;

    while (current.parent) {
        // Set parent of current node as part of the optimal path
        current.parent.isPathNode = true;
        current = current.parent;
    }
};
