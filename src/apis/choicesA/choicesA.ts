import choicesATestData from './choicesA.testdata.json';
const fetchChoicesA = () => {
  return Promise.resolve(choicesATestData);
};
export default { fetch: fetchChoicesA };
