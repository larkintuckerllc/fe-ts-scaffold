import parentChoicesTestData from 'APIS/parentChoices/parentChoices.testdata.json';
import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { unknown } from 'STORE/AppAction';
import { appStateRecordDefault } from 'STORE/AppState';
import ChildChoice, { ChildChoiceFactory, ChildChoiceRecord } from './ChildChoice';
import childChoices, {
  childChoicesStateDefault,
  fetchChildChoicesResponse,
  getChildChoices,
} from './childChoices';

interface ParentChoiceApi {
  id: number;
  name: string;
  children: ChildChoice[];
}

describe('childChoices', () => {
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
  const appStateSample = appStateRecordDefault.set('childChoices', childChoicesStateSample);
  const responseSuccess = fetchChildChoicesResponse(childChoicesStateSample);

  beforeEach(() => {
    jest.addMatchers(matchers);
    jest.resetModules();
    jest.resetAllMocks();
  });

  describe('reducer', () => {
    it('should ignore unknown actions', () => {
      const action = unknown();
      expect(childChoices(childChoicesStateDefault, action)).toBe(childChoicesStateDefault);
    });

    it('should handle FETCH_CHILD_CHOICE_RESPONSE success', () => {
      const result = childChoicesStateSample;
      expect(childChoices(childChoicesStateDefault, responseSuccess)).toEqualImmutable(result);
    });
  });

  describe('selectors', () => {
    it('getChildChoices should return', () => {
      const result = childChoicesStateSample.get(0);
      expect(getChildChoices(appStateSample, 0)).toEqualImmutable(result);
    });
  });
});
