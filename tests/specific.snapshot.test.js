const { resolve } = require('path');
const { addSerializer, toMatchSpecificSnapshot } = require('../lib');

expect.extend({
  toMatchExtendedSpecificSnapshot(received, snapshotFile) {
    return toMatchSpecificSnapshot.call(this, received + 1, snapshotFile);
  },
});

test('tests that creates multiple snapshots', () => {
  const pathToSnap = resolve(process.cwd(), './tests/specific/dir/my.shot');
  expect(100).toMatchSpecificSnapshot(pathToSnap);

  expect(14).toMatchSpecificSnapshot('./specific/dir/my.shot');

  expect(19).toMatchSpecificSnapshot('./specific/another_dir/another.shot');
});

test('with custom serializer', () => {
  const customSerializer = {
    test: val => val % 11 === 0,
    print: val => `here is a custom output for the ${val}`,
  };

  addSerializer(customSerializer);

  expect(11).toMatchSpecificSnapshot('./specific/custom_serializer/test1.shot');
  expect(121).toMatchSpecificSnapshot(
    './specific/custom_serializer/test2.shot'
  );

  expect(
    'this value value will be serialized with the default serializer'
  ).toMatchSpecificSnapshot('./specific/custom_serializer/test3.shot');
});

test('with extended matcher', () => {
  expect(11).toMatchExtendedSpecificSnapshot(
    './specific/extended_matcher/test1.shot'
  );
});
