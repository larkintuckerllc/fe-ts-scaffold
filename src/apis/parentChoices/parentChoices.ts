import parentChoicesTestData from './parentChoices.testdata.json';
const fetchParentChoices = () => {
  return Promise.resolve(parentChoicesTestData);
};
export default { fetch: fetchParentChoices };
