/* tslint:disable-next-line */
import React, { Component } from 'react';

interface ListingProps {
  add(value: string): void;
  items: string[];
}
export default class Listing extends Component<ListingProps> {
  addItem = () => {
    const { add } = this.props;
    add('Hello World');
  }
  render() {
    const { items } = this.props;
    return (
      <div>
        <h2>Listing</h2>
        <button id="test_add" onClick={this.addItem}>Add</button>
        <ul>
          {items.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
      </div>
    );
  }
}
