import { combineAllRanges, combineRanges } from "./helpers";

describe("2020-day16", () => {
  describe("combineRanges", () => {
    it("does nothing if no interaction between ranges", () => {
      const initial = ["1-5", "7-10"];
      const actual = combineRanges(initial[0], initial[1]);
      expect(actual).toBeNull();
    });
    it("returns the larger, encompassing range", () => {
      const initial = ["1-50", "7-10"];
      const actual = combineRanges(initial[0], initial[1]);
      expect(actual).toBe(initial[0]);
    });
    it("returns the larger, encompassing range v2", () => {
      const initial = ["7-10", "1-50"];
      const actual = combineRanges(initial[0], initial[1]);
      expect(actual).toBe(initial[1]);
    });
    it("returns a combination range", () => {
      const initial = ["1-8", "5-10"];
      const actual = combineRanges(initial[0], initial[1]);
      expect(actual).toBe("1-10");
    });
    it("returns a combination range v2", () => {
      const initial = ["5-10", "1-8"];
      const actual = combineRanges(initial[0], initial[1]);
      expect(actual).toBe("1-10");
    });
  });

  describe("combineAllRanges", () => {
    it("can combine 3 ranges with no overlap", () => {
      const initial = ["1-5", "10-20", "30-50"];
      const actual = combineAllRanges(initial);
      expect(actual).toMatchObject(initial);
    });
    it("can combine 3 ranges with some overlap", () => {
      const initial = ["1-5", "5-20", "30-50"];
      const actual = combineAllRanges(initial);
      expect(actual).toMatchObject(["1-20", "30-50"]);
    });
    it("can combine 3 ranges with some overlap v2", () => {
      const initial = ["1-3", "5-20", "3-50"];
      const actual = combineAllRanges(initial);
      expect(actual).toMatchObject(["1-50"]);
    });
    it("can combine 3 ranges with some overlap v3", () => {
      const initial = ["100-300", "1-200", "250-500"];
      const actual = combineAllRanges(initial);
      expect(actual).toMatchObject(["1-500"]);
    });
    it("can combine 2 ranges with diff of one", () => {
      const initial = ["1-10", "11-200"];
      const actual = combineAllRanges(initial);
      expect(actual).toMatchObject(["1-200"]);
    });
    it("can combine 2 ranges with diff of one v2", () => {
      const initial = ["11-200", "1-10"];
      const actual = combineAllRanges(initial);
      expect(actual).toMatchObject(["1-200"]);
    });
  });
});
