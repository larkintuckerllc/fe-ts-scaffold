import { ListItemRecord } from 'DUCKS/list/ListItem';
import { List } from 'immutable';
import React, { Component } from 'react';
import ListAs from './ListAs';

interface ListAsViewProps {
  error: boolean;
  requested: boolean;
  list: List<ListItemRecord>;
  fetchList(): void;
}

export default class ListAsView extends Component<ListAsViewProps> {
  public componentDidMount() {
    const { fetchList } = this.props;
    fetchList();
  }
  public render() {
    const { error, requested, list } = this.props;
    if (requested) {
      return <div>Requested</div>;
    } else if (error) {
      return <div>Error</div>;
    } else if (list.size === 0) {
      return <div>No ListAs</div>;
    }
    return (
      <div>
        <h2>ListAs</h2>
        <ListAs list={list.toJS()} />
      </div>
    );
  }
}
