import { Test, assert, group, test } from "./helper";
import {
  any,
  anyNumber,
  anyString,
  anyArray,
  anyObject,
  match,
  matchString,
  partialObject
} from "../src"; // from 'beater-matcher';

const value = {
  a: 123,
  b: "abc",
  c: [1, 2, 3],
  d: { a: 1, b: 2, c: 3 }
};

const tests: Test[] = group("example", [
  test("value as matcher", () => {
    assert(match(value, value) === true);
  }),

  test("any matcher", () => {
    assert(match(value, any()) === true);
  }),

  test("anyXXX matcher", () => {
    assert(
      match(value, {
        a: anyNumber(),
        b: anyString(),
        c: anyArray(),
        d: anyObject()
      }) === true
    );
  }),

  test("partialObject and matchString matcher", () => {
    assert(match(value, partialObject({ b: matchString(/^ab/) })) === true);
  })
]);

export { tests };
