import Item from 'DUCKS/items/Item';
import { List } from 'immutable';
import React, { Component } from 'react';
import Items from './Items';

interface PaginatedViewProps {
  error: boolean;
  requested: boolean;
  items: List<Item>;
  fetchItems(): void;
}

export default class AsyncView extends Component<PaginatedViewProps> {
  public componentDidMount() {
    const { fetchItems } = this.props;
    fetchItems();
  }
  public render() {
    const { error, requested, items } = this.props;
    if (requested) {
      return <div>Requested</div>;
    } else if (error) {
      return <div>Error</div>;
    } else if (items.size === 0) {
      return <div>No Items</div>;
    }
    return (
      <div>
        <h2>Paginated</h2>
        <Items items={items.toJS()} />
      </div>
    );
  }
}
