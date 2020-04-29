const openSet = [];
const closedSet = [];

export const aStar = (grid) => {
    const startNode = grid[0][0];
    const endNode = grid[24][24];

    openSet.push(startNode);
    while (openSet.length > 0) {
        const currNode = getLowestCostFNode();
        currNode.visited = true;
        closedSet.push(currNode);
        // console.log(currNode.row + ", " + currNode.col + " " + currNode.walls);

        // Current node has reached the end of the maze
        if (currNode === endNode) {
            console.log("SOLVED!");
            break;
        }

        const frontiers = currNode.getFrontiers(grid);
        frontiers.forEach((frontier) => {
            frontier = grid[frontier[0]][frontier[1]];

            if (isValidPath(currNode, frontier)) {
                frontier.g = frontier.calcG(currNode);
                frontier.h = frontier.calcH(frontier, endNode);
                frontier.f = frontier.g + frontier.h;

                if (!openSet.includes(frontier) || frontier.g < currNode.g) {
                    openSet.push(frontier);
                }
            }
        });
    }

    return grid;
};

const getLowestCostFNode = () => {
    let index;
    let largest = 1000;

    for (let i = 0; i < openSet.length; i++) {
        if (largest > openSet[i].f) {
            largest = openSet[i].f;
            index = i;
        }
    }

    return openSet.splice(index, 1)[0];
};

const isValidPath = (currNode, adjNode) => {
    const row1 = currNode.row;
    const col1 = currNode.col;
    const row2 = adjNode.row;
    const col2 = adjNode.col;

    if (!closedSet.includes(adjNode)) {
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
    }
};
