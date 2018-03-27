/* tslint:disable-next-line */
import React, { Component } from 'react';

interface AppListProps {
  add(value: string): void;
  items: string[];
}
/* tslint:disable-next-line */
export default class AppList extends Component<AppListProps> {
  constructor(props: AppListProps) {
    super(props);
    this.addItem = this.addItem.bind(this);
  }
  addItem() {
    const { add } = this.props;
    add('Hello There');
  }
  render() {
    const { add, items } = this.props;
    return (
      <div>
        <button onClick={this.addItem}>Add</button>
        <ul>
          {items.map((o, i) => <li key={i}>{o}</li>)}
        </ul>
      </div>
    );
  }
}
