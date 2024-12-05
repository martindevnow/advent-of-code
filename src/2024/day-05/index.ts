import { max, min } from "moment";
import * as utils from "../utils";

const realData: string = utils.readFile("day-05/data.txt"); // read

const testData = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const testData2 = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,97,47,61,53`;

// build a hash of all rules for each pages

interface Rule {
  before: Set<number>;
  after: Set<number>;
}

const rules = new Map<number, Rule>();

const [rulesStr, updatesStr] = realData.split("\n\n");

const rulesData = rulesStr.split("\n");
const updatesData = updatesStr.split("\n");

rulesData.forEach((rule) => {
  const [beforePage, afterPage] = rule.split("|").map(Number);

  const existingBeforeRule = rules.get(beforePage) ?? {
    before: new Set(),
    after: new Set(),
  };
  const existingAfterRule = rules.get(afterPage) ?? {
    before: new Set(),
    after: new Set(),
  };

  rules.set(beforePage, {
    after: existingBeforeRule.after.add(afterPage),
    before: existingBeforeRule.before,
  });
  rules.set(afterPage, {
    after: existingAfterRule.after,
    before: existingAfterRule.before.add(beforePage),
  });
});

const isRuleBroken = (indexToCheck: number, updatePages: Array<number>) => {
  const rule = rules.get(updatePages[indexToCheck]);
  if (!rule) return false;

  const badPageOrder = updatePages.some((curPage, index, arr) => {
    // check for rule breaking
    if (index === indexToCheck) return false;
    if (index < indexToCheck) {
      if (rule.after.has(curPage)) return true;
    }
    if (index > indexToCheck) {
      if (rule.before.has(curPage)) return true;
    }
    return false;
  });
  return badPageOrder;
};

// check if a rule is broken
const validUpdates = updatesData
  .map((line) => line.split(",").map(Number))
  .filter((pages) => {
    // console.log(`Line: ${line}`);
    const isBadOrder = pages.some((_, index) => {
      // console.log(`Checking index ${index}`);
      return isRuleBroken(index, pages);
    });
    return !isBadOrder;
  });
console.log(`Part 1: `);

const midPages = validUpdates
  .map((arr) => arr[Math.floor(arr.length / 2)])
  .reduce((acc, curr) => acc + curr, 0);

console.log(midPages);

console.log(`Part 2: `);

const invalidUpdates = updatesData
  .map((line) => line.split(",").map(Number))
  .filter((pages) => {
    // console.log(`Line: ${line}`);
    const isBadOrder = pages.some((_, index) => {
      // console.log(`Checking index ${index}`);
      return isRuleBroken(index, pages);
    });
    return isBadOrder;
  });

console.log(`Count: ${invalidUpdates.length}`);

// update these

// start with 1 element and add it to a new array.
// then check it's rules and see if any of the remaining elements exist in the rules, if so, add it to the array before or after it

const orderCorrectly = (
  pages: Array<number>,
  len?: number,
  newOrder: Array<number> = []
) => {
  console.log({ pages, newOrder });
  if (newOrder.length === len) return newOrder;

  if (newOrder.length === 0)
    return orderCorrectly(pages.slice(1), len, [pages[0]]);

  const curr = pages[0];
  const currRule = rules.get(curr);
  console.log({ curr });
  if (!currRule)
    return orderCorrectly(pages.slice(1), len, [...newOrder, curr]);

  // check the rules for this page
  // make sure all pages that need to be before it are before it, and all pages that need to be after it are after it.
  const beforeIndexes = Array.from(currRule.before)
    .map((mustBeBefore) => newOrder.findIndex((page) => mustBeBefore === page))
    .filter((val) => val !== -1);

  const afterIndexes = Array.from(currRule.after)
    .map((mustBeAfter) => newOrder.findIndex((page) => mustBeAfter === page))
    .filter((val) => val !== -1);
  console.log({ beforeIndexes, afterIndexes });

  // place the curr at index greater than max of after, and before min of before (if exists)
  const maxIndex =
    afterIndexes.length === 0 ? undefined : Math.min(...afterIndexes);
  const minIndex =
    beforeIndexes.length === 0 ? undefined : Math.max(...beforeIndexes) + 1;

  if (minIndex === undefined && maxIndex === undefined)
    return orderCorrectly(pages.slice(1), len, [...newOrder, curr]);
  if (minIndex === undefined) {
    newOrder.splice(maxIndex as number, 0, curr);
    return orderCorrectly(pages.slice(1), len, newOrder);
  }
  if (maxIndex === undefined) {
    newOrder.splice(minIndex as number, 0, curr);
    return orderCorrectly(pages.slice(1), len, newOrder);
  }
  if (minIndex > maxIndex) throw "Min is bigger than Max";

  // both are set
  newOrder.splice(minIndex as number, 0, curr);
  return orderCorrectly(pages.slice(1), len, newOrder);
};

// console.log([0].slice(0));
console.log(orderCorrectly([75, 97, 47, 61, 53], 5));

const fixedUpdates = invalidUpdates.map((pages) =>
  orderCorrectly(pages, pages.length)
);

console.log(fixedUpdates);
const fixedMidPages = fixedUpdates
  .map((arr) => arr[Math.floor(arr.length / 2)])
  .reduce((acc, curr) => acc + curr, 0);

console.log(fixedMidPages);
