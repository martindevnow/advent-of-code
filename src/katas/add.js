export const add = (numString) => {
  if (!numString) return 0;
  const numGroups = numString.split('\n');
  let delimiters = [','];
  // console.log(numGroups);
  if (numGroups.length 
    && numGroups[0] 
    && Number.isNaN(+numGroups[0]) 
    && (numGroups[0].length === 1 || numGroups[0][0] === '[')) 
  {
    if (numGroups[0].length === 1) {
      delimiters = [numGroups[0]];
    } else {
      const reg = /\[(.+?)\]/g;
      const matches = [...numGroups[0].matchAll(reg)];
      // console.log(matches)
      if (matches.length) {
        delimiters = matches.map(match => match[1]);
      }
    }
    
    numGroups.shift();
    // console.log('new delimiter is ', delimiters)
  }

  let invalid = [];

  // numGroups = ["1.2", "3", "4,5"];
  // delimiters = [".", ","];

  const nums = delimiters.reduce((updatedNumGroups,delim) => {
    return updatedNumGroups.reduce((acc, curr) => {
      return [...acc, ...curr.split(delim)]
    }, []);
  }, numGroups)


  const filters = [
    (num) => num <= 1000,
  ]

  const sum = nums.reduce((acc, curr) => {
    const num = +curr;
    if (num < 0) {
      invalid.push(num);
      return acc;
    }
    if (!filters[0](curr)) {
      return acc;
    }

    return (acc + (+curr))
  }, 0);

  if (invalid.length) {
    throw new Error('Negative numbers are not allowed: ' + invalid.join(', '))
  }
  return sum;
}