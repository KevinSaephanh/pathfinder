import MazeUtils from "../mazeUtils";

export const dfs = (grid) => {
    const startNode = grid[0][0];
    const endNode = grid[24][24];
    const stack = [];
    const set = [];

    stack.push(startNode);
    while (stack.length > 0) {
        const currNode = stack.pop();
        currNode.visited = true;

        set.push(currNode);
        if (currNode === endNode) break;

        const frontiers = MazeUtils.shuffle(currNode.getFrontiers(grid));
        frontiers.forEach((frontier) => {
            if (
                MazeUtils.isValidPath(currNode, frontier) &&
                !set.includes(frontier) &&
                !stack.includes(frontier)
            ) {
                frontier.parent = currNode;
                stack.push(frontier);
            }
        });
    }

    return set;
};
