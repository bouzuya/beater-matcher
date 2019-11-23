# beater-matcher

A matcher library for [beater][bouzuya/beater].

[bouzuya/beater]: https://github.com/bouzuya/beater

## Installation

```
$ npm install --save-dev beater-matcher
```

## Usage

```javascript
import assert from 'assert';
import {
  any,
  anyArray,
  anyNumber,
  anyString,
  anyObject,
  match,
  matchString,
  partialObject,
} from 'beater-matcher';

const value = {
  a: 123,
  b: 'abc',
  c: [1, 2, 3],
  d: { a: 1, b: 2, c: 3 }
};

// (basic matchers)
// value as matcher
assert(match(value, value));

// (pre-defined matchers)
// any matcher
assert(match(value, any()));

// anyXXX matcher
assert(match(
  value,
  {
    a: anyNumber(),
    b: anyString(),
    c: anyArray(),
    d: anyObject()
  }
));

// partialObject and matchString matcher
assert(match(value, partialObject({ b: matchString(/^ab/) })));

// (custom matcher)
const abcMatcher = defineMatcher(
  (value: unknown): boolean => {
    return typeof value === 'string' && value.startsWith('ABC');
  }
);
assert(match('ABCDEF', abcMatcher));
```

## Badges

[![npm version][npm-badge-url]][npm-url]
[![Travis CI][travis-ci-badge-url]][travis-ci-url]

[npm-badge-url]: https://img.shields.io/npm/v/beater-matcher
[npm-url]: https://www.npmjs.com/package/beater-matcher
[travis-ci-badge-url]: https://img.shields.io/travis/bouzuya/beater-matcher
[travis-ci-url]: https://travis-ci.org/bouzuya/beater-matcher

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([https://bouzuya.net/][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: https://bouzuya.net/
