import * as fromLetterColored from 'DUCKS/letterColored';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';
import AppAction from 'STORE/AppAction';
import { AppStateRecord } from 'STORE/AppState';
import LetterView from './LetterView';

interface LetterProps {
  letter: { id: number; name: string };
}

interface StateProps {
  colored: boolean;
}

interface DispatchProps {
  letterColoredToggle(): void;
}

const mapStateToProps = (state: AppStateRecord, ownProps: LetterProps) => {
  const {
    letter: { id },
  } = ownProps;
  return {
    colored: fromLetterColored.getLetterColored(state, id),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>, ownProps: LetterProps) => {
  const {
    letter: { id },
  } = ownProps;
  return bindActionCreators(
    {
      letterColoredToggle: () => fromLetterColored.letterColoredToggle(id),
    },
    dispatch
  );
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(LetterView);
