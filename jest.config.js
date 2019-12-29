'use strict';

module.exports = {
  testEnvironment: 'node',
  testRegex: './tests/.*\\.js$',
  collectCoverage: false,
  collectCoverageFrom: ['lib/**/*.js'],
  moduleFileExtensions: ['js', 'json', 'node'],
  coverageReporters: ['text-summary', 'lcov'],
};
