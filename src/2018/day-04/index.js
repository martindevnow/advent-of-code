import * as utils from '../utils';

const sum = (acc, curr) => acc + curr;

const data = utils.readFile('../day-04/data.txt').split(/\r?\n/)
// .slice(0, 5);

const isBefore = (date1, date2) => {
  return !![...date1]
    .reduce((acc, num, index) => {
      if (acc.equal && parseInt(num) < parseInt(date2.charAt(index))) {
        acc.smaller = true;
        acc.equal = false;
      } else if (acc.equal && parseInt(num) > parseInt(date2.charAt(index))) {
        acc.larger = true;
        acc.equal = false;
      }

      return acc;
    }, { equal: true, smaller: null, larger: null }).smaller;
}

const sortByDate = (data, data2) => {
  return isBefore(data.theDate, data2.theDate) ? -1 : +1;
}

const convertToData = (str) => {
  const expl = str.replace(/\[|\]/g, '').split(' ');
  const theDate = `${expl[0]} ${expl[1]}`;
  const action = expl.slice(2).join(' ');
  return { theDate, action };
}

const sorted = data.map(convertToData).sort(sortByDate)
// .slice(0, 3);
// console.log(sorted);

const isChangeGuard = (str) => {
  const reg = /Guard #(\d+)/;
  return !!reg.test(str);
}

const isWakeUp = (str) => {
  const reg = /wakes up/;
  return !!reg.test(str);
};

const isFallsAsleep = (str) => {
  const reg = /falls asleep/;
  return !!reg.test(str);
};

const getGuardNumber = (str) => {
  const reg = /Guard #(\d+)/;
  return str.match(reg)[0];
}

const getJustNumber = (str) => {
  const reg = /#(\d+)/;
  return parseInt(str.match(reg)[1]);
};
const getMinutes = (str) => {
  const reg = /\d\d:(\d\d)/;
  const match = str.match(reg);
  return parseInt(match[1]);
}

const ex = '[1518-06-05 23:58] Guard #283 begins shift';
console.log(isChangeGuard(ex))
console.log(getGuardNumber(ex))
console.log(getMinutes(ex))

const calculatedData = sorted.reduce((acc, entry) => {
  // Setup ACC
  // console.log({ action: entry.action, time: entry.theDate, min: getMinutes(entry.theDate) });
  if (isChangeGuard(entry.action)) {
    acc.curr.guard = getGuardNumber(entry.action);
    acc.curr.status = 'awake';
    acc.curr.time = getMinutes(entry.theDate);
    if (!acc.guards[acc.curr.guard] || !!acc.guards[acc.curr.guard].length === 0) {
      acc.guards[acc.curr.guard] = new Array(60).fill(0);
    }
    return acc;
  }

  if (isFallsAsleep(entry.action)) {
    if (acc.curr.status === 'awake') {
      acc.curr.status = 'asleep';
      acc.curr.time = getMinutes(entry.theDate);
    } else {
      throw new Error('fell asleep, but was not awake')
    }
    return acc;
  }

  if (isWakeUp(entry.action)) {
    if (acc.curr.status === 'asleep') {
      // LOG ALL THE SLEEPY TIME
      const sleepTime = acc.curr.time;
      acc.curr.time = getMinutes(entry.theDate)
      acc.curr.status = 'awake';
      acc.guards[acc.curr.guard] = acc.guards[acc.curr.guard]
        .map((times, minute) => {
          if (minute < sleepTime || minute >= acc.curr.time) {
            return times
          }
          times = times + 1;
          return times;
        })
    } else {
      throw new Error('woke up, but was not asleep')
    }
    return acc;
  }
  throw Error(JSON.stringify(entry));

}, { guards: {}, curr: { guard: null, status: 'awake', time: null } });

// console.log(calculatedData);

const sleepyGuard = Object.keys(calculatedData.guards).reduce((acc, currGuardKey) => {
  if (acc === null) {
    return currGuardKey;
  }

  if (calculatedData.guards[currGuardKey].reduce(sum, 0) > calculatedData.guards[acc].reduce(sum, 0)) {
    return currGuardKey;
  }
  return acc;
}, null)

console.log(sleepyGuard);
console.log(`sleepy time`, calculatedData.guards[sleepyGuard].reduce(sum, 0));

const sleepiestMinute = calculatedData.guards[sleepyGuard].reduce((acc, curr, index) => {
  if (acc === null) {
    return index;
  }
  if (curr > calculatedData.guards[sleepyGuard][acc]) {
    return index;
  }
  return acc;
}, null)

console.log(calculatedData.guards[sleepyGuard]);
console.log(sleepiestMinute);

console.log(sleepiestMinute, sleepyGuard, parseInt(getJustNumber(sleepyGuard)));
console.log(sleepiestMinute * parseInt(getJustNumber(sleepyGuard)));


// Part 2

const guards = Object.keys(calculatedData.guards).reduce((acc, guardKey) => {
  return {
    ...acc,
    [guardKey]: calculatedData.guards[guardKey].reduce((acc, timesAsleep, minute) => {
      if (timesAsleep > acc.timesAsleep) {
        acc.timesAsleep = timesAsleep;
        acc.minute = minute;
      }
      return acc;
    }, { minute: 0, timesAsleep: 0 })
  }
}, {});
console.log(guards);

const guard = Object.keys(guards).reduce((acc, guardKey, index) => {
  if (acc === null) {
    return guardKey;
  }
  if (guards[guardKey].timesAsleep > guards[acc].timesAsleep) {
    return guardKey;
  }
  return acc;
}, null);

console.log(guard, guards[guard], getJustNumber(guard) * guards[guard].minute);
