import { add } from "./add";

describe('add', () => {
  it('adds nothing :: ""', () => {
    const actual = add('');
    expect(actual).toBe(0);
  });
  it ('adds a single number :: "1"', () => {
    const actual = add('1');
    expect(actual).toBe(1);
  });
  it ('adds two numbers :: "1,2"', () => {
    const actual = add('1,2');
    expect(actual).toBe(3);
  });
  it ('adds three numbers :: "1,2,3"', () => {
    const actual = add('1,2,3');
    expect(actual).toBe(6);
  });
  it ('adds four numbers :: "1,2,3,4"', () => {
    const actual = add('1,2,3,4');
    expect(actual).toBe(10);
  });
  it ('adds five numbers :: "1,2,3,4,5"', () => {
    const actual = add('1,2,3,4,5');
    expect(actual).toBe(15);
  });
  it ('accepts new lines as delimiters :: "1\\n2,3,4,5"', () => {
    const actual = add('1\n2,3,4,5');
    expect(actual).toBe(15);
  });
  it ('accepts new lines as delimiters :: "1,\\n"', () => {
    const actual = add('1,\n');
    expect(actual).toBe(1);
  });
  it ('accepts a custom delimiter followed by a newline :: ";\\n1;2"', () => {
    const actual = add(';\n1;2');
    expect(actual).toBe(3);
  });
  it ('ignores negative numbers :: ";\\n1;-2"', () => {
    try {
      add(';\n1;-2');
      expect(0).toBe(1);
    } catch (e) {
      expect(true).toBe(true);
    }
  });
  it ('ignores numbers over 1000 :: "1,1001"', () => {
    const actual = add('1,1001');
    expect(actual).toBe(1);
  });
  it ('allows long delimiters :: "[***]\n1***1"', () => {
    const actual = add('[***]\n1***1');
    expect(actual).toBe(2);
  });
  it ('allows two delimiters :: "[*][;]\n1*1;2"', () => {
    const actual = add('[*][;]\n1*1;2');
    expect(actual).toBe(4);
  });
  it ('allows two delimiters of variable length :: "[***][;:]\n1***1;:2"', () => {
    const actual = add('[***][;:]\n1***1;:2');
    expect(actual).toBe(4);
  });
})