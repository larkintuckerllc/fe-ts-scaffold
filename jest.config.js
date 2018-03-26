module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '\\.*.(tsx?)$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '\\.(css|jpg|less|png)$': '<rootDir>/empty-module.js',
    '^Ducks/(.*)': '<rootDir>/src/ducks/$1',
    '^Store/(.*)': '<rootDir>/src/store/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.tsx',
    '!src/**/*.d.ts',
  ],
};
