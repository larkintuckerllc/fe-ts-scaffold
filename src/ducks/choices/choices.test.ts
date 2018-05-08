import choicesAAPI from 'APIS/choicesA';
import choicesATestData from 'APIS/choicesA/choicesA.testdata.json';
import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { unknown } from 'STORE/AppAction';
import { appStateRecordDefault } from 'STORE/AppState';
import Choice, { ChoiceFactory, ChoiceRecord } from './Choice';
// import todos, { fetchTodos, getTodo, getTodos, getTodosError, getTodosRequested } from './todos';
import choices, { fetchChoices, getChoices, getChoicesError, getChoicesRequested } from './choices';
import { choicesStateRecordDefault } from './ChoicesState';

describe('todos duck', () => {
  const reducer = (accumulator: List<ChoiceRecord>, jsonChoice: Choice) =>
    accumulator.push(ChoiceFactory(jsonChoice));
  const choicesSample = choicesATestData.reduce(reducer, List<ChoiceRecord>([])) as List<
    ChoiceRecord
  >;
  const request = {
    payload: 'choicesA',
    type: 'FETCH_CHOICES_REQUEST',
  };
  const requestOther = {
    payload: 'other',
    type: 'FETCH_CHOICES_REQUEST',
  };
  const responseSuccess = {
    payload: {
      response: choicesSample,
      type: 'choicesA',
    },
    type: 'FETCH_CHOICES_RESPONSE',
  };
  const responseSuccessOther = {
    payload: {
      response: choicesSample,
      type: 'other',
    },
    type: 'FETCH_CHOICES_RESPONSE',
  };
  const responseError = {
    error: true,
    payload: {
      response: '500',
      type: 'choicesA',
    },
    type: 'FETCH_CHOICES_RESPONSE',
  };
  const choicesStateSample = choicesStateRecordDefault.set('items', choicesSample);
  const appStateSample = appStateRecordDefault.set('choicesA', choicesStateSample);

  beforeEach(() => {
    jest.addMatchers(matchers);
    jest.resetModules();
    jest.resetAllMocks();
  });

  // ACTIONS
  it('fetchTodos success should dispatch request and response - success actions', () => {
    choicesAAPI.fetch = jest.fn().mockResolvedValue(choicesATestData);
    const dispatch = jest.fn();
    return fetchChoices('choicesA')(dispatch).then(() => {
      const callsLength = 2;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(request);
      expect(dispatch.mock.calls[1][0]).toEqual(responseSuccess);
    });
  });

  it('fetchTodos success should dispatch request and response - error actions', () => {
    choicesAAPI.fetch = jest.fn().mockRejectedValue(new Error('500'));
    const dispatch = jest.fn();
    return fetchChoices('choicesA')(dispatch).then(() => {
      const callsLength = 2;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(request);
      expect(dispatch.mock.calls[1][0]).toEqual(responseError);
    });
  });

  describe('reducer', () => {
    it('should ignore unknown actions', () => {
      const action = unknown();
      const reducerSample = choices('choicesA');
      expect(reducerSample(choicesStateRecordDefault, action)).toBe(choicesStateRecordDefault);
    });

    it('should ignore FETCH_CHOICES_REQUEST of other type', () => {
      const reducerSample = choices('choicesA');
      expect(reducerSample(choicesStateRecordDefault, requestOther)).toBe(
        choicesStateRecordDefault
      );
    });

    it('should handle FETCH_CHOICES_REQUEST', () => {
      const result = choicesStateRecordDefault.set('requested', true);
      const reducerSample = choices('choicesA');
      expect(reducerSample(choicesStateRecordDefault, request)).toEqualImmutable(result);
    });

    it('should handle FETCH_CHOICES_RESPONSE success', () => {
      const state = choicesStateRecordDefault.set('requested', true);
      const reducerSample = choices('choicesA');
      expect(reducerSample(state, responseSuccess)).toEqualImmutable(choicesStateSample);
    });

    it('should ignore FETCH_CHOICES_RESPONSE success of other type', () => {
      const state = choicesStateRecordDefault.set('requested', true);
      const reducerSample = choices('choicesA');
      expect(reducerSample(state, responseSuccessOther)).toBe(state);
    });

    it('should handle FETCH_CHOICES_RESPONSE error', () => {
      const state = choicesStateRecordDefault.set('requested', true);
      const nextState = choicesStateRecordDefault.set('errored', true);
      const reducerSample = choices('choicesA');
      expect(reducerSample(state, responseError)).toEqualImmutable(nextState);
    });
  });

  describe('selectors', () => {
    it('getChoicesRequested should return', () => {
      const result = false;
      expect(getChoicesRequested(appStateRecordDefault, 'choicesA')).toEqual(result);
    });

    it('getChoicesError should return', () => {
      const result = false;
      expect(getChoicesError(appStateRecordDefault, 'choicesA')).toEqual(result);
    });

    it('getChoices should return', () => {
      const result = choicesSample;
      expect(getChoices(appStateSample, 'choicesA')).toEqualImmutable(result);
    });
  });
});
