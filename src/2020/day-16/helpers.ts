export const combineRanges = (range1: string, range2: string) => {
  const [lower1, higher1] = range1.split("-").map((num) => Number(num));
  const [lower2, higher2] = range2.split("-").map((num) => Number(num));

  // console.log(1);
  // No Overlap Case
  if (higher1 < lower2 - 1 || higher2 < lower1 - 1) {
    return null;
  }
  // console.log(2);

  // Completely Encompass
  if (lower1 <= lower2 && higher1 >= higher2) {
    return [lower1, higher1].join("-");
  }
  // console.log(3);

  if (lower2 <= lower1 && higher2 >= higher1) {
    return [lower2, higher2].join("-");
  }
  // console.log(4);

  // Partial Overlap 1-5 and 4-10
  if (lower1 <= lower2 && higher1 + 1 >= lower2) {
    return [lower1, higher2].join("-");
  }
  // console.log(5);
  if (lower2 <= lower1 && higher2 + 1 >= lower1) {
    return [lower2, higher1].join("-");
  }

  throw new Error(
    `Some Different Overlap between ranges, ${range1} and ${range2}`
  );
};

export const combineAllRanges = (rangesArr: string[]) => {
  return rangesArr.reduce((acc: string[], curr: string) => {
    if (acc.length === 0) {
      return [curr];
    }

    const hasOverlap = !!acc.find((processedRange) =>
      combineRanges(processedRange, curr)
    );
    if (!hasOverlap) {
      return [...acc, curr];
    }

    return combineAllRanges(
      acc.map(
        (processedRange) =>
          combineRanges(processedRange, curr) ?? processedRange
      )
    );
  }, []);
};

export const isInRange = (num: number, range: string) => {
  const [lowerLimit, upperLimit] = range.split("-").map((num) => Number(num));
  return num >= lowerLimit && num <= upperLimit;
};
export const isInAnyRange = (num: number, ranges: string[]) => {
  return ranges.some((range) => isInRange(num, range));
};
