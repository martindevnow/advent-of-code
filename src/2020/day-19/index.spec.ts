import {
  stringStartsWith,
  transformRuleString,
  validateInputAgainstPattern,
} from ".";
import * as utils from "../utils";

const rootRules = [
  `0: 1`,
  `1: "a"`,
  `2: "b"`,
  "3: 1 2",
  "4: 2 2 | 1 1",
  "5: 4 1 | 1 4",
];

const GLOBAL_RULES = rootRules
  .map(transformRuleString)
  .reduce((acc: any, curr) => ({ ...acc, [curr.id]: curr }), {});

const dataStr = utils.readFile("day-19/mock.txt");

interface Rule {
  id: number;
  options: Array<Array<number>>;
  leaf: boolean;
  leafValue?: string;
}
type RuleMap = Record<number, Rule>;

const [rulesRaw, MOCK_INPUT] = dataStr
  .split(/\r?\n\r?\n/)
  .map((section) => section.split(/\r?\n/));
const MOCK_RULES: RuleMap = rulesRaw
  .map(transformRuleString)
  .reduce(
    (acc: { [currId: number]: Rule }, curr) => ({ ...acc, [curr.id]: curr }),
    {}
  );

console.log(GLOBAL_RULES);
describe("2020 - day 19", () => {
  describe("validateInputAgainstPattern", () => {
    it("matches a simple rule and simple string", () => {
      const rule = transformRuleString('0: "a"');
      const ruleMap = { 0: rule };
      const actual = validateInputAgainstPattern(0, "a", ruleMap);
      expect(actual).toBe(true);
    });
    it("non-matches a simple rule and simple string", () => {
      const rule = transformRuleString('0: "a"');
      const ruleMap = { 0: rule };
      const actual = validateInputAgainstPattern(0, "b", ruleMap);
      expect(actual).toBe(false);
    });
    it("matches a 1 layer rule and simple string", () => {
      const actual = validateInputAgainstPattern(0, "a", GLOBAL_RULES);
      expect(actual).toBe(true);
    });
    it("non-matches a 1 layer rule and simple string", () => {
      const actual = validateInputAgainstPattern(0, "b", GLOBAL_RULES);
      expect(actual).toBe(false);
    });
    it("matches a 1 layer rule and 2char string", () => {
      const actual = validateInputAgainstPattern(3, "ab", GLOBAL_RULES);
      expect(actual).toBe(true);
    });
    it("non-matches a 1 layer rule and 2char string", () => {
      const actual = validateInputAgainstPattern(3, "bb", GLOBAL_RULES);
      expect(actual).toBe(false);
    });
    it("matches a 1 layer rule with options and 2char string", () => {
      const actual = validateInputAgainstPattern(4, "bb", GLOBAL_RULES);
      expect(actual).toBe(true);
    });
    it("non-matches a 1 layer rule with options and 2char string", () => {
      const actual = validateInputAgainstPattern(4, "ab", GLOBAL_RULES);
      expect(actual).toBe(false);
    });
    it("matches a 1 layer rule with options and 2char string", () => {
      const actual = validateInputAgainstPattern(5, "abb", GLOBAL_RULES);
      expect(actual).toBe(true);
    });
    it("non-matches a 1 layer rule with options and 2char string", () => {
      const actual = validateInputAgainstPattern(5, "bbb", GLOBAL_RULES);
      expect(actual).toBe(false);
    });
  });
  fdescribe("validateInputAgainstPattern with MOCK data", () => {
    it("works", () => {
      const actual1 = validateInputAgainstPattern(0, MOCK_INPUT[0], MOCK_RULES);
      expect(actual1).toBe(true);
      // const actual2 = validateInputAgainstPattern(0, MOCK_INPUT[1], MOCK_RULES);
      // expect(actual2).toBe(false);
      // const actual3 = validateInputAgainstPattern(0, MOCK_INPUT[2], MOCK_RULES);
      // expect(actual3).toBe(true);
      // const actual4 = validateInputAgainstPattern(0, MOCK_INPUT[3], MOCK_RULES);
      // expect(actual4).toBe(false);
      // const actual5 = validateInputAgainstPattern(0, MOCK_INPUT[4], MOCK_RULES);
      // expect(actual5).toBe(false);
    });
  });

  describe("stringStartsWith", () => {
    it("happy path", () => {
      expect(stringStartsWith("abcd", "a")).toBe(true);
      expect(stringStartsWith("abcd", "ab")).toBe(true);
      expect(stringStartsWith("abcd", "abc")).toBe(true);
      expect(stringStartsWith("abcd", "abcd")).toBe(true);
      expect(stringStartsWith("abcd", "d")).toBe(false);
      expect(stringStartsWith("abcd", "cd")).toBe(false);
      expect(stringStartsWith("abcd", "a bc")).toBe(false);
      expect(stringStartsWith("abcd", " abcd")).toBe(false);
    });
  });
});
