import listAsTestData from './listAs.testdata.json';
const fetchListAs = () => {
  return Promise.resolve(listAsTestData);
};
export default { fetch: fetchListAs };
