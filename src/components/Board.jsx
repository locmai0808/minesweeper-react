import React, { Component } from 'react';

export class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.fillBoard(props.heigth, props.width, props.mines),
      heigth: props.heigth,
      width: props.width,
      mines: props.mines
    };
  }

  fillBoard(h, w, m) {
    let board = [];
    let minesLocation = [];
    let size = h * w;
    board = this.initBoard(size);
    board = this.addMines(board, size, m);
    minesLocation = board[1];
    board = board[0];
    //board = this.addMoves(board, size, w);
    board = this.addNeighbor(board, size, w, minesLocation);
    return board;
  }

  newGame = () => {
    this.setState({
      board: this.fillBoard(
        this.state.heigth,
        this.state.width,
        this.state.mines
      )
    });
  };

  // Fill board with nada
  initBoard = size => {
    let board = [];
    for (let i = 0; i < size; i++) {
      board = [...board, { mine: 0, clicked: 0, flagged: 0, val: 0 }];
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
        j = [...j, index];
        i++;
      }
    }
    return [board, j];
  };

  // Fill board with moves
  addNeighbor = (board, size, w, minesLocation) => {
    minesLocation.forEach(i => {
      if (i >= w && i < size - w) {
        // top
        board[i - w].val++;
        // btm
        board[i + w].val++;
        if (i % w === 0) {
          board[i - w + 1].val++;
          board[i + 1].val++;
          board[i + w + 1].val++;
        } else if (i % w === w - 1) {
          board[i - w - 1].val++;
          board[i - 1].val++;
          board[i + w - 1].val++;
        } else {
          // top left
          board[i - w - 1].val++;
          // top right
          board[i - w + 1].val++;
          // left
          board[i - 1].val++;
          // right
          board[i + 1].val++;
          // btm left
          board[i + w - 1].val++;
          // btm right
          board[i + w + 1].val++;
        }
      } else if (i < w) {
        board[i + w].val++;
        if (i === 0) {
          board[i + 1].val++;
          board[i + w + 1].val++;
        } else if (i === w - 1) {
          board[i - 1].val++;
          board[i + w - 1].val++;
        } else {
          board[i - 1].val++;
          board[i + 1].val++;
          board[i + w - 1].val++;
          board[i + w + 1].val++;
        }
      } else if (i >= size - w) {
        board[i - w].val++;
        if (i === size - w) {
          board[i + 1].val++;
          board[i - w + 1].val++;
        } else if (i === size - 1) {
          board[i - 1].val++;
          board[i - w - 1].val++;
        } else {
          board[i - 1].val++;
          board[i + 1].val++;
          board[i - w + 1].val++;
          board[i - w - 1].val++;
        }
      }
    });
    return board;
  };

  /* Fill board with moves
  addMoves = (board, size, w) => {
    for (let i = 0; i < size; i++) {
      if (board[i].mine) continue;
      board[i] = this.checkCell(board, i, size, w);
    }
    return board;
  };

  checkCell = (board, i, size, w) => {
    // top
    if (i >= w && board[i - w].mine) board[i].val++;
    // bottom
    if (i < size - w && board[i + w].mine) board[i].val++;

    if (i % w < w - 1) {
      // top right
      if (i >= w && board[i - w + 1].mine) board[i].val++;
      // bottom right
      if (i < size - w && board[i + w + 1].mine) board[i].val++;
      // right
      if (board[i + 1].mine) board[i].val++;
    }
    if (i % w > 0) {
      // top left
      if (i > w && board[i - w - 1].mine) board[i].val++;
      // bottom left
      if (i < size - w && board[i + w - 1].mine) board[i].val++;
      // left
      if (board[i - 1].mine) board[i].val++;
    }
    return board[i];
  }; */

  randomNumber = size => Math.floor(Math.random() * size);

  renderBoard = () => {
    return this.state.board.map((props, index) => {
      return (
        <div className='cell' key={index}>
          {props.mine === 1 ? '💣' : props.val}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <button className='btn btn-success' onClick={this.newGame}>
          New Game
        </button>
        <br />
        <br />
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;
