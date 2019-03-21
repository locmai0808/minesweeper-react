import React, { Component } from 'react';

export class Timer extends Component {
  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.props.started) {
        this.props.clockIn();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <div className='clock'>{this.props.time}</div>;
  }
}

export default Timer;
