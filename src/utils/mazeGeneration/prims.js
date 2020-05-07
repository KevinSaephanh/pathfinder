import * as MazeUtils from "../mazeUtils";

// This method uses randomized prim's algorithm
// to generate a completely random maze
export const primsAlgorithm = (grid) => {
    const row = MazeUtils.getRandomIndex();
    const col = MazeUtils.getRandomIndex();
    const rootCell = grid[row][col];
    const toVisit = [];
    const visited = [];

    toVisit.push(rootCell);
    while (toVisit.length > 0) {
        const currCell = toVisit.pop();
        visited.push(currCell);

        const frontiers = currCell.getFrontiers(grid);
        if (frontiers.length > 0) {
            // Randomize frontiers then traverse them
            const shuffledFrontiers = MazeUtils.shuffle(frontiers);
            shuffledFrontiers.forEach((frontier) => {
                // Check if frontier is in neither sets
                if (
                    !visited.includes(frontier) &&
                    !toVisit.includes(frontier)
                ) {
                    MazeUtils.breakWall(currCell, frontier);
                    toVisit.push(frontier);
                }
            });
        }
    }

    return visited;
};
