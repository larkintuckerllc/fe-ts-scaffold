import { ParentChoiceRecord } from 'DUCKS/parentChoices/ParentChoice';
import { List } from 'immutable';
import React, { Component } from 'react';
import ParentChoices from './ParentChoices';

interface ParentChoicesSectionViewProps {
  error: boolean;
  requested: boolean;
  choices: List<ParentChoiceRecord>;
  fetchParentChoices(): void;
}

export default class ParentChoicesSectionView extends Component<ParentChoicesSectionViewProps> {
  public componentDidMount() {
    const { fetchParentChoices } = this.props;
    fetchParentChoices();
  }
  public render() {
    const { error, requested, choices } = this.props;
    if (requested) {
      return <div>Requested</div>;
    } else if (error) {
      return <div>Error</div>;
    } else if (choices.size === 0) {
      return <div>No ListAs</div>;
    }
    return (
      <div>
        <h2>ParentChoices</h2>
        <ParentChoices choices={choices.toJS()} />
      </div>
    );
  }
}