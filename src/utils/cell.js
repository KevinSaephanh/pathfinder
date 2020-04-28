export default class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.visited = false;
        this.walls = [true, true, true, true];
        this.g = 0;
        this.h = 0;
        this.f = 0;
    }

    // This method returns all neighboring cells of the current cell
    getFrontiers = (grid) => {
        let top = [this.row - 1, this.col];
        let bottom = [this.row + 1, this.col];
        let right = [this.row, this.col + 1];
        let left = [this.row, this.col - 1];
        const frontiers = [];

        if (this.isValidFrontier(top, grid)) {
            frontiers.push(top);
        }

        if (this.isValidFrontier(bottom, grid)) {
            frontiers.push(bottom);
        }

        if (this.isValidFrontier(right, grid)) {
            frontiers.push(right);
        }

        if (this.isValidFrontier(left, grid)) {
            frontiers.push(left);
        }

        return frontiers;
    };

    // This method checks a frontier to see if it lies within the bounds of the grid
    isValidFrontier = (frontier, grid) => {
        return (
            frontier[0] < grid.length &&
            frontier[0] >= 0 &&
            frontier[1] < grid.length &&
            frontier[1] >= 0
        );
    };

    // Check if current node has open passage between it
    // and a neighboring node
    canTraverse = (frontier) => {
        return (
            (this.walls[0] === false && frontier.walls[1] === false) ||
            (this.walls[1] === false && frontier.walls[0] === false) ||
            (this.walls[2] === false && frontier.walls[3] === false) ||
            (this.walls[3] === false && frontier.walls[2] === false)
        );
    };

    // The movement cost to move from the starting node
    // to a given node on the grid
    calcG = (adjNode) => {
        const x = Math.abs(adjNode.row - this.row);
        const y = Math.abs(adjNode.col - this.col);

        return Math.sqrt(x + y);
    };

    // The estimated movement cost to move from the
    // current node to the end node
    // Manhattan distance used to calculate heuristic
    calcH = (adjNode, endNode) => {
        const x = Math.abs(endNode.row - adjNode.row);
        const y = Math.abs(endNode.col - adjNode.col);

        return x + y;
    };
}
