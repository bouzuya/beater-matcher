import { Test, assert, group, test } from './helper';
import { match, defineMatcher } from '../src/matcher';

const values = [
  123,
  '123',
  true,
  null,
  undefined,
  BigInt(123),
  [123, '123'],
  { a: 123, b: '123' }
];

const tests: Test[] = group('matcher/', [
  test('number matcher', async () => {
    const m = 123;
    assert(match(123, m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('string matcher', async () => {
    const m = '123';
    assert(match('123', m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('boolean matcher', async () => {
    const m = true;
    assert(match(true, m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('null matcher', async () => {
    const m = null;
    assert(match(null, m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('undefined matcher', async () => {
    const m = undefined;
    assert(match(undefined, m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('bigint matcher', async () => {
    const m = BigInt(123);
    assert(match(BigInt(123), m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('array matcher', async () => {
    const m = [123, '123'];
    assert(match([123, '123'], m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('object matcher', async () => {
    const m = { a: 123, b: '123' };
    assert(match({ a: 123, b: '123' }, m) === true);
    assert(values.filter((v) => match(v, m)).length === 1);
  }),

  test('function matcher', async () => {
    const m = () => void 0;
    assert(match(m, m) === true);
    assert(match(() => void 0, m) === false);
    assert(values.filter((v) => match(v, m)).length === 0);
  }),

  test('defineMatcher', async () => {
    const m = defineMatcher(
      (value: unknown): boolean => {
        return typeof value === 'string' && value.startsWith('ABC');
      }
    );
    assert(match('ABC', m) === true);
    assert(match('ABCDEF', m) === true);
    assert(match('XYZ', m) === false);
    assert(match(123, m) === false);
  })
]);

export { tests };
