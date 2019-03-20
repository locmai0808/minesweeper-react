import React, { Component } from 'react';
import Cell from './Cell.jsx';

export class Board extends Component {
  constructor(props) {
    super(props);
    this.progress = 0;
    this.state = {
      board: this.fillBoard(props.heigth, props.width, props.mines),
      status: 'Good luck!',
      heigth: props.heigth,
      width: props.width,
      mines: props.mines,
      size: props.heigth * props.width
    };
  }

  fillBoard(h, w, m) {
    let size = h * w;
    let board = this.initBoard(size);
    board = this.addMines(board, size, m);
    let minesLocation = board[1];
    board = board[0];
    board = this.addNeighbor(board, size, w, minesLocation);
    return board;
  }

  newGame = () => {
    this.progress = 0;
    this.setState({
      board: this.fillBoard(
        this.state.heigth,
        this.state.width,
        this.state.mines
      ),
      status: 'Good luck!'
    });
  };

  // Fill board with nada
  initBoard = size => {
    let board = [];
    for (let i = 0; i < size; i++) {
      board = [...board, { mine: 0, revealed: 0, flagged: 0, val: 0 }];
    }
    return board;
  };

  // Fill board with mines
  addMines = (board, size, m) => {
    let i = 0,
      j = [];
    while (i < m) {
      let index = this.randomNumber(size);
      if (!board[index].mine) {
        board[index].mine = 1;
        board[index].val = -1;
        j = [...j, index];
        i++;
      }
    }
    return [board, j];
  };

  // Fill board with moves
  addNeighbor = (board, size, w, minesLocation) => {
    minesLocation.forEach(i => {
      if (i >= w) {
        // top left
        if (
          i - w - 1 >= 0 &&
          (i - w - 1) % w !== w - 1 &&
          !board[i - w - 1].mine
        )
          board[i - w - 1].val++;
        // top
        if (!board[i - w].mine) board[i - w].val++;
        // top right
        if ((i - w + 1) % w !== 0 && !board[i - w + 1].mine)
          board[i - w + 1].val++;
      }
      if (i < size - w) {
        // btm left
        if ((i + w - 1) % w !== w - 1 && !board[i + w - 1].mine)
          board[i + w - 1].val++;
        // btm
        if (!board[i + w].mine) board[i + w].val++;
        // btm right
        if ((i + w + 1) % w !== 0 && !board[i + w + 1].mine)
          board[i + w + 1].val++;
      }
      // left
      if (i - 1 >= 0 && (i - 1) % w !== w - 1 && !board[i - 1].mine)
        board[i - 1].val++;
      // right
      if (i + 1 < size && (i + 1) % w !== 0 && !board[i + 1].mine)
        board[i + 1].val++;
    });
    return board;
  };

  randomNumber = size => Math.floor(Math.random() * size);

  boom = () => {
    let copy = [...this.state.board];
    copy.forEach(cell => {
      cell.revealed = 1;
    });
    this.setState({
      board: copy,
      status: '😢 You lost 😢'
    });
  };

  reveal = (index, { mine, revealed, flagged, val }) => {
    if (revealed || flagged) return;
    if (mine) {
      return this.boom();
    }
    if (val === 0) {
      this.floodFill(index);
    } else {
      let copy = [...this.state.board];
      this.progress++;
      copy[index].revealed = 1;
      if (this.progress === this.state.size - this.state.mines) {
        copy.forEach(cell => {
          cell.revealed = 1;
        });
        return this.setState({
          board: copy,
          status: '🎉 YOU WON 🎉'
        });
      }
      this.setState({
        board: copy
      });
    }
  };

  floodFill = i => {
    let board = [...this.state.board];
    if (board[i].mine || board[i].revealed) return;
    board[i].revealed = 1;
    this.progress++;
    this.setState({
      board: board
    });
    let w = this.state.width;
    let size = this.state.size;
    if (i >= w) {
      // top left
      if (i - w - 1 >= 0 && (i - w - 1) % w !== w - 1)
        this.reveal(i - w - 1, board[i - w - 1]);
      // top
      this.reveal(i - w, board[i - w]);
      // top right
      if ((i - w + 1) % w !== 0) this.reveal(i - w + 1, board[i - w + 1]);
    }
    if (i < size - w) {
      // btm left
      if ((i + w - 1) % w !== w - 1) this.reveal(i + w - 1, board[i + w - 1]);
      // btm
      this.reveal(i + w, board[i + w]);
      // btm right
      if ((i + w + 1) % w !== 0) this.reveal(i + w + 1, board[i + w + 1]);
    }
    // left
    if (i - 1 >= 0 && (i - 1) % w !== w - 1) this.reveal(i - 1, board[i - 1]);
    // right
    if (i + 1 < size && (i + 1) % w !== 0) this.reveal(i + 1, board[i + 1]);
  };

  renderBoard = () => {
    return this.state.board.map((props, index) => {
      return (
        <Cell
          key={index}
          onClick={() => this.reveal(index, props)}
          onContextMenu={e => this.rightClick(index, props, e)}
          cell={props}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <div className='game-header'>
          {this.state.status}
          <br />
          <br />
          <button className='btn btn-success' onClick={this.newGame}>
            New Game
          </button>
          <br />
        </div>
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;
