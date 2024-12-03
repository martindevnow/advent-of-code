import * as utils from "../utils";

const FIVE_OF_A_KIND = 10;
const FOUR_OF_A_KIND = 9;
const FULL_HOUSE = 8;
const THREE_OF_A_KIND = 7;
const TWO_PAIR = 6;
const ONE_PAIR = 5;
const HIGH_CARD = 4;
/**
 * 10 = 5 of a kind
 * 9 = 4 of a kind
 * 8 = full house
 * 7 = three of a kind
 * 6 = 2 pair
 * 5 = 1 pair
 * 4 = high card
 */

const determineHandStrength = (hand: string) => {
  // determine hand strength
  const cards = hand.split("").sort();

  // make set
  const set = new Set([...cards]);
  if (set.size === 1) {
    return FIVE_OF_A_KIND; // 5 of a kind
  }
  if (set.size === 2) {
    // 4 of a kind or full house
    const uniqueCards = Array.from(set);
    if (
      uniqueCards.some((cardVal) => {
        return cards.filter((handCard) => handCard === cardVal).length === 4;
      })
    ) {
      return FOUR_OF_A_KIND; // 4 of a kind
    }
    return FULL_HOUSE;
  }
  if (set.size === 3) {
    // 3 of a kind or 2 pair
    const uniqueCards = Array.from(set);
    if (
      uniqueCards.some((cardVal) => {
        return cards.filter((handCard) => handCard === cardVal).length === 3;
      })
    ) {
      return THREE_OF_A_KIND; // 3 of a kind
    }
    return TWO_PAIR; // 2 pair
  }
  if (set.size === 4) {
    return ONE_PAIR; // only 1 pair
  }
  if (set.size === 5) {
    return HIGH_CARD; // high card only
  }
  throw Error(`Cannot determine hand strength of ${hand}`);
};

const determineHandStrengthJokerWild = (hand: string) => {
  // determine hand strength
  const cards = hand.split("").sort();

  if (!hand.includes("J")) return determineHandStrength(hand);

  // make set
  const set = new Set([...cards]);
  if (set.size === 1) {
    return FIVE_OF_A_KIND; // JJJJJ => 5 of a kind (all jokers???)
  }
  if (set.size === 2) {
    // J + XXXX || JJ XXX => 5 of a kind
    const uniqueCards = Array.from(set);
    return FIVE_OF_A_KIND;
  }
  if (set.size === 3) {
    // J + X + Y (4 of a kind or full house)
    /**
     * J YYY X => 4 of a kind
     * J YY XX => full house
     * JJ YY X => 4 of a kind
     * JJJ Y X => 4 of a kind
     */
    const uniqueCards = Array.from(set);
    if (
      uniqueCards.every((uniqueCard) => {
        if (uniqueCard === "J") return true;
        return cards.filter((card) => card === uniqueCard).length === 2;
      })
    ) {
      return FULL_HOUSE; // full house
    }
    return FOUR_OF_A_KIND; // 4 of a kind
  }
  if (set.size === 4) {
    return THREE_OF_A_KIND; // J + XX Y Z  ||  JJ + X Y Z => 3 of a kind either way
  }
  if (set.size === 5) {
    return ONE_PAIR; // J + WXYZ => 1 pair
  }
  throw Error(`Cannot determine hand strength of ${hand}`);
};

interface Hand {
  hand: string;
  bid: number;
  strength: number;
  cardStrengths: Array<number>;
}

const compareHands = (a: Hand, b: Hand) => {
  if (a.strength !== b.strength) return a.strength - b.strength;

  for (let i = 0; i < 5; i++) {
    if (a.cardStrengths[i] !== b.cardStrengths[i])
      return a.cardStrengths[i] - b.cardStrengths[i];
  }
  throw Error("hands are IDENTICAL");
};

const cardToValue = {
  A: 100,
  K: 90,
  Q: 80,
  J: 70,
  T: 60,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

const cardToValueJokerWeak = {
  A: 100,
  K: 90,
  Q: 80,
  J: 1,
  T: 60,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

const data: Array<string> = utils
  .readFileAbsolute(__dirname + "/data.txt") // read input data
  .split(/\n/);

const part1 = data
  .map((line) => {
    const [hand, bid] = line.split(" ");
    const strength = determineHandStrength(hand);
    const cardStrengths = hand.split("").map((card) => cardToValue[card]);
    return { hand, bid: +bid, strength, cardStrengths };
  })
  .sort(compareHands);

const totalWinnings = part1.reduce((acc, curr, index) => {
  return acc + (index + 1) * curr.bid;
}, 0);

console.log("Part 1: ");
console.log(totalWinnings);

const part2 = data
  .map((line) => {
    const [hand, bid] = line.split(" ");
    const strength = determineHandStrengthJokerWild(hand);
    const cardStrengths = hand
      .split("")
      .map((card) => cardToValueJokerWeak[card]);
    return { hand, bid: +bid, strength, cardStrengths };
  })
  .sort(compareHands);

const totalWinnings2 = part2.reduce((acc, curr, index) => {
  return acc + (index + 1) * curr.bid;
}, 0);
console.log("Part 2: ");
console.log(totalWinnings2);
