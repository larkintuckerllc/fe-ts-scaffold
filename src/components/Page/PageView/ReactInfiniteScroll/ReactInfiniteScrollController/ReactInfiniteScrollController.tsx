import { ItemRecord } from 'DUCKS/items/Item';
import { List } from 'immutable';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ReactInfiniteScrollView from './ReactInfiniteScrollView';

interface ReactInfiniteScrollControllerProps {
  currentPage: number;
  error: boolean;
  requested: boolean;
  lastPage: number;
  items: List<ItemRecord>;
  fetchItems(page: number): Promise<void>;
}

export default class ReactInfiniteScrollController extends Component<
  ReactInfiniteScrollControllerProps
> {
  public componentDidMount() {
    const { currentPage, fetchItems } = this.props;
    fetchItems(currentPage);
  }
  public render() {
    const { currentPage, error, items, lastPage } = this.props;
    if (error) {
      return <div>Error</div>;
    }
    return (
      <div>
        <h2>React Infinite Scroll</h2>
        <InfiniteScroll
          initialLoad={false}
          pageStart={1}
          loadMore={this.handleLoadMore}
          hasMore={currentPage !== lastPage}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          <ReactInfiniteScrollView items={items.toJS()} />
        </InfiniteScroll>
      </div>
    );
  }

  private handleLoadMore = (page: number) => {
    const { fetchItems } = this.props;
    fetchItems(page - 1);
  };
}
