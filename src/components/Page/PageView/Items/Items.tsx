import { fetchItems } from 'APIS/items';
import React, { Component } from 'react';

export default class AsyncView extends Component<{}> {
  public componentDidMount() {
    fetchItems().then(response => window.console.log(response));
  }
  public render() {
    return (
      <div>
        <h2>Items</h2>
      </div>
    );
  }
}
