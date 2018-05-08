import choicesBTestData from './choicesB.testdata.json';
const fetchChoicesB = () => {
  return Promise.resolve(choicesBTestData);
};
export default { fetch: fetchChoicesB };
