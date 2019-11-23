import assert from 'assert';
import { Test, run, test } from 'beater';

const group = (name: string, tests: Test[]): Test[] =>
  tests.map(({ meta, fn }) => test(name + meta.get('name'), fn));

export {
  Test,
  assert,
  group,
  run,
  test
};
