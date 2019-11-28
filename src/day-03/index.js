import * as utils from '../utils';
const data = utils.readFile('../day-03/data.txt').split(/\r?\n/)
// .slice(0, 1);


const convertToObj = (str) => {
  let arr = str.split(' ');
  return {
    claimId: parseInt(arr[0].substring(1)),
    xCoord: parseInt(arr[2].split(',')[0]),
    yCoord: parseInt(arr[2].split(',')[1]),
    width: parseInt(arr[3].split('x')[0]),
    height: parseInt(arr[3].split('x')[1]),
  };
}

// console.log('#3 @ 119,619: 22x27', convertToObj('#3 @ 119,619: 22x27'));

const fabric = new Array(1200).fill('.').map(_ => new Array(1200).fill('.'));
console.log('arrays are different', fabric[0] !== fabric[1]);

const printFabric = (fab) => {
  console.log(fab.map(row => {
    return row.join('')
  }).join('\n'))
}

data.map(convertToObj)
  .forEach(data => {
    for (let x = data.xCoord; x < (data.xCoord + data.width);) {
      for (let y = data.yCoord; y < (data.yCoord + data.height);) {
        if (fabric[x][y] === '.') {
          fabric[x][y] = 0;
        } else {
          fabric[x][y] = 1;
        }
        y++;
      }
      x++;
    }
  });

const overlap = fabric.reduce((acc, row) => {
  return acc + row.filter(cell => cell === 1).length;
}, 0);


console.log({ answer: overlap }); // 105231


// Part 2

const hasNoOverlap = (data, plottedFabric) => {
  for (let x = data.xCoord; x < (data.xCoord + data.width);) {
    for (let y = data.yCoord; y < (data.yCoord + data.height);) {
      if (plottedFabric[x][y] === 1) {
        return false;
      }
      y++;
    }
    x++;
  }
  console.log(`!!!! claim ${data.claimId} has NO overlap !!!!`)

  return true;
};

const claims = data.map(convertToObj).filter(dataSet => hasNoOverlap(dataSet, fabric));

console.log(claims); // 164