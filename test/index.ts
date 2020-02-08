import { Test, group, run } from "./helper";
import { tests as matcherTests } from "./matcher";
import { tests as matchersTests } from "./matchers";

const tests: Test[] = group("/", [...matcherTests, ...matchersTests]);

run(tests).catch(_ => process.exit(1));
