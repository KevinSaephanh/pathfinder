import MazeUtils from "../mazeUtils";

export const bfs = (grid) => {
    const startNode = grid[0][0];
    const endNode = grid[24][24];
    const queue = [];
    const set = [];

    queue.push(startNode);
    while (queue.length > 0) {
        const currNode = queue.shift();
        currNode.visited = true;

        set.push(currNode);
        if (currNode === endNode) break;

        const frontiers = MazeUtils.shuffle(currNode.getFrontiers(grid));
        frontiers.forEach((frontier) => {
            if (
                MazeUtils.isValidPath(currNode, frontier) &&
                !set.includes(frontier) &&
                !queue.includes(frontier)
            ) {
                frontier.parent = currNode;
                queue.push(frontier);
            }
        });
    }

    return set;
};
