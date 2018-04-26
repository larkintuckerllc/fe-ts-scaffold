import Item from 'DUCKS/items/Item';
import { List } from 'immutable';
import React, { Component } from 'react';

interface ItemsViewProps {
  error: boolean;
  requested: boolean;
  items: List<Item>;
  fetchItems(): void;
}

export default class ItemsView extends Component<ItemsViewProps> {
  public componentDidMount() {
    const { fetchItems } = this.props;
    fetchItems();
  }
  public render() {
    return (
      <div>
        <h2>Items</h2>
      </div>
    );
  }
}
