import { applyMaskToMemoryAddress, getAllPermutations, maskToFunc } from ".";

describe("2020 - day 14", () => {
  describe("maskToFunc", () => {
    it("maps to 1s", () => {
      const maskFunc = maskToFunc("111");
      const actual = maskFunc("000");
      expect(actual).toBe(7);
    });
    it("maps Xs", () => {
      const maskFunc = maskToFunc("XXX");
      const actual = maskFunc("010");
      expect(actual).toBe(2);
    });
  });
  describe("try some permutations stuff", () => {
    it("replace an X", () => {
      const mask = "00X0";
      const actual = getAllPermutations(mask);
      expect(actual).toMatchObject(["0000", "0010"]);
    });
    it("replace two Xs", () => {
      const mask = "X0X0";
      const actual = getAllPermutations(mask);
      expect(actual).toMatchObject(["0000", "0010", "1000", "1010"]);
    });
  });
  describe("try some permutations stuff", () => {
    it("replace two Xs", () => {
      const mask = "X0X0";
      const actual = getAllPermutations(mask);
      expect(actual).toMatchObject(["0000", "0010", "1000", "1010"]);
    });
  });
  describe("applyMaskToMemoryAddress", () => {
    it("overwrites when mask has 1", () => {
      const mask = "0010";
      const actual = applyMaskToMemoryAddress(mask, parseInt("0", 2));
      expect(actual).toBe("0010");
    });
    it("ignores when mask has 0", () => {
      const mask = "0010";
      const actual = applyMaskToMemoryAddress(mask, parseInt("1111", 2));
      expect(actual).toBe("1111");
    });
    it("adds X when mask has X", () => {
      const mask = "00X0";
      const actual = applyMaskToMemoryAddress(mask, parseInt("1111", 2));
      expect(actual).toBe("11X1");
    });
  });
});
