import parentChoicesAPI from 'APIS/parentChoices';
import parentChoicesTestData from 'APIS/parentChoices/parentChoices.testdata.json';
import ChildChoice, { ChildChoiceFactory, ChildChoiceRecord } from 'DUCKS/childChoices/ChildChoice';
import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { unknown } from 'STORE/AppAction';
import { appStateRecordDefault } from 'STORE/AppState';
import ParentChoice, { ParentChoiceFactory, ParentChoiceRecord } from './ParentChoice';
import parentChoices, {
  fetchParentChoices,
  getParentChoiceChildren,
  getParentChoices,
  getParentChoicesError,
  getParentChoicesRequested,
} from './parentChoices';
import { parentChoicesStateRecordDefault } from './ParentChoicesState';

interface ParentChoiceApi {
  id: number;
  name: string;
  children: ChildChoice[];
}

describe('parentChoices', () => {
  const request = {
    type: 'FETCH_PARENT_CHOICES_REQUEST',
  };
  const reducer = (accumulator: List<ParentChoiceRecord>, jsonParentChoice: ParentChoice) =>
    accumulator.push(ParentChoiceFactory(jsonParentChoice));
  const parentChoicesSample = parentChoicesTestData.reduce(
    reducer,
    List<ParentChoiceRecord>([])
  ) as List<ParentChoiceRecord>;
  const responseSuccess = {
    payload: parentChoicesSample,
    type: 'FETCH_PARENT_CHOICES_RESPONSE',
  };
  const responseError = {
    error: true,
    payload: '500',
    type: 'FETCH_PARENT_CHOICES_RESPONSE',
  };
  const parentChoicesStateSample = parentChoicesStateRecordDefault.set(
    'items',
    parentChoicesSample
  );
  // CHILDREN
  const childReducer = (accumulator: List<ChildChoiceRecord>, jsonChildChoice: ChildChoice) =>
    accumulator.push(ChildChoiceFactory(jsonChildChoice));
  const parentReducer = (
    accumulator: Map<number, List<ChildChoiceRecord>>,
    jsonParentChoice: ParentChoiceApi
  ) => {
    const children = jsonParentChoice.children.reduce(childReducer, List<ChildChoiceRecord>([]));
    return accumulator.set(jsonParentChoice.id, children);
  };
  const childChoicesStateSample = parentChoicesTestData.reduce(
    parentReducer,
    Map<number, List<ChildChoiceRecord>>()
  );
  const appStateSample = appStateRecordDefault
    .set('parentChoices', parentChoicesStateSample)
    .set('childChoices', childChoicesStateSample);

  beforeEach(() => {
    jest.addMatchers(matchers);
    jest.resetModules();
    jest.resetAllMocks();
  });

  // ACTIONS
  it('fetchParentChoices success should dispatch request and response and child - success actions', () => {
    parentChoicesAPI.fetch = jest.fn().mockResolvedValue(parentChoicesTestData);
    const dispatch = jest.fn();
    return fetchParentChoices()(dispatch).then(() => {
      const callsLength = 3;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(request);
      expect(dispatch.mock.calls[1][0]).toEqual(responseSuccess);
    });
  });

  it('fetchTodos success should dispatch request and response - error actions', () => {
    parentChoicesAPI.fetch = jest.fn().mockRejectedValue(new Error('500'));
    const dispatch = jest.fn();
    return fetchParentChoices()(dispatch).then(() => {
      const callsLength = 2;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(request);
      expect(dispatch.mock.calls[1][0]).toEqual(responseError);
    });
  });

  describe('reducer', () => {
    it('should ignore unknown actions', () => {
      const action = unknown();
      expect(parentChoices(parentChoicesStateRecordDefault, action)).toBe(
        parentChoicesStateRecordDefault
      );
    });

    it('should handle FETCH_PARENT_CHOICE_REQUEST', () => {
      const result = parentChoicesStateRecordDefault.set('requested', true);
      expect(parentChoices(parentChoicesStateRecordDefault, request)).toEqualImmutable(result);
    });

    it('should handle FETCH_PARENT_CHOICE_RESPONSE success', () => {
      const state = parentChoicesStateRecordDefault.set('requested', true);
      expect(parentChoices(state, responseSuccess)).toEqualImmutable(parentChoicesStateSample);
    });

    it('should handle FETCH_PARENT_CHOICE_RESPONSE error', () => {
      const state = parentChoicesStateRecordDefault.set('requested', true);
      const nextState = parentChoicesStateRecordDefault.set('errored', true);
      expect(parentChoices(state, responseError)).toEqualImmutable(nextState);
    });
  });

  describe('selectors', () => {
    it('getParentChoicesRequested should return', () => {
      const result = false;
      expect(getParentChoicesRequested(appStateRecordDefault)).toEqual(result);
    });

    it('getParentChoicesError should return', () => {
      const result = false;
      expect(getParentChoicesError(appStateRecordDefault)).toEqual(result);
    });

    it('getParentChoices should return', () => {
      const result = parentChoicesSample;
      expect(getParentChoices(appStateSample)).toEqualImmutable(result);
    });

    it('getParentChoiceChildren should return', () => {
      const parentId = 0;
      const result = childChoicesStateSample.get(parentId);
      expect(getParentChoiceChildren(appStateSample, parentId)).toEqualImmutable(result);
    });
  });
});
