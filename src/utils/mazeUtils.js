import Node from "../models/node";

export default class MazeUtils {
    static initGrid = () => {
        const newGrid = [];
        for (let row = 0; row < 25; row++) {
            newGrid[row] = []; // Current row
            for (let col = 0; col < 25; col++) {
                const node = new Node(row, col);
                newGrid[row].push(node);
            }
        }
        return newGrid;
    };

    // Fisher-Yates shuffle algorithm
    // Used to randomize order of frontiers
    static shuffle = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    // This method returns a random number from 0 to 24
    // Used to retrieve a random node
    static getRandomIndex = () => {
        return Math.floor(Math.random() * 24);
    };

    // This method takes two nodes and determines which wall to break
    // depending on the results of subtracting the first node's row/col
    // by the neighboring node's row/col
    static breakWall = (currNode, frontier) => {
        const row1 = currNode.row;
        const col1 = currNode.col;
        const row2 = frontier.row;
        const col2 = frontier.col;
        const x = col1 - col2;
        const y = row1 - row2;

        // Break top wall
        if (x === 0 && y === 1) {
            currNode.walls[0] = false;
            frontier.walls[1] = false;
        }
        // Break bottom wall
        if (x === 0 && y === -1) {
            currNode.walls[1] = false;
            frontier.walls[0] = false;
        }
        // Break left wall
        if (x === 1 && y === 0) {
            currNode.walls[3] = false;
            frontier.walls[2] = false;
        }
        // Break right wall
        if (x === -1 && y === 0) {
            currNode.walls[2] = false;
            frontier.walls[3] = false;
        }
    };

    // This method checks if there is a wall between the current node
    // and the adjacent node to determine if the path is traversable
    static isValidPath = (currNode, adjNode) => {
        const row1 = currNode.row;
        const col1 = currNode.col;
        const row2 = adjNode.row;
        const col2 = adjNode.col;

        const x = col1 - col2;
        const y = row1 - row2;

        if (x === 0 && y === 1)
            return currNode.walls[0] === false && adjNode.walls[1] === false;
        if (x === 0 && y === -1)
            return currNode.walls[1] === false && adjNode.walls[0] === false;
        if (x === 1 && y === 0)
            return currNode.walls[3] === false && adjNode.walls[2] === false;
        if (x === -1 && y === 0)
            return currNode.walls[2] === false && adjNode.walls[3] === false;
    };

    // This method generates the optimal path to traverse the maze
    // by backtracking (starting from the end node) using the parent
    static generatePath = (endNode) => {
        let path = [];
        let current = endNode;
        current.isPathNode = true;

        while (current.parent) {
            current.parent.isPathNode = true;
            path.push(current.parent);
            current = current.parent;
        }

        path.reverse();
        return path;
    };
}
