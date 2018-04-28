import Item from 'DUCKS/items/Item';
import { List } from 'immutable';
import React, { Component } from 'react';
import Items from './Items';

const GAP = 100;

interface InfiniteViewProps {
  currentPage: number;
  error: boolean;
  requested: boolean;
  lastPage: number;
  items: List<Item>;
  fetchItems(page: number): Promise<void>;
}

export default class InfiniteScrollView extends Component<InfiniteViewProps> {
  private rootRef: HTMLDivElement;

  public componentDidMount() {
    const { currentPage, fetchItems } = this.props;
    fetchItems(currentPage);
    window.scroll(0, 0);
    window.addEventListener('scroll', this.handleScroll, false);
  }

  // TESTING TOO HARD
  /* istanbul ignore next */
  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  public render() {
    const { error, items } = this.props;
    if (error) {
      return <div>Error</div>;
    }
    return (
      <div ref={this.setRootRef}>
        <h2>Infinite Scroll</h2>
        <Items items={items.toJS()} />
      </div>
    );
  }

  // TESTING TOO HARD
  /* istanbul ignore next */
  private setRootRef = (element: HTMLDivElement) => {
    this.rootRef = element;
  };

  // TESTING TOO HARD
  /* istanbul ignore next */
  private handleScroll = () => {
    const { currentPage, fetchItems, lastPage, requested } = this.props;
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const contentH = this.rootRef.scrollHeight;
    if (windowH + scrollY > contentH - GAP && currentPage !== lastPage && !requested) {
      fetchItems(currentPage + 1).then(this.handleScroll);
    }
  };
}
