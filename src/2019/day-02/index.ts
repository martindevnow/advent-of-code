import { readFile } from '../../utils';

const processDataSet = (dataArr, startIndex = 0) => {
  let currentIndex = startIndex;
  let currentOpCode = dataArr[currentIndex];
  if (currentOpCode === 99 || currentOpCode === undefined) {
    return dataArr;
  }

  let aIndex = dataArr[currentIndex + 1];
  let bIndex = dataArr[currentIndex + 2];
  let resultIndex = dataArr[currentIndex + 3];
  let a = dataArr[aIndex];
  let b = dataArr[bIndex];
  let result;
  if (currentOpCode === 1) {
    result = a + b;
  } else {
    result = a * b;
  }

  dataArr[resultIndex] = result;
  return processDataSet(dataArr, startIndex + 4);
};

const splitAndMap = arr => arr.split(',').map(a => parseInt(a));

// 1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
console.log(processDataSet(splitAndMap('1,0,0,0,99')));
// 2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
console.log(processDataSet(splitAndMap('2,3,0,3,99')));
// 2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
console.log(processDataSet(splitAndMap('2,4,4,5,99,0')));
// 1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.
console.log(processDataSet(splitAndMap('1,1,1,4,99,5,6,0,99')));

let data = readFile('../2019/day-02/data.txt')
  .split(',')
  .map(a => parseInt(a));

let updatedData = processDataSet(data);

console.log(updatedData[0]);
// 394702 == too low

const desiredOutput = 19690720;

for (let i = 0; i < 99; i++) {
  for (let j = 0; j < 99; j++) {
    // console.log({ i, j });
    data = splitAndMap(readFile('../2019/day-02/data.txt'));
    data[1] = i;
    data[2] = j;
    updatedData = processDataSet(data);
    if (updatedData[0] === desiredOutput) {
      console.log({ i, j, total: 100 * i + j });
      break;
    }
  }
}
