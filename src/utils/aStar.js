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
    console.log(closedSet);
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
    return currNode.canTraverse(adjNode) && !closedSet.includes(adjNode);
};
