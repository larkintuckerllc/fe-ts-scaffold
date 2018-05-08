import { ChoiceType } from 'DUCKS/choices';
import { ChoiceRecord } from 'DUCKS/choices/Choice';
import { List } from 'immutable';
import React, { Component } from 'react';
import ChoicesB from './ChoicesB';

interface ChoicesBViewProps {
  error: boolean;
  requested: boolean;
  choices: List<ChoiceRecord>;
  fetchChoices(type: ChoiceType): void;
}

export default class ChoicesBView extends Component<ChoicesBViewProps> {
  public componentDidMount() {
    const { fetchChoices } = this.props;
    fetchChoices('choicesB');
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
        <h2>ChoicesB</h2>
        <ChoicesB choices={choices.toJS()} />
      </div>
    );
  }
}
