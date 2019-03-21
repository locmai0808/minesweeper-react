import React, { Component } from 'react';

export class Cell extends Component {
  getValue() {
    const { revealed, flagged, mine, val } = this.props.cell;
    if (!revealed) return flagged ? '🚩' : null;
    if (mine) return '💣';
    return val ? val : null;
  }

  render() {
    const { cell, onClick, onContextMenu } = this.props;
    const numClasses = [
      ' one',
      ' two',
      ' three',
      ' four',
      ' five',
      ' six',
      ' seven',
      ' eight'
    ];
    let className =
      'cell' +
      (cell.revealed ? ' revealed' : '') +
      (cell.revealed && cell.val ? numClasses[cell.val - 1] : '') +
      (cell.flagged ? ' flagged' : '') +
      (cell.boom ? ' boom' : '');
    return (
      <div
        onClick={onClick}
        className={className}
        onContextMenu={onContextMenu}
      >
        {this.getValue()}
      </div>
    );
  }
}

export default Cell;
