import assert from 'assert';
import { Test, run } from 'beater';
import { name, named as test } from 'beater-helpers/name';

const group = (groupName: string, tests: Test[]): Test[] =>
  tests.map((t) => test(groupName + name(t), t));

export {
  Test,
  assert,
  group,
  run,
  test
};
