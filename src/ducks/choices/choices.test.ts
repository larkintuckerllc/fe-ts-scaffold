import choicesAAPI from 'APIS/choicesA';
import choicesATestData from 'APIS/choicesA/choicesA.testdata.json';
import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { unknown } from 'STORE/AppAction';
import { appStateRecordDefault } from 'STORE/AppState';
import Choice, { ChoiceFactory, ChoiceRecord } from './Choice';
import choices, { fetchChoices, getChoices, getChoicesError, getChoicesRequested } from './choices';
import { choicesStateRecordDefault } from './ChoicesState';

const SAMPLE_CHOICES = 'choicesA';
const OTHER_CHOICES = 'other';
const SAMPLE_API = choicesAAPI;

describe('todos duck', () => {
  const reducer = (accumulator: List<ChoiceRecord>, jsonChoice: Choice) =>
    accumulator.push(ChoiceFactory(jsonChoice));
  const choicesSample = choicesATestData.reduce(reducer, List<ChoiceRecord>([])) as List<
    ChoiceRecord
  >;
  const request = {
    payload: SAMPLE_CHOICES,
    type: 'FETCH_CHOICES_REQUEST',
  };
  const requestOther = {
    payload: OTHER_CHOICES,
    type: 'FETCH_CHOICES_REQUEST',
  };
  const responseSuccess = {
    payload: {
      response: choicesSample,
      type: SAMPLE_CHOICES,
    },
    type: 'FETCH_CHOICES_RESPONSE',
  };
  const responseSuccessOther = {
    payload: {
      response: choicesSample,
      type: OTHER_CHOICES,
    },
    type: 'FETCH_CHOICES_RESPONSE',
  };
  const responseError = {
    error: true,
    payload: {
      response: '500',
      type: SAMPLE_CHOICES,
    },
    type: 'FETCH_CHOICES_RESPONSE',
  };
  const choicesStateSample = choicesStateRecordDefault.set('items', choicesSample);
  const appStateSample = appStateRecordDefault.set(SAMPLE_CHOICES, choicesStateSample);

  beforeEach(() => {
    jest.addMatchers(matchers);
    jest.resetModules();
    jest.resetAllMocks();
  });

  // ACTIONS
  it('fetchTodos success should dispatch request and response - success actions', () => {
    SAMPLE_API.fetch = jest.fn().mockResolvedValue(choicesATestData);
    const dispatch = jest.fn();
    return fetchChoices(SAMPLE_CHOICES)(dispatch).then(() => {
      const callsLength = 2;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(request);
      expect(dispatch.mock.calls[1][0]).toEqual(responseSuccess);
    });
  });

  it('fetchTodos success should dispatch request and response - error actions', () => {
    SAMPLE_API.fetch = jest.fn().mockRejectedValue(new Error('500'));
    const dispatch = jest.fn();
    return fetchChoices(SAMPLE_CHOICES)(dispatch).then(() => {
      const callsLength = 2;
      expect(dispatch.mock.calls.length).toBe(callsLength);
      expect(dispatch.mock.calls[0][0]).toEqual(request);
      expect(dispatch.mock.calls[1][0]).toEqual(responseError);
    });
  });

  describe('reducer', () => {
    it('should ignore unknown actions', () => {
      const action = unknown();
      const reducerSample = choices(SAMPLE_CHOICES);
      expect(reducerSample(choicesStateRecordDefault, action)).toBe(choicesStateRecordDefault);
    });

    it('should ignore FETCH_CHOICES_REQUEST of other type', () => {
      const reducerSample = choices(SAMPLE_CHOICES);
      expect(reducerSample(choicesStateRecordDefault, requestOther)).toBe(
        choicesStateRecordDefault
      );
    });

    it('should handle FETCH_CHOICES_REQUEST', () => {
      const result = choicesStateRecordDefault.set('requested', true);
      const reducerSample = choices(SAMPLE_CHOICES);
      expect(reducerSample(choicesStateRecordDefault, request)).toEqualImmutable(result);
    });

    it('should handle FETCH_CHOICES_RESPONSE success', () => {
      const state = choicesStateRecordDefault.set('requested', true);
      const reducerSample = choices(SAMPLE_CHOICES);
      expect(reducerSample(state, responseSuccess)).toEqualImmutable(choicesStateSample);
    });

    it('should ignore FETCH_CHOICES_RESPONSE success of other type', () => {
      const state = choicesStateRecordDefault.set('requested', true);
      const reducerSample = choices(SAMPLE_CHOICES);
      expect(reducerSample(state, responseSuccessOther)).toBe(state);
    });

    it('should handle FETCH_CHOICES_RESPONSE error', () => {
      const state = choicesStateRecordDefault.set('requested', true);
      const nextState = choicesStateRecordDefault.set('errored', true);
      const reducerSample = choices(SAMPLE_CHOICES);
      expect(reducerSample(state, responseError)).toEqualImmutable(nextState);
    });
  });

  describe('selectors', () => {
    it('getChoicesRequested should return', () => {
      const result = false;
      expect(getChoicesRequested(appStateRecordDefault, SAMPLE_CHOICES)).toEqual(result);
    });

    it('getChoicesError should return', () => {
      const result = false;
      expect(getChoicesError(appStateRecordDefault, SAMPLE_CHOICES)).toEqual(result);
    });

    it('getChoices should return', () => {
      const result = choicesSample;
      expect(getChoices(appStateSample, SAMPLE_CHOICES)).toEqualImmutable(result);
    });
  });
});
