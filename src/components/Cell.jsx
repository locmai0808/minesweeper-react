import React, { Component } from 'react';

export class Cell extends Component {
  getValue() {
    const { revealed, flagged, mine, val } = this.props.cell;
    if (!revealed) return flagged ? '🚩' : null;
    if (mine) return '💣';
    return val ? val : null;
  }

  render() {
    const { cell, onClick, rightClick } = this.props;
    let className =
      'cell' +
      (cell.revealed ? ' revealed' : '') +
      (cell.flagged ? ' is-flag' : '');
    return (
      <div onClick={onClick} className={className} onContextMenu={rightClick}>
        {this.getValue()}
      </div>
    );
  }
}

export default Cell;
