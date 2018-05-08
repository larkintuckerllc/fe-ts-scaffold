import { ChildChoiceRecord } from 'DUCKS/childChoices/ChildChoice';
import * as fromParentChoices from 'DUCKS/parentChoices';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { AppStateRecord } from 'STORE/AppState';
import ChildChoicesContainer from './ChildChoicesContainer';

interface ChildChoicesProps {
  parentId: number;
}

interface StateProps {
  parentChoiceChildren: List<ChildChoiceRecord> | undefined;
}

const mapStateToProps = (state: AppStateRecord, ownProps: ChildChoicesProps) => {
  const { parentId } = ownProps;
  return {
    parentChoiceChildren: fromParentChoices.getParentChoiceChildren(state, parentId),
  };
};

export default connect<StateProps, {}>(mapStateToProps, {})(ChildChoicesContainer);
