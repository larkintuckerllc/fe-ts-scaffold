import React, { Component } from 'react';

interface StatefulState {
  counter: number;
}
export default class Stateful extends Component<{}, StatefulState> {
  public state: StatefulState = {
    counter: 0,
  };
  public render() {
    const { counter } = this.state;
    return (
      <div>
        <h2>Stateful</h2>
        <div>{counter.toString()}</div>
        <button id="test_increment" onClick={this.handleIncrementClick}>+</button>
        <button id="test_decrement" onClick={this.handleDecrementClick}>-</button>
      </div>
    );
  }
  private handleIncrementClick = () => {
    const { counter } = this.state;
    this.setState({
      counter: counter + 1,
    });
  }
  private handleDecrementClick = () => {
    const { counter } = this.state;
    this.setState({
      counter: counter - 1,
    });
  }
}
