import { Test, assert, group, test } from './helper';
import { match } from '../src/matcher';
import {
  any,
  anyArray,
  anyBigInt,
  anyBoolean,
  anyFunction,
  anyNumber,
  anyObject,
  anyString,
  matchString,
  partialObject
} from '../src/matchers';

const values = [
  123,
  '123',
  true,
  null,
  undefined,
  // Node.js v8
  ...(typeof BigInt === 'undefined' ? [] : [BigInt(123)]),
  [123, '123'],
  { a: 123, b: '123' }
];

const tests: Test[] = group('matchers/', [
  test('any matcher', async () => {
    const m = any();
    assert(match(123, m) === true);
    assert(match('123', m) === true);
    assert(match(true, m) === true);
    assert(values.filter((v) => match(v, m)).length === values.length);
  }),

  test('anyArray matcher', async () => {
    const m = anyArray();
    assert(match([123, '123'], m) === true);
    assert(match([], m) === true);
    assert(match(null, m) === false);
    assert(match({}, m) === false);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  ...(typeof BigInt === 'undefined' ? [] : [
    test('anyBigInt matcher', async () => {
      const m = anyBigInt();
      assert(match(BigInt(123), m) === true);
      assert(match(BigInt(456), m) === true);
      assert(values.filter((v) => match(v, m)).length === 1);
    })
  ]),

  test('anyBoolean matcher', async () => {
    const m = anyBoolean();
    assert(match(true, m) === true);
    assert(match(false, m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('anyFunction matcher', async () => {
    const m = anyFunction();
    assert(match(() => void 0, m) === true);
    assert(match(() => null, m) === true);
  }),

  test('anyNumber matcher', async () => {
    const m = anyNumber();
    assert(match(123, m) === true);
    assert(match(456, m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('anyObject matcher', async () => {
    const m = anyObject();
    assert(match({ a: 123, b: 456 }, m) === true);
    assert(match({}, m) === true);
    assert(match(null, m) === false);
    assert(match([], m) === false);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('anyString matcher', async () => {
    const m = anyString();
    assert(match('123', m) === true);
    assert(match('456', m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('matchString matcher', async () => {
    const m = matchString(/^12/);
    assert(match('123', m) === true);
    assert(match('12a', m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('partialObject matcher', async () => {
    const m = partialObject({ a: 123 });
    assert(match({ a: 123 }, m) === true);
    assert(match({ a: 123, b: 456 }, m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  })
]);

export { tests };
