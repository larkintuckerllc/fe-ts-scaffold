/* tslint:disable-next-line */
import React, { Component } from 'react';

interface StatefulProps {
}
interface StatefulState {
  counter: number;
}
export default class stateful extends Component<StatefulProps, StatefulState> {
  constructor(props: StatefulProps) {
    super(props);
  }
  state: StatefulState = {
    counter: 0,
  };
  handleIncrementClick = () => {
    const { counter } = this.state;
    this.setState({
      counter: counter + 1,
    });
  }
  handleDecrementClick = () => {
    const { counter } = this.state;
    this.setState({
      counter: counter - 1,
    });
  }
  render() {
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
}
