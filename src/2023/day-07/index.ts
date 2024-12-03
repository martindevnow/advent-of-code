import * as utils from "../utils";

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
    return 10; // 5 of a kind
  }
  if (set.size === 2) {
    // 4 of a kind or full house
    const uniqueCards = Array.from(set);
    if (
      uniqueCards.some((cardVal) => {
        return cards.filter((handCard) => handCard === cardVal).length === 4;
      })
    ) {
      return 9; // 4 of a kind
    }
    return 8;
  }
  if (set.size === 3) {
    // 3 of a kind or 2 pair
    const uniqueCards = Array.from(set);
    if (
      uniqueCards.some((cardVal) => {
        return cards.filter((handCard) => handCard === cardVal).length === 3;
      })
    ) {
      return 7; // 3 of a kind
    }
    return 6; // 2 pair
  }
  if (set.size === 4) {
    return 5; // only 1 pair
  }
  if (set.size === 5) {
    return 4; // high card only
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

const data: Array<Hand> = utils
  .readFileAbsolute(__dirname + "/data.txt") // read input data
  .split(/\n/)
  .map((line) => {
    const [hand, bid] = line.split(" ");
    const strength = determineHandStrength(hand);
    const cardStrengths = hand.split("").map((card) => cardToValue[card]);
    return { hand, bid: +bid, strength, cardStrengths };
  })
  .sort(compareHands);

const totalWinnings = data.reduce((acc, curr, index) => {
  return acc + (index + 1) * curr.bid;
}, 0);

console.log("Part 1: ");
console.log(totalWinnings);
