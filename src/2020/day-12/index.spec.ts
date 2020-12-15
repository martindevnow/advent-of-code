import { rotate } from "./index";

describe("2020 - day 12", () => {
  describe("rotate", () => {
    it("rotates clockwise by 1", () => {
      const current = { ns: 10, ew: 5 }; // NS 10, EW 5 => NS-5 EW 10;
      const actual = rotate(1, current);
      expect(actual).toEqual({ ns: -5, ew: 10 });
    });
    it("rotates clockwise by 2", () => {
      const current = { ns: 10, ew: 5 }; // NS 10, EW 5 => NS -10, EW -5;
      const actual = rotate(2, current);
      expect(actual).toEqual({ ns: -10, ew: -5 });
    });
    it("rotates clockwise by 3", () => {
      const current = { ns: 10, ew: 5 }; // NS 10, EW 5 => NS -10, EW -5;
      const actual = rotate(3, current);
      expect(actual).toEqual({ ns: 5, ew: -10 });
    });
    it("rotates counter-clockwise by 1", () => {
      const current = { ns: 10, ew: 5 }; // N10, E5 => E10, S5;
      const actual = rotate(-1, current);
      expect(actual).toEqual({ ns: 5, ew: -10 });
    });
    it("rotates counter-clockwise by 2", () => {
      const current = { ns: 10, ew: 5 }; // N10, E5 => E10, S5;
      const actual = rotate(-2, current);
      expect(actual).toEqual({ ns: -10, ew: -5 });
    });
    it("rotates counter-clockwise by 3", () => {
      const current = { ns: 10, ew: 5 }; // N10, E5 => E10, S5;
      const actual = rotate(-3, current);
      expect(actual).toEqual({ ns: -5, ew: 10 });
    });
  });
});
