import { isObject } from "./helper";
import { defineMatcher, match } from "./matcher";

const any = () => defineMatcher((_: unknown) => true);

const anyArray = () => defineMatcher((value: unknown) => Array.isArray(value));

const anyBigInt = () =>
  defineMatcher((value: unknown) => typeof value === "bigint");

const anyBoolean = () =>
  defineMatcher((value: unknown) => typeof value === "boolean");

const anyFunction = () =>
  defineMatcher((value: unknown) => typeof value === "function");

const anyNumber = () =>
  defineMatcher((value: unknown) => typeof value === "number");

const anyObject = () => defineMatcher((value: unknown) => isObject(value));

const anyString = () =>
  defineMatcher((value: unknown) => typeof value === "string");

const matchString = (regexp: RegExp) =>
  defineMatcher(
    (value: unknown) =>
      typeof value === "string" && value.match(regexp) !== null
  );

const partialObject = (o: unknown) =>
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
