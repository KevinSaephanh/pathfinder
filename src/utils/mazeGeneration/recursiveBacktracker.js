import MazeUtils from "../mazeUtils";

export const recursiveBacktracker = (grid) => {
    const stack = [];
    const visited = [];
    const currCell =
        grid[MazeUtils.getRandomIndex()][MazeUtils.getRandomIndex()];

    // Push start cell to stack and visited set
    stack.push(currCell);
    visited.push(currCell);

    while (stack.length > 0) {
        const cell = stack.pop();

        // Get Frontiers and randomize the order
        const frontiers = MazeUtils.shuffle(cell.getFrontiers(grid));

        for (let frontier of frontiers) {
            if (!visited.includes(frontier)) {
                stack.push(cell);
                MazeUtils.breakWall(cell, frontier);
                visited.push(frontier);
                stack.push(frontier);
                break;
            }
        }
    }

    return visited;
};
