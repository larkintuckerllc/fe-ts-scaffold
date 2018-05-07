import { ChoiceRecord } from 'DUCKS/choices/Choice';
import { List } from 'immutable';
import React, { Component } from 'react';
import ChoicesA from './ChoicesA';

interface ChoicesAViewProps {
  error: boolean;
  requested: boolean;
  choices: List<ChoiceRecord>;
  fetchChoices(): void;
}

export default class ChoicesAView extends Component<ChoicesAViewProps> {
  public componentDidMount() {
    const { fetchChoices } = this.props;
    fetchChoices();
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
        <h2>ChoicesA</h2>
        <ChoicesA choices={choices.toJS()} />
      </div>
    );
  }
}
