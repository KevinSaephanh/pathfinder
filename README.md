# Pathfinder

This project incorporates a number of algorithms for both maze generation and pathfinding. [Try it!](https://kevinsaephanh.github.io/Pathfinder/)

## Maze Generation Algorithms

### Recursive Backtracker

Begin with a 25x25 2D grid with each node (cell) lined with walls on all four sides.

### Randomized Prim's

Begin with a 25x25 2D grid with each node (cell) lined with walls on all four sides. Create a toVisit list and visited list for nodes. Start by selecting a random node and adding it to the toVisit list. Now follow these steps while there are still nodes in the toVisit list:

-   Pop the node from the toVisit list, mark it as the current node, then add it to the visited list.
-   Find all frontiers (neighbors) of the current node and randomize their order
-   For each frontier in this frontiers list, check if it is in the toVisit and visited list
-   If in neither, break the wall dividing the current node and that frontier then push the frontier to the toVisit list. \* Else, continue to the next frontier.

## Pathfinding Algorithms

### A\* Search

Terminology:
**Start node** - very first node in the maze (0, 0)
**End node** - very last node in the maze (24, 24)
**Cost** - distance between one node to another node  
**g** - exact cost from start node to some node n
Frontier.g = currentNode. g + cost  
**h** - heuristic estimated cost from node n to end node  
**f** - lowest cost in the frontier node n
f = g + h

Create an open set and a closed set. Push the start node to the open set and do the following steps while there are still nodes in the open set:

-   Remove the node with the lowest f cost from the open set, mark it as the current node, then add it to the closed set.
-   If the current node is the end node, then congratulations you win!
-   Else, get the frontiers of the current node.
-   For each frontier, check if the path between the current node and frontier can be traversed (no wall) and if the frontier is not on the closed set
-   If true, calculate g, h, and f for the frontier
-   If the frontier is already in the open set AND the frontier's g value is higher than the current node's g value, continue to the next node
-   Else, push the frontier to the open set and make it's parent equal to the current node.

### Dijkstra

Dijkstra's algorithm is pretty much the same as A* Search. The difference is that Dijkstra's does not use f nor h when determining which nodes to visit. Instead, it only uses g. Excluding f and h calculations, the steps are pretty much identical to A*.

## Finding the Optimal Path

Create a current node variable and set it equal to the end node. While current node has a parent:

-   Find the parent node in the maze and mark it as a path node
-   Set the current node equal to it's own parent
