import React, { Component } from 'react';

export class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.fillBoard(props.height, props.width, props.mines)
    };
  }

  fillBoard(h, w, m) {
    let board = [];
    let size = h * w;
    board = this.initBoard(size);
    board = this.addMines(board, size, m);
    board = this.addMoves(board, size, w);
    return board;
  }

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
    let i = 0;
    while (i < m) {
      let index = this.randomNumber(size);
      if (!board[index].mine) {
        board[index].mine = 1;
        i++;
      }
    }
    return board;
  };

  // Fill board with moves
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
  };

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
    return <div>{this.renderBoard()}</div>;
  }
}

export default Board;
