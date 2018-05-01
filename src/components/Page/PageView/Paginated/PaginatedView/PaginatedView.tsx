import { ItemRecord } from 'DUCKS/items/Item';
import { List } from 'immutable';
import React, { Component } from 'react';
import Items from './Items';
import styles from './styles.less';

interface PaginatedViewProps {
  currentPage: number;
  error: boolean;
  requested: boolean;
  lastPage: number;
  items: List<ItemRecord>;
  fetchItems(page: number): void;
}

export default class AsyncView extends Component<PaginatedViewProps> {
  public componentDidMount() {
    const { currentPage, fetchItems } = this.props;
    fetchItems(currentPage);
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
        {currentPage !== 0 && (
          <div>
            <button id={styles.previous} onClick={this.handlePreviousPage}>
              Previous Page
            </button>
          </div>
        )}
        {currentPage !== lastPage && (
          <div>
            <button id={styles.next} onClick={this.handleNextPage}>
              Next Page
            </button>
          </div>
        )}
      </div>
    );
  }

  private handleNextPage = () => {
    const { currentPage, fetchItems } = this.props;
    fetchItems(currentPage + 1);
  };

  private handlePreviousPage = () => {
    const { currentPage, fetchItems } = this.props;
    fetchItems(currentPage - 1);
  };
}
