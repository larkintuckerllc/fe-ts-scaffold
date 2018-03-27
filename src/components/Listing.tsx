/* tslint:disable-next-line */
import React, { Component } from 'react';

interface ListingProps {
  add(value: string): void;
  items: string[];
}
/* tslint:disable-next-line */
export default class Listing extends Component<ListingProps> {
  addItem = () => {
    const { add } = this.props;
    add('Hello There');
  }
  render() {
    const { items } = this.props;
    return (
      <div>
        <h2>Listing</h2>
        <button onClick={this.addItem}>Add</button>
        <ul>
          {items.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
      </div>
    );
  }
}
