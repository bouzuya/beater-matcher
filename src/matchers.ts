import { isObject } from "./helper";
import { MatcherFn, defineMatcher, match } from "./matcher";

const any = (): MatcherFn => defineMatcher((_: unknown) => true);

const anyArray = (): MatcherFn =>
  defineMatcher((value: unknown) => Array.isArray(value));

const anyBigInt = (): MatcherFn =>
  defineMatcher((value: unknown) => typeof value === "bigint");

const anyBoolean = (): MatcherFn =>
  defineMatcher((value: unknown) => typeof value === "boolean");

const anyFunction = (): MatcherFn =>
  defineMatcher((value: unknown) => typeof value === "function");

const anyNumber = (): MatcherFn =>
  defineMatcher((value: unknown) => typeof value === "number");

const anyObject = (): MatcherFn =>
  defineMatcher((value: unknown) => isObject(value));

const anyString = (): MatcherFn =>
  defineMatcher((value: unknown) => typeof value === "string");

const matchString = (regexp: RegExp): MatcherFn =>
  defineMatcher(
    (value: unknown) =>
      typeof value === "string" && value.match(regexp) !== null
  );

const partialObject = (o: unknown): MatcherFn =>
  defineMatcher(
    (value: unknown) =>
      isObject(value) &&
      isObject(o) &&
      Object.entries(o).every(([k, v]) => match(value[k], v))
  );

export {
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
};
