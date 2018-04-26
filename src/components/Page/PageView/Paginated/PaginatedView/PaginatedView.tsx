import Item from 'DUCKS/items/Item';
import { List } from 'immutable';
import React, { Component } from 'react';
import Items from './Items';

interface PaginatedViewProps {
  currentPage: number;
  error: boolean;
  requested: boolean;
  lastPage: number;
  items: List<Item>;
  fetchItems(): void;
}

export default class AsyncView extends Component<PaginatedViewProps> {
  public componentDidMount() {
    const { fetchItems } = this.props;
    fetchItems();
  }
  public render() {
    const { currentPage, error, lastPage, requested, items } = this.props;
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
        <div>CurrentPage: {currentPage.toString()}</div>
        <div>LastPage: {lastPage.toString()}</div>
      </div>
    );
  }
}
