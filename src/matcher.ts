import { isObject } from "./helper";

type Matcher = unknown | MatcherFn;
type MatcherFn = (value: unknown) => boolean;

const match = (value: unknown, matcher: Matcher): boolean => {
  switch (typeof matcher) {
    case "bigint":
      return matcher === value;
    case "boolean":
      return matcher === value;
    case "function":
      return isMatcherFn(matcher)
        ? matcher.call(null, value)
        : matcher === value;
    case "number":
      return matcher === value;
    case "object":
      if (matcher === null) {
        return matcher === value;
      } else if (Array.isArray(matcher)) {
        return (
          Array.isArray(value) && matcher.every((m, i) => match(value[i], m))
        );
      } else {
        return (
          isObject(value) &&
          Object.entries(matcher).every(([k, v]) => match(value[k], v))
        );
      }
    case "undefined":
      return matcher === value;
    case "string":
      return matcher === value;
    case "symbol":
      return matcher === value;
    default:
      throw new Error(`unknown matcher type '${typeof matcher}'`);
  }
};

const isMatcherFn = (f: Function): f is MatcherFn =>
  (f as any).__matcher__ === true;

const defineMatcher = (f: MatcherFn): MatcherFn => {
  Object.defineProperty(f, "__matcher__", { value: true });
  return f;
};

export { Matcher, MatcherFn, defineMatcher, match };
