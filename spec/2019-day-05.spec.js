import { isPointer, getOPCode } from '../src/2019/day-05';
describe('2019-05', () => {
  describe('isPointer', () => {
    it('can get for one param', () => {
      expect(isPointer(3, 1)).toBeTrue();
      expect(isPointer(103, 1)).toBeFalse();
    })
    it('can get for two params', () => {
      expect(isPointer(1, 1)).toBeTrue();
      expect(isPointer(1, 2)).toBeTrue();
      expect(isPointer(101, 1)).toBeFalse();
      expect(isPointer(101, 2)).toBeTrue();
      expect(isPointer(1001, 1)).toBeTrue();
      expect(isPointer(1001, 2)).toBeFalse();
      expect(isPointer(1101, 1)).toBeFalse();
      expect(isPointer(1101, 2)).toBeFalse();
    })
    it('can get for three params', () => {
      expect(isPointer(1, 1)).toBeTrue();
      expect(isPointer(1, 2)).toBeTrue();
      expect(isPointer(1, 3)).toBeTrue();
      expect(isPointer(101, 1)).toBeFalse();
      expect(isPointer(101, 2)).toBeTrue();
      expect(isPointer(101, 3)).toBeTrue();
      expect(isPointer(1001, 1)).toBeTrue();
      expect(isPointer(1001, 2)).toBeFalse();
      expect(isPointer(1001, 3)).toBeTrue();
      expect(isPointer(1101, 1)).toBeFalse();
      expect(isPointer(1101, 2)).toBeFalse();
      expect(isPointer(1101, 3)).toBeTrue();
      expect(isPointer(11001, 1)).toBeTrue();
      expect(isPointer(11001, 2)).toBeFalse();
      expect(isPointer(11001, 3)).toBeFalse();
      expect(isPointer(11101, 1)).toBeFalse();
      expect(isPointer(11101, 2)).toBeFalse();
      expect(isPointer(11101, 3)).toBeFalse();
    })
  })
  describe('getOPCode', () => {
    it('reads', () => {
      expect(getOPCode(1102)).toBe(2);
    })
  });
})
