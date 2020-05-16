import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import "./Navbar.css";

export const Navbar = (props) => {
    const {
        status,
        maze,
        pathfinding,
        handleClickStatus,
        handleClickMaze,
        handleClickPathfinding,
    } = props;

    return (
        <Nav className="navbar">
            <NavDropdown id="dropdown" title={maze}>
                <NavDropdown.Item
                    className="dropdown-item"
                    name="Recursive Backtracker"
                    onClick={handleClickMaze}
                >
                    Recursive Backtracker
                </NavDropdown.Item>
                <NavDropdown.Item
                    className="dropdown-item"
                    name="Prim's"
                    onClick={handleClickMaze}
                >
                    Prim's
                </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown id="dropdown" alignRight title={pathfinding}>
                <NavDropdown.Item
                    className="dropdown-item"
                    name="A* Search"
                    onClick={handleClickPathfinding}
                >
                    A* Search
                </NavDropdown.Item>
                <NavDropdown.Item
                    className="dropdown-item"
                    name="Dijkstra's"
                    onClick={handleClickPathfinding}
                >
                    Dijkstra's
                </NavDropdown.Item>
                <NavDropdown.Item
                    className="dropdown-item"
                    name="BFS"
                    onClick={handleClickPathfinding}
                >
                    Breadth First Search
                </NavDropdown.Item>
                <NavDropdown.Item
                    className="dropdown-item"
                    name="DFS"
                    onClick={handleClickPathfinding}
                >
                    Depth First Search
                </NavDropdown.Item>
            </NavDropdown>
            <button
                name="create"
                disabled={maze === "maze" || status === "solve"}
                onClick={handleClickStatus}
            >
                CREATE
            </button>
            <button name="clear" onClick={handleClickStatus}>
                CLEAR
            </button>
            <button
                name="solve"
                disabled={pathfinding === "pathfinding" || status !== "create"}
                onClick={handleClickStatus}
            >
                SOLVE
            </button>
        </Nav>
    );
};
