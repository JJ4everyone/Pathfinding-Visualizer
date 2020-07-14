import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {bfs, getNodesInShortestPathOrderbfs} from '../algorithms/bfs';
import {dfs, getNodesInShortestPathOrderdfs} from '../algorithms/dfs';
import {astar, getNodesInShortestPathOrderastar} from '../algorithms/astar';
import {Button, Container, Row, Col} from 'react-bootstrap';
import './PathfindingVisualizer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
var START_NODE_ROW = 7;
var START_NODE_COL = 10;
var FINISH_NODE_ROW = 7;
var FINISH_NODE_COL = 38;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      isStartMoving: false,
      isEndMoving: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    if (row === START_NODE_ROW && col === START_NODE_COL) {
      this.setState({isStartMoving: true});
    } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
      this.setState({isEndMoving: true});
    } else {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: true});
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;

    if (this.state.isEndMoving) {
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
    } else if (this.state.isStartMoving) {
      START_NODE_COL = col;
      START_NODE_ROW = row;
    } else {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({grid: newGrid});
    }
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
    this.setState({
      isStartMoving: false,
      isEndMoving: false,
    });
  }

  animatealgo(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animatealgo(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeastar() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrderastar = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrderastar = getNodesInShortestPathOrderastar(
      finishNode,
    );
    this.animatealgo(visitedNodesInOrderastar, nodesInShortestPathOrderastar);
  }

  visualizebfs() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrderbfs = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrderbfs = getNodesInShortestPathOrderbfs(
      finishNode,
    );
    this.animatealgo(visitedNodesInOrderbfs, nodesInShortestPathOrderbfs);
  }

  visualizedfs() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrderdfs = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrderdfs = getNodesInShortestPathOrderdfs(
      finishNode,
    );
    this.animatealgo(visitedNodesInOrderdfs, nodesInShortestPathOrderdfs);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <div className="yo">
          <Button
            variant="info"
            size="md"
            className="btn"
            onClick={() => this.visualizedfs()}>
            Visualize DFS
          </Button>{' '}
          <Button
            variant="info"
            size="md"
            className="btn"
            onClick={() => this.visualizebfs()}>
            Visualize BFS
          </Button>
          <Button
            variant="info"
            size="md"
            className="btn"
            onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra
          </Button>
          <Button
            variant="info"
            size="md"
            className="btn"
            onClick={() => this.visualizeastar()}>
            Visualize ASTAR
          </Button>
        </div>

        <Container className="container" fluid>
          <Row md={6}>
            <Col className="d-flex flex-row">
              <div className="key start"></div>
              <div>Start</div>
            </Col>
            <Col className="d-flex flex-row">
              <div className="key end"></div>
              <div>Target</div>
            </Col>
            <Col className="d-flex flex-row">
              <div className="key wall"></div>
              <div>Wall</div>
            </Col>
            <Col className="d-flex flex-row">
              <div className="key searching"></div>
              <div className="key visited"></div>

              <div>Visited</div>
            </Col>
            <Col className="d-flex flex-row">
              <div className="key success"></div>
              <div>Shortest-Path</div>
            </Col>
            <Col className="d-flex flex-row">
              <div className="key"></div>
              <div>Unvisited</div>
            </Col>
          </Row>
        </Container>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 18; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
