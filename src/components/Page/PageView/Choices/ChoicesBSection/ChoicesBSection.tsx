import * as fromChoices from 'DUCKS/choices';
import { ChoiceRecord } from 'DUCKS/choices/Choice';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { AppStateRecord } from 'STORE/AppState';
import ChoicesBView from './ChoicesBView';

interface StateProps {
  choices: List<ChoiceRecord>;
  error: boolean;
  requested: boolean;
}

interface DispatchProps {
  fetchChoices(type: fromChoices.ChoiceType): void;
}

const mapStateToProps = (state: AppStateRecord) => ({
  choices: fromChoices.getChoices(state, 'choicesB'),
  error: fromChoices.getChoicesError(state, 'choicesB'),
  requested: fromChoices.getChoicesRequested(state, 'choicesB'),
});

const mapDispatchToProps = {
  fetchChoices: fromChoices.fetchChoices,
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(
  ChoicesBView
);
