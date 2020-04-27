const openSet = [];
const closedSet = [];

export const aStar = (grid) => {
    const startNode = grid[0][0];
    const endNode = grid[24][24];

    openSet.push(startNode);
    while (openSet.length > 0) {
        const currNode = getLowestCostFNode();
        currNode.visited = true;
        console.log(currNode);
        closedSet.push(currNode);

        // Current node has reached the end of the maze
        if (currNode === endNode) {
            console.log("SOLVED!");
            return grid;
        }

        const frontiers = currNode.getFrontiers(grid);
        frontiers.forEach((frontier) => {
            frontier = grid[frontier[0]][frontier[1]];
            frontier.f = frontier.calcF(frontier, endNode);

            if (
                isValidPath(currNode, frontier) &&
                !openSet.includes(frontier)
            ) {
                openSet.push(frontier);
            } else if (
                isValidPath(currNode, frontier) &&
                openSet.includes(frontier) &&
                frontier.f < currNode.f
            ) {
                openSet.push(frontier);
            }
        });
    }
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
